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
exports.Feed = FeedsDB;