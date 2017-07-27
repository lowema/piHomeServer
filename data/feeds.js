const logger = require('winston');
const Database = require('./DB');

class FeedsDB extends Database {
    constructor() {
        super('feedsDB');
        this.database.ensureIndex({ fieldName: 'feedURL', unique: true });
    }
    async add(name, feedURL, expiryTime) {
        logger.debug('DB [' + this.db + '] add feed: ' + name);
        var idx = {
            feedURL: feedURL
        };
        var doc = {
            feedName: name,
            feedURL: feedURL,
            expiryTime: expiryTime,
            createdAt: Date.now()
        };

        const record = await this.database.update(idx, doc, { upsert: true, returnUpdatedDocs: true });

        return record;
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