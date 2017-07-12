// device-id.js
//
// looks after the persistance of device IDs
//==========================================================================================================
var logger = require('winston');

exports.all = function (req, res, next) {
    logger.trace('DEVICE-ID.JS (' + req.params.deviceID + ')');
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

exports.delete = function (req, res, next) {
    logger.trace('DELETE happened');
    next(new Error('Not yet implemented'));
}