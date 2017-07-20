const logger = require('winston');
const Database = require('./DB');

class RoomDB extends Database {
    constructor() {
        super('roomDB');
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

        const record = await this.database.update(idx, doc, { upsert: true, returnUpdatedDocs: true });

        return record;
    }
    async deleteRoom(roomName) {
        logger.debug('DB [' + this.db + '] delete room: ' + roomName);
        var idx = {
            roomName: roomName
        };

        await this.database.remove(idx, { multi: true });
    }
}

exports.Data = RoomDB;