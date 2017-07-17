const logger = require('winston');
const Database = require('./DB');

class HomeDB extends Database {
    constructor() {
        super('homeDB');
        this.database.ensureIndex({ fieldName: 'homeName', unique: true });

    }
    async add(homeName) {
        logger.debug('DB [' + this.db + '] add home: ' + homeName);
        var idx = {
            homeName: homeName
        };
        var doc = {
            homeName: homeName,
            createdAt: Date.now()
        };

        await this.database.update(idx, doc, { upsert: true });
    }
    async delete(homeName) {
        logger.debug('DB [' + this.db + '] delete home: ' + homeName);
        var idx = {
            homeName: homeName
        };

        await this.database.remove(idx, { multi: true });
    }
}
exports.Data = HomeDB;