const logger = require('winston');
const Database = require('./DB');

class DeviceDB extends Database {
    constructor() {
        super('devicesDB');
        this.database.ensureIndex({ fieldName: 'deviceName', unique: true });

    }
    async add(deviceName) {
        logger.debug('DB [' + this.db + '] add home: ' + deviceName);
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
        logger.debug('DB [' + this.db + '] delete home: ' + deviceName);
        var idx = {
            deviceName: deviceName
        };

        await this.database.remove(idx, { multi: true });
    }
}
exports.Data = DeviceDB;