const Datastore = require('nedb-promise');

class Database {
    constructor(dbName) {
        this.db = dbName;
        this.dbFile = './data/DB/' + this.db + '.nedb';

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

module.exports = Database;