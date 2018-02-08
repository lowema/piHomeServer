var logger = require('winston');

const DBrooms = require('../data/rooms');
const database = new DBrooms.Data();

let dataID = '';

exports.all = async (req, res, next) => {
    logger.debug('ROOM-ID.JS (' + req.params.roomID + ')');
    dataID = req.params.roomID;
    await next();
}

exports.get = async (req, res, next) => {
    const data = await database.getDataByID(dataID);
    res.json(data);
}

exports.put = async (req, res, next) => {
    logger.trace('POST happened');
    await next(new Error('Not yet implemented'));
}

exports.delete = async (req, res, next) => {
    logger.trace('DELETE happened');
    await database.deleteDataByID(dataID);
    res.status(201);
}