const logger = require('winston');
const DBhome = require('../data/home');

const homeDB = new DBhome.Data();

exports.all = function (req, res, next) {
    logger.trace('HOME.JS');
    next();
}

exports.get = function (req, res, next) {
    logger.trace('GET happened');
    res.sendStatus(200);
}

exports.put = function (req, res, next) {
    logger.trace('POST happened');
    next(new Error('Not yet implemented'));
}