const logger = require('winston');
const Database = require('./DB');

class LocationData {
    constructor(locationName, locationID, lat, long, weatherProvider, isDefault) {
        this.locationName = locationName;
        this.locationID = locationID;
        this.lat = lat;
        this.long = long;
        this.weatherProvider = weatherProvider;
        this.isDefault = isDefault;
    }
    get doc() {
        return {
            locationName: this.locationName,
            locationID: this.locationID,
            lat: this.lat,
            long: this.long,
            weatherProvider: this.weatherProvider,
            isDefault: this.isDefault
        };
    }
    get idx() {
        return {
            locationName: this.locationName
        };
    }
}

exports.Record = LocationData;

class LocationsDB extends Database {
    constructor() {
        super('locationsDB');
        this.database.ensureIndex({ fieldName: 'locationName', unique: true });
    }
    async add(record) {
        logger.debug('DB [' + this.db + '] add feed: ' + record.doc.locationName);
        const result = await this.database.update(record.idx, record.doc, { upsert: true, returnUpdatedDocs: true });

        return result;
    }
    async delete(idx) {
        logger.debug('DB [' + this.db + '] delete feed: ' + idx.locationName);

        await this.database.remove(idx, { multi: true });
    }
}

exports.DB = LocationsDB;