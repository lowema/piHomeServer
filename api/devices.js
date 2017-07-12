// devices.js
//
// Looks after the persistance of devices
//==========================================================================================================
var logger = require('winston');

exports.all = function (req, res, next) {
    logger.trace('DEVICES.JS');
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