var logger = require('winston');

exports.all = async (req, res, next) => {
    logger.trace('DEVICES.JS');
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