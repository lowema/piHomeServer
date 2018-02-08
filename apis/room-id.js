var logger = require('winston');

const DBrooms = require('../data/rooms');
const roomsDB = new DBrooms.Data();

exports.all = async (req, res, next) => {
    logger.debug('ROOM-ID.JS (' + req.params.roomID + ')');
    await next();
}

exports.get = async (req, res, next) => {
    const roomID = req.params.roomID;
    logger.debug('GET happened for room %s', roomID);
    const roomJSON = await roomsDB.getDataByID(roomID);
    logger.debug('JSON --> %j', roomJSON);
    res.json(roomJSON);
}

exports.put = async (req, res, next) => {
    logger.trace('POST happened');
    await next(new Error('Not yet implemented'));
}

exports.delete = async (req, res, next) => {
    logger.trace('DELETE happened');
    await next(new Error('Not yet implemented'));
}