const logger = require('winston');

const DBWeather = require('../../data/weather');

exports.weather = async (locationID) => {
    await logger.info('AccuWeather handler %s', locationID);

    const data = new DBWeather.Record(locationID, null, null, Date.now());

    return data;
}