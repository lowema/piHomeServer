var logger = require('winston');
const DBrooms = require('../data/rooms');

const roomsDB = new DBrooms.Data();

exports.all = function (req, res, next) {
    logger.trace('ROOMS.JS');
    next();
}

exports.get = function (req, res, next) {
    logger.trace('GET happened');
    res.sendStatus(200);
}

exports.post = function (req, res, next) {
    logger.trace('POST happened');
    next(new Error('Not yet implemented'));
}