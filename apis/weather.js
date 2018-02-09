const logger = require('winston');

const DBlocations = require('../data/locations');
const DBweather = require('../data/weather');
const locations = new DBlocations.Data();
const weather = new DBweather.Data();

exports.all = async (req, res, next) => {
    logger.debug('WEATHER API');
    await next();
}

exports.notImplemented = async (req, res, next) => {
    logger.error('Method not implemented');
    await next(new Error('Not yet implemented'));
}

exports.getLocations = async (req, res, next) => {
    logger.trace('GET LOCATIONS happened');
    res.json(await locations.getAllData());
}

exports.deleteLocation = async (req, res, next) => {
    logger.trace('DELETE LOCATION happened');
    const id = req.params.locationID;
    await locations.deleteDataByID(id);

    res.status(201);
}

exports.getLocationWeather = async (req, res, next) => {
    logger.trace('GET LOCATION WEATHER happened');
    const idx = {locationID: req.params.locationID};
    const data = await weather.getDataByQuery(idx);

    res.json(data);
}

exports.getWeather = async (req, res, next) => {
    logger.trace('GET WEATHER happened');
    res.json(await weather.getAllData());
}


