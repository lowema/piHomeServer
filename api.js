const logger = require('winston');
const express = require('express');

var router = new express.Router();

const checkReservedParams = (routeHandler, ...reserved) => {
    return (req, res, next) => {
        for (const reservedKey of reserved) {
            if (req.body[reservedKey]) {
                return res.status(400).json({
                    error: `Cannot specify ${reservedKey} as part of request body`
                });
            }
        }

        routeHandler(req, res, next);
    }
};

const catchAsyncErrors = (routeHandler) => {
    return async (req, res, next) => {
        try {
            await routeHandler(req, res, next);
        } catch (err) {
            next(err);
        }
    }
};


exports.router = () => {
    logger.trace('in API.JS');
    // test API
    logger.info('ROUTE: /test');
    const apiTest = require('./api/apiTest');
    router.route('/test')
        .all(catchAsyncErrors(apiTest.all))
        .get(catchAsyncErrors(apiTest.get))
        .put(catchAsyncErrors(apiTest.put))
        .post(catchAsyncErrors(apiTest.post))
        .delete(catchAsyncErrors(apiTest.delete));


    // home management API
    logger.info('ROUTE: /home');
    const homeAPI = require('./api/home');
    router.route('/home')
        .all(catchAsyncErrors(homeAPI.all))
        .get(catchAsyncErrors(homeAPI.get))
        .put(catchAsyncErrors(homeAPI.put));

    logger.info('ROUTE: /home/rooms');
    const roomsAPI = require('./api/rooms');
    router.route('/home/rooms')
        .all(catchAsyncErrors(roomsAPI.all))
        .get(catchAsyncErrors(roomsAPI.get))
        .post(catchAsyncErrors(roomsAPI.post));

    logger.info('ROUTE: /home/rooms/{roomID}');
    const roomAPI = require('./api/room-id');
    router.route('/home/rooms/:roomID')
        .all(catchAsyncErrors(roomAPI.all))
        .get(catchAsyncErrors(roomAPI.get))
        .put(catchAsyncErrors(roomAPI.put))
        .delete(catchAsyncErrors(roomAPI.delete));

    logger.info('ROUTE: /home/rooms/{roomID}/devices');
    const devicesAPI = require('./api/devices');
    router.route('/home/rooms/:roomID/devices')
        .all(catchAsyncErrors(devicesAPI.all))
        .get(catchAsyncErrors(devicesAPI.get))
        .post(catchAsyncErrors(devicesAPI.post));

    logger.info('ROUTE: /home/rooms/{roomID}/devices/{deviceID}');
    const deviceAPI = require('./api/device-id');
    router.route('/home/rooms/:roomID/devices/:deviceID')
        .all(catchAsyncErrors(deviceAPI.all))
        .get(catchAsyncErrors(deviceAPI.get))
        .put(catchAsyncErrors(deviceAPI.put))
        .delete(catchAsyncErrors(deviceAPI.delete));

    return router;
}