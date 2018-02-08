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
    const articlesAPI = require('./apis/articles');
    logger.info('ROUTE: /news/articles');
    router.route('/news/articles')
        .all(exUtils.catchAsyncErrors(articlesAPI.all))
        .get(exUtils.catchAsyncErrors(articlesAPI.get));

    logger.info('ROUTE: /news/articles/{ID}');
    router.route('/news/articles/:articleID')
        .all(exUtils.catchAsyncErrors(articlesAPI.allID))
        .get(exUtils.catchAsyncErrors(articlesAPI.getID));

    logger.info('ROUTE: /news/sources');
    router.route('/news/sources')
        .all(exUtils.catchAsyncErrors(articlesAPI.all))
        .post(exUtils.catchAsyncErrors(articlesAPI.postSources))
        .get(exUtils.catchAsyncErrors(articlesAPI.getSources));

    logger.info('ROUTE: /news/sources/{ID}');
    router.route('/news/sources/:sourceID')
        .all(exUtils.catchAsyncErrors(articlesAPI.all))
        .put(exUtils.catchAsyncErrors(articlesAPI.putSourcesID))
        .delete(exUtils.catchAsyncErrors(articlesAPI.deleteSourcesID));

    logger.info('ROUTE: /news/sources/{ID}');
    router.route('/news/sources/:sourceID/articles')
        .all(exUtils.catchAsyncErrors(articlesAPI.all))
        .get(exUtils.catchAsyncErrors(articlesAPI.getSourcesIDArticles));

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