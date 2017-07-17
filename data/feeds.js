const logger = require('winston');
const Database = require('./DB');

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

exports.Data = FeedsDB;