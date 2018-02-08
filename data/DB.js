const logger = require('winston');
const Datastore = require('nedb-promise');

class Database {
    constructor(dbName) {
        this.db = dbName;
        this.dbFile = global.settings.DBpath + this.db + '.nedb';
        
        if(global.dbList === undefined) { 
            logger.debug('Setting up global DB list');
            global.dbList = {};
        }

        if(global.dbList[dbName]) {
            logger.debug('DB made from exitsing object');
            this.database = global.dbList[dbName];
        } else {
            logger.debug('New DB connection object made');
            this.database = new Datastore({ filename: this.dbFile, autoload: true });
            global.dbList[dbName] = this.database;
        }
    }
    async deleteAllData() {
        await this.database.remove({}, { multi: true });
    }
    async getAllData() {
        const result = await this.database.find({});

        return result;
    }
    async getDataByID(id) {
        const idx = { _id: id };
        let result = await this.database.find(idx);

        return result;
    }
    async getCount() {
        const result = await this.database.count({});

        return result;
    }
}

module.exports = Database;