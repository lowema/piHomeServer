const logger = require('winston');
const accuWeather = require('./accuWeather');
const openWeather = require('./openWeather');

const DBLocations = require('../../data/locations');
const DBWeather = require('../../data/weather');

const locationsDB = new DBLocations.DB();
const weatherDB = new DBWeather.DB();

const runMe = async () => {
    logger.info('Weather Collector - Fetching all locations');
    const locations = await locationsDB.getAllData();
    
    logger.info('Removing previous weather data');
    await weatherDB.deleteAllData();

    locations.forEach(async (location) => {
        logger.info('Weather Collector - Fetching %s from %s', location.locationName, location.weatherProvider);

        if (location.locationID === null) {
            logger.error('FFS');
        }

        let weatherData = new DBWeather.Record();

        switch (location.weatherProvider) {
        case 'openWeather':
            weatherData = await openWeather.weather(location.locationID);
            break;
        case 'accuWeather':
            weatherData = await accuWeather.weather(location.locationID);
            break;
        default:
            logger.error('Unknown Weather Provider: %s', location.weatherProvider);
        }

        const record = await weatherDB.add(weatherData.idx, weatherData.doc);
        logger.debug(record);
    });
}

module.exports = runMe;