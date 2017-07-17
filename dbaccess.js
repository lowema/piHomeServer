const logger = require('winston');
const Datastore = require('nedb-promise');

class Database {
    constructor(dbName) {
        this.db = dbName;
        this.dbFile = './data/' + this.db + '.nedb';

        this.database = new Datastore({ filename: this.dbFile, autoload: true });
    }
    async deleteAllData() {
        await this.database.remove({}, { multi: true });
    }
    async getAllData() {
        const result = await this.database.find({});

        return result;
    }
    async getCount() {
        const result = await this.database.count({});

        return result;
    }
}


class HouseDB extends Database {
    constructor() {
        super('houseDB');
        this.database.ensureIndex({ fieldName: 'roomName', unique: true });

    }
    async addRoom(roomName) {
        logger.debug('DB [' + this.db + '] add room: ' + roomName);
        var idx = {
            roomName: roomName
        };
        var doc = {
            roomName: roomName,
            createdAt: Date.now()
        };

        await this.database.update(idx, doc, { upsert: true });
    }
    async deleteRoom(roomName) {
        logger.debug('DB [' + this.db + '] delete room: ' + roomName);
        var idx = {
            roomName: roomName
        };

        await this.database.remove(idx, { multi: true });
    }
}
exports.House = HouseDB;


class FeedsDB extends Database {
    constructor() {
        super('feedsDB');
        this.database.ensureIndex({ fieldName: 'feedURL', unique: true });
    }
    async add(name, feedURL) {
        logger.debug('DB [' + this.db + '] add feed: ' + feedURL);
        var idx = {
            feedURL: feedURL
        };
        var doc = {
            feedName: name,
            feedURL: feedURL,
            createdAt: Date.now()
        };

        await this.database.update(idx, doc, { upsert: true });
    }
    async delete(name, feedURL) {
        logger.debug('DB [' + this.db + '] delete feed: ' + feedURL);
        var idx = {
            feedURL: feedURL
        };

        await this.database.remove(idx, { multi: true });
    }
}
exports.Feeds = FeedsDB;


class ArticlesDB extends Database {
    constructor() {
        super('articlesDB');
        this.database.ensureIndex({ fieldName: 'articleGUID', unique: true });
    }
    async add(articleGUID, title, contents, author, URL, feedURL, feedTitle) {
        logger.debug('DB [' + this.db + '] add article: ' + articleGUID);
        var idx = {
            articleGUID: articleGUID
        };
        var doc = {
            title: title,
            contents: contents,
            author: author,
            URL: URL,
            feedURL: feedURL,
            feedTitle: feedTitle,
            articleGUID: articleGUID,
            createdAt: Date.now()
        };

        await this.database.update(idx, doc, { upsert: true });
    }
    async delete(articleGUID) {
        logger.debug('DB [' + this.db + '] delete article: ' + articleGUID);
        var idx = {
            articleGUID: articleGUID
        };

        await this.database.remove(idx, { multi: true });
    }
}
exports.Articles = ArticlesDB;