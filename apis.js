const logger = require('winston');
const express = require('express');
const exUtils = require('./utils/expressUtils');

exports.router = () => {
    logger.trace('in API.JS');
    const router = new express.Router();
    // test API
    logger.info('ROUTE: /test');
    const apiTest = require('./apis/apiTest');
    router.route('/test')
        .all(exUtils.catchAsyncErrors(apiTest.all))
        .get(exUtils.catchAsyncErrors(apiTest.get))
        .put(exUtils.catchAsyncErrors(apiTest.put))
        .post(exUtils.catchAsyncErrors(apiTest.post))
        .delete(exUtils.catchAsyncErrors(apiTest.delete));

    // articles from RSS collector
    logger.info('ROUTE: /articles');
    const articlesAPI = require('./apis/articles');
    router.route('/articles')
        .all(exUtils.catchAsyncErrors(articlesAPI.all))
        .get(exUtils.catchAsyncErrors(articlesAPI.get));

    logger.info('ROUTE: /article/{ID}');
    const articleAPI = require('./apis/article-id');
    router.route('/articles/:articleID')
        .all(exUtils.catchAsyncErrors(articleAPI.all))
        .get(exUtils.catchAsyncErrors(articleAPI.get));

    // home management API
    logger.info('ROUTE: /home');
    const homeAPI = require('./apis/home');
    router.route('/home')
        .all(exUtils.catchAsyncErrors(homeAPI.all))
        .get(exUtils.catchAsyncErrors(homeAPI.get))
        .put(exUtils.catchAsyncErrors(homeAPI.put));

    logger.info('ROUTE: /home/rooms');
    const roomsAPI = require('./apis/rooms');
    router.route('/home/rooms')
        .all(exUtils.catchAsyncErrors(roomsAPI.all))
        .get(exUtils.catchAsyncErrors(roomsAPI.get))
        .post(exUtils.catchAsyncErrors(roomsAPI.post));

    logger.info('ROUTE: /home/rooms/{roomID}');
    const roomAPI = require('./apis/room-id');
    router.route('/home/rooms/:roomID')
        .all(exUtils.catchAsyncErrors(roomAPI.all))
        .get(exUtils.catchAsyncErrors(roomAPI.get))
        .put(exUtils.catchAsyncErrors(roomAPI.put))
        .delete(exUtils.catchAsyncErrors(roomAPI.delete));

    logger.info('ROUTE: /home/rooms/{roomID}/devices');
    const devicesAPI = require('./apis/devices');
    router.route('/home/rooms/:roomID/devices')
        .all(exUtils.catchAsyncErrors(devicesAPI.all))
        .get(exUtils.catchAsyncErrors(devicesAPI.get))
        .post(exUtils.catchAsyncErrors(devicesAPI.post));

    logger.info('ROUTE: /home/rooms/{roomID}/devices/{deviceID}');
    const deviceAPI = require('./apis/device-id');
    router.route('/home/rooms/:roomID/devices/:deviceID')
        .all(exUtils.catchAsyncErrors(deviceAPI.all))
        .get(exUtils.catchAsyncErrors(deviceAPI.get))
        .put(exUtils.catchAsyncErrors(deviceAPI.put))
        .delete(exUtils.catchAsyncErrors(deviceAPI.delete));

    return router;
}