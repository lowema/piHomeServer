const logger = require('winston');
const request = require('request');
const _ = require('underscore');
const moment = require('moment');
const FeedParser = require('./feedParse');


// Helper functions
var scrubHTML = (html) => {
    return html.replace(/<script.*<\/script>/gi, "");
}

var childByName = (parent, name) => {
    var children = parent.children || [];
    for (var i = 0; i < children.length; i++) {
        if (children[i].name === name) {
            return children[i]
        }
    }

    return null;
}

var childData = (parent, name) => {
    var node = childByName(parent, name)
    if (!node) {
        return "";
    }
    var children = node.children;
    if (!children.length) {
        return "";
    }

    return children.join("");
}

// Public: Fetch the articles from the RSS or ATOM feed.
//
// url      - The String feed url
// callback - Receives `(err, articles)`, where each article has properties:
//
//              * "title"
//              * "author"
//              * "link"
//              * "content"
//              * "published"
//              * "feed" - {name, source, link}
//
// Returns nothing.
var FeedRead = (feedURL, callback) => {
    FeedRead.get(feedURL, callback);
};

FeedRead.identifyCharset = (response) => {
    var contentType = response && response.headers && response.headers["content-type"];
    var match = contentType && contentType.match(/charset=(\S+)/);

    return match && match[1] || "utf-8";
}

FeedRead.get = (feedURL, callback) => {
    request(feedURL, { timeout: 5000 }, (err, res, body) => {
        if (err) {
            logger.error('Unable to fetch feed ', '<' + feedURL + '>', res.statusCode);

            return callback(err);
        }
        var type = FeedRead.identify(body);
        if (type === "atom") {
            logger.debug('ATOM: ' + feedURL);
            FeedRead.atom(body, feedURL, callback);
        } else if (type === "rss") {
            logger.debug('RSS: ' + feedURL);
            FeedRead.rss(body, feedURL, callback);
        } else {
            logger.error('Body is not RSS or ATOM', '<' + feedURL + '>', res.statusCode);

            return callback(new Error('Body is not RSS or ATOM', '<' + feedURL + '>', res.statusCode));
        }
    });
};

FeedRead.identify = (xml) => {
    if (/<(rss|rdf)\b/i.test(xml)) {
        return "rss";
    } else if (/<feed\b/i.test(xml)) {
        return "atom";
    } else {
        return false;
    }
}

FeedRead.atom = (xml, source, callback) => {
    if (!callback) {
        return FeedRead.atom(xml, "", source);
    }

    var parser = new FeedParser();
    var articles = [];
    var meta = { source: source };
    var article;
    var defaultAuthor;

    parser.onopentag = function (tag) {
        if (tag.name === "entry") {
            article = tag;
        }
    };

    parser.onclosetag = function (tagname, currentTag) {
        if (tagname === "entry") {
            articles.push(article);
            article = null;
        } else if (tagname === "author" && !article) {
            defaultAuthor = childData(currentTag, "name");
        } else if (tagname === "link" && currentTag.attributes.rel != "self") {
            meta.link || (meta.link = currentTag.attributes.href);
        } else if (tagname === "title" && !currentTag.parent.parent) {
            meta.name = currentTag.children[0];
        }
    };

    parser.onend = function () {
        callback(null, _.filter(_.map(articles,
            function (art) {
                if (!art.children.length) {
                    return false;
                }
                var author = childByName(art, "author");
                if (author) {
                    author = childData(author, "name");
                }
                var obj = {
                    title: childData(art, "title"),
                    content: scrubHTML(childData(art, "content")),
                    published: childData(art, "published") || childData(art, "updated"),
                    updated: childData(art, "updated"),
                    author: author || defaultAuthor,
                    link: childByName(art, "link").attributes.href,
                    feed: meta
                };
                if (obj.published) {
                    obj.published = new Date(obj.published);
                }
                if (obj.updated) {
                    obj.updated = new Date(obj.updated);
                }

                return obj;
            }
        ), function (art) { return !!art; }));
    };

    parser.write(xml);
};


FeedRead.rss = (xml, source, callback) => {
    if (!callback) {
        return FeedRead.rss(xml, "", source);
    }

    var parser = new FeedParser();
    var articles = [];
    var meta = { source: source };
    var article = {};

    parser.onopentag = function (tag) {
        if (tag.name === "item") {
            article = tag;
        }
    };

    parser.onclosetag = function (tagname, currentTag) {
        if (tagname === "item") {
            articles.push(article);
            article = null;
        } else if (tagname === "channel") {
            meta.link || (meta.link = childData(currentTag, "link"));
            meta.name = childData(currentTag, "title");
            meta.description = childData(currentTag, "description");
        }
    };

    parser.onend = function () {
        callback(null, _.filter(_.map(articles,
            function (art) {
                if (!art.children.length) {
                    return false;
                }

                var obj = {
                    title: childData(art, "title"),
                    content: scrubHTML(childData(art, "content:encoded")) || scrubHTML(childData(art, "description")),
                    published: childData(art, "pubDate"),
                    author: childData(art, "author") || childData(art, "dc:creator"),
                    link: childData(art, "link"),
                    guid: childData(art, "guid"),
                    feed: meta
                };
                if (obj.published) {
                    var slash = obj.published.match('/*\/*/');
                    if (slash) {
                        var momentObj = moment(obj.published, 'MM/DD/YYYY - HH:mm');
                        obj.published = momentObj.toDate();
                    } else {
                        obj.published = new Date(obj.published);
                    }
                }

                return obj;
            }
        ), function (art) {
            return Boolean(art);
        }));
    };

    parser.write(xml);
};

module.exports = FeedRead;