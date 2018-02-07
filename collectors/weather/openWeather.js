const logger = require('winston');
const moment = require('moment');

const DBWeather = require('../../data/weather');
const httpUtils = require('../../utils/http');

const weatherAPIKey = '66aad567a94e22100a5323d748cc9ebf';

const makeStatsData = (statJSON) => {
    logger.debug('JSON --> %j',statJSON);
    logger.debug('MAIN --> %j',statJSON.main);
    logger.debug('WEATHER --> %j',statJSON.weather[0]);

    return new DBWeather.Stats(
                            moment.unix(statJSON.dt).format("ddd Do"),
                            statJSON.main.temp, 
                            statJSON.main.temp_max, 
                            statJSON.main.temp_min,
                            statJSON.weather[0].main,
                            statJSON.weather[0].description,
                            statJSON.weather[0].icon);
}

exports.weather = async (locationID) => {
    logger.info('+=====================================================================================================================================================');
    logger.info('OpenWeather handler %s', locationID);

    const icons = new DBWeather.Icons();
    const httpEndpoint = new httpUtils.Endpoint('http://api.openweathermap.org/data/2.5/');

    logger.debug('Current Outlook');
    let currentStats = {};
    const current = await httpEndpoint.get('/weather', { id: locationID, APPID: weatherAPIKey, units: 'metric' });
    if (current.statusCode === 200) {
        const currentJSON = JSON.parse(current.body);
        currentStats = makeStatsData(currentJSON);
        logger.debug('currentStats --> %j',currentStats);
    } else {
        logger.error('OpenWeather current weather handler had a HTTP error [%s]', current.statusCode);
    }

    logger.info('Forecast');
    let forecastArray = [];
    const forecast = await httpEndpoint.get('/forecast', { id: locationID, APPID: weatherAPIKey, units: 'metric' });
    if (forecast.statusCode === 200) {
        const forecastJSON = JSON.parse(forecast.body);
        logger.debug('LIST --> %j',forecastJSON.list);
        logger.debug('LIST LENGTH --> ' + forecastJSON.list.length);

        for (i = 0; i < forecastJSON.list.length; i++) { 
            logger.debug('LIST %s --> %j', i, forecastJSON.list[i]);
            forecastStats = makeStatsData(forecastJSON.list[i]);
            forecastArray.push(forecastStats);
        }

    } else {
        logger.error('OpenWeather current weather handler had a HTTP error [%s]', current.statusCode);
    }

    const data = new DBWeather.Record(locationID, currentStats, forecastArray, Date.now());

    return data;
}

