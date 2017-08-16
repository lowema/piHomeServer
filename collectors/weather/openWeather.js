const logger = require('winston');
const moment = require('moment');

const DBWeather = require('../../data/weather');
const httpUtils = require('../../utils/http');

const weatherAPIKey = '66aad567a94e22100a5323d748cc9ebf';

exports.weather = async (locationID) => {
    logger.info('OpenWeather handler %s', locationID);

    const icons = new DBWeather.Icons();
    const httpEndpoint = new httpUtils.Endpoint('http://api.openweathermap.org/data/2.5/');

    const current = await httpEndpoint.get('/weather', { id: locationID, APPID: weatherAPIKey, units: 'metric' });

    let currentStats = {};
    if (current.statusCode === 200) {
        const currentJSON = JSON.parse(current.body);
        logger.info('%j',currentJSON);

        logger.info(moment(currentJSON.dt).format("ddd Do"));
        logger.info('SYS --> %j',currentJSON.sys);
        logger.info('MAIN --> %j',currentJSON.main);
        logger.info('WEATHER --> %j',currentJSON.weather);

        currentStats = new DBWeather.Stats('Mon 2', 22, 32, 10, 'Sunny with late mist', icons.sunny);

    } else {
        logger.error('OpenWeather current weather handler had a HTTP error [%s]', current.statusCode);
    }

    let forecastArray = [];
    const forecast = await httpEndpoint.get('/forecast', { id: locationID, APPID: weatherAPIKey, units: 'metric' });
    if (forecast.statusCode === 200) {
        const forecastJSON = JSON.parse(forecast.body);

        const forecastStats = new DBWeather.Stats('Tue 3', 22, 32, 10, 'Sunny with late mist', icons.sunny);

        forecastArray.push(forecastStats);

    } else {
        logger.error('OpenWeather current weather handler had a HTTP error [%s]', current.statusCode);
    }

    const data = new DBWeather.Record(locationID, currentStats, forecastArray, Date.now());

    return data;
}