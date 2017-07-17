var logger = require('winston');

exports.all = async (req, res, next) => {
    logger.trace('ROOM-ID.JS (' + req.params.roomID + ')');
    await next();
}

exports.get = async (req, res, next) => {
    logger.trace('GET happened');
    res.sendStatus(200);
}

exports.put = async (req, res, next) => {
    logger.trace('POST happened');
    await next(new Error('Not yet implemented'));
}

exports.delete = async (req, res, next) => {
    logger.trace('DELETE happened');
    await next(new Error('Not yet implemented'));
}