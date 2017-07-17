const path = require('path');
const express = require('express');

// app settings
const settings = require('./settings').settings;

const logger = require('./logger');
logger.level = settings.logging.logLevel;
var app = express();
app.use(require('./access.js'));

//***API routes are defined here
logger.info('API ROUTES ...');
var router = new express.Router();
require('./api').apiSetup(router);
app.use(router);

//***STATIC routes set up here for serving a client app
logger.info('STATIC ROUTES ...');
//viewed at http://localhost:{port}
logger.info('ROUTE: /');
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'static/client') + '/index.html');
});
logger.info('ROUTE: /bower_components');
app.use('/bower_components', express.static(path.join(__dirname, 'static/bower_components')));
logger.info('ROUTE: /client');
app.use('/client', express.static(path.join(__dirname, 'static/client')));
logger.info('ROUTE: /admin');
app.use('/admin', express.static(path.join(__dirname, 'static/admin')));

require('./collectors').init();
app.listen(settings.server.portNumber, function () {
    logger.info('PiHomeServer is now listening: PORT(' + settings.server.portNumber + ')');
});