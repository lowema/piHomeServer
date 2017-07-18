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

        const record = await this.database.update(idx, doc, { upsert: true });

        return record;
    }
    async deleteRoom(roomName) {
        logger.debug('DB [' + this.db + '] delete room: ' + roomName);
        var idx = {
            roomName: roomName
        };

        await this.database.remove(idx, { multi: true });
    }
    async linkDevice(roomName,deviceID) {
        logger.debug('DB [' + this.db + '] link device: ' + roomName + ' [' + deviceID + ']');
        var idx = {
            roomName: roomName
        };
        const record = await this.database.find(idx);
        logger.debug('IN: %j',record);
        if (record) {
            logger.debug('Inserting ID');
            const devices = new Set();
            if (record.devices) { devices.add(record.devices) };
            devices.add(deviceID);
            record.devices = [...devices];
            logger.debug('OUT: %j',record);
            await this.database.update(idx, record, { upsert: true });
        }
    }
}

exports.Data = RoomDB;