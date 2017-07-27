const logger = require('winston');
const DBhome = require('../data/home');

const homeDB = new DBhome.Data();

exports.all = async (req, res, next) => {
    logger.trace('HOME.JS');
    await next();
}

exports.get = async (req, res, next) => {
    logger.trace('GET happened');
    const homedata = await homeDB.getAllData();
    res.json(homedata);
}

exports.put = async (req, res, next) => {
    logger.trace('POST happened');
    next(new Error('Not yet implemented'));
}