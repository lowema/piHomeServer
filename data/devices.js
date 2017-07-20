const logger = require('winston');
const Database = require('./DB');

class DeviceDB extends Database {
    constructor() {
        super('devicesDB');
        this.database.ensureIndex({ fieldName: 'deviceName', unique: true });

    }
    async add(deviceName) {
        logger.debug('DB [' + this.db + '] add device: ' + deviceName);
        var idx = {
            deviceName: deviceName
        };
        var doc = {
            deviceName: deviceName,
            createdAt: Date.now()
        };

        const record = await this.database.update(idx, doc, { upsert: true, returnUpdatedDocs: true });

        return record;
    }
    async delete(deviceName) {
        logger.debug('DB [' + this.db + '] delete device: ' + deviceName);
        var idx = {
            deviceName: deviceName
        };

        await this.database.remove(idx, { multi: true });
    }
    async linkToRoom(deviceName, roomName) {
        logger.debug('DB [' + this.db + '] link device: ' + deviceName);
        var idx = {
            deviceName: deviceName
        };
        var doc = {
            $set: {
                inRoom: roomName
            }
        };

        const record = await this.database.update(idx, doc, { upsert: true, returnUpdatedDocs: true });

        return record;
    }
    async getDevicesInRoom(roomName) {
        logger.debug('DB [' + this.db + '] get devices for room: ' + roomName);
        var idx = {
            inRoom: roomName
        };

        const record = await this.database.find(idx);

        return record;
    }
}
exports.Data = DeviceDB;