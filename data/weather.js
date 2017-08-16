const logger = require('winston');
const Database = require('./DB');

class WeatherIcons {
    constructor() {
        this.sunny = 0;
        this.intermittentCloud = 1;
        this.cloudy = 2;
        this.rainy = 3;
        this.stormy = 4;
        this.thundery = 5;
        this.snowy = 6;
        this.misty = 7;
        this.foggy = 8;
        this.mad = 99;
    }
}
exports.Icons = WeatherIcons;

class WeatherStats {
    constructor(dayText, temp, high, low, conditions, icon)
    {
        this.dayText = dayText;
        this.temperature = temp
        this.highTemp = high;
        this.lowTemp = low;
        this.conditions = conditions;
        this.icon = icon;
    }
}
exports.Stats = WeatherStats;

class WeatherRecord {
    constructor(locationID, currentStats, forecastArray, collectedOn) {
        this.locationID = locationID;
        this.current = currentStats;
        this.forecast = forecastArray;
        this.collected = collectedOn;

        this.supplier = 'openWeather';
    }
    get doc() {
        return {
            locationID: this.locationID,
            currentStats: this.current,
            forecastStats: this.forecast,
            collectedOn: this.collected,
            supplier: this.supplier
        };
    }
    get idx() {
        return {
            locationID: this.locationID
        };
    }
}
exports.Record = WeatherRecord;

class WeatherDB extends Database {
    constructor() {
        super('weatherDB');
        this.database.ensureIndex({ fieldName: 'locationID', unique: true });
    }
    async add(idx, doc) {
        logger.debug('DB [' + this.db + '] add feed: ' + doc.locationID);
        const record = await this.database.update(idx, doc, { upsert: true, returnUpdatedDocs: true });

        return record;
    }
    async delete(idx) {
        logger.debug('DB [' + this.db + '] delete feed: ' + idx.locationID);

        await this.database.remove(idx, { multi: true });
    }
}
exports.DB = WeatherDB;