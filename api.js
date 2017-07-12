const logger = require('winston');

exports.apiSetup = function (router) {

    logger.trace('in API.JS');
    // test API
    logger.info('ROUTE: /test');
    router.route('/test')
        .all(require('./api/apiTest').all)
        .get(require('./api/apiTest').get)
        .put(require('./api/apiTest').put)
        .post(require('./api/apiTest').post)
        .delete(require('./api/apiTest').delete);


    // home management API
    logger.info('ROUTE: /home');
    router.route('/home')
        .all(require('./api/home').all)
        .get(require('./api/home').get)
        .put(require('./api/home').put);

    logger.info('ROUTE: /home/rooms');
    router.route('/home/rooms')
        .all(require('./api/rooms').all)
        .get(require('./api/rooms').get)
        .post(require('./api/rooms').post);

    logger.info('ROUTE: /home/rooms/:roomID');
    router.route('/home/rooms/:roomID')
        .all(require('./api/room-id').all)
        .get(require('./api/room-id').get)
        .put(require('./api/room-id').put)
        .delete(require('./api/room-id').delete);

    logger.info('ROUTE: /home/rooms/:roomID/devices');
    router.route('/home/rooms/:roomID/devices')
        .all(require('./api/devices').all)
        .get(require('./api/devices').get)
        .post(require('./api/devices').post);

    logger.info('ROUTE: /home/rooms/:roomID/devices/:deviceID');
    router.route('/home/rooms/:roomID/devices/:deviceID')
        .all(require('./api/device-id').all)
        .get(require('./api/device-id').get)
        .put(require('./api/device-id').put)
        .delete(require('./api/device-id').delete);


    // device manipulation API

}