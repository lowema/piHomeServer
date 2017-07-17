var sax = require('sax');

class FeedParser {
    constructor() {
        this.currentTag = null;
        this.parser = sax.parser(true, {
            trim: true,
            normalize: true
        });
        var parser = this.parser;
        var self = this;

        parser.onopentag = (tag) => {
            self.open(tag);
        };
        parser.onclosetag = (tag) => {
            self.close(tag);
        };

        parser.onerror = () => {
            this.error = undefined;
        };
        parser.ontext = (text) => {
            self.ontext(text);
        };
        parser.oncdata = (text) => {
            self.ontext(text);
        };
        parser.onend = () => {
            self.onend();
        };
    }

    write(xml) {
        this.parser.write(xml).close();
    }

    open(tag) {
        tag.parent = this.currentTag;
        tag.children = [];
        if (tag.parent) {
            tag.parent.children.push(tag);
        }
        this.currentTag = tag;
        this.onopentag(tag);
    }

    close(tagname) {
        this.onclosetag(tagname, this.currentTag);
        if (this.currentTag && this.currentTag.parent) {
            var p = this.currentTag.parent;
            delete this.currentTag.parent;
            this.currentTag = p;
        }
    }

    ontext(text) {
        if (this.currentTag) {
            this.currentTag.children.push(text);
        }
    }
}

module.exports = FeedParser;