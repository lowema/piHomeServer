var logger = require('winston');
const DBrooms = require('../data/rooms');

const roomsDB = new DBrooms.Data();

exports.all = async (req, res, next) => {
    logger.trace('ROOMS.JS');
    await next();
}

exports.get = async (req, res, next) => {
    logger.trace('GET happened');
    res.sendStatus(200);
}

exports.post = async (req, res, next) => {
    logger.trace('POST happened');
    await next(new Error('Not yet implemented'));
}