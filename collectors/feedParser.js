var sax = require('sax');

// Internal: Parse the XML.
//
// xml      - An XML String.
// callback - Receives `(err, obj)`.
//
var FeedParser = function () {
    this.currentTag = null;
    var parser = this.parser = sax.parser(true, {
        trim: true,
        normalize: true
    });
    var myThis = this;

    parser.onopentag = function (tag) {
        myThis.open(tag);
    };
    parser.onclosetag = function (tag) {
        myThis.close(tag);
    };

    parser.onerror = function () {
        this.error = undefined;
    }
    parser.ontext = function (text) {
        myThis.ontext(text);
    };
    parser.oncdata = function (text) {
        myThis.ontext(text);
    };
    parser.onend = function () {
        myThis.onend();
    };
}

FeedParser.prototype.write = function (xml) {
    this.parser.write(xml).close();
};

FeedParser.prototype.open = function (tag) {
    tag.parent = this.currentTag;
    tag.children = [];
    if (tag.parent) {
        tag.parent.children.push(tag);
    }
    this.currentTag = tag;
    this.onopentag(tag);
};

FeedParser.prototype.close = function (tagname) {
    this.onclosetag(tagname, this.currentTag);
    if (this.currentTag && this.currentTag.parent) {
        var p = this.currentTag.parent;
        delete this.currentTag.parent;
        this.currentTag = p;
    }
};

FeedParser.prototype.ontext = function (text) {
    if (this.currentTag) {
        this.currentTag.children.push(text);
    }
};

module.exports = FeedParser;