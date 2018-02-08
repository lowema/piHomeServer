// BEWARE global variables
global.settings = require('./settings').settings;

// set up logger
const logger = require('./utils/logger');
logger.level = global.settings.logging.logLevel;

// standard library and some express goodness
const express = require('express');
const path = require('path');

// app settings
const app = express();
app.use(require('./utils/access'));

//***API routes are defined here
logger.info('API ROUTES ...');
const apis = require('./apis');
app.use(apis.router());

//***STATIC routes set up here for serving a client app
logger.info('STATIC ROUTES ...');
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

// background data collectors
const collectors = require('./collectors');
collectors.init();

// drivers for devices etc
const drivers = require('./drivers');
drivers.init();

// and away we go ...
app.listen(global.settings.server.portNumber, () => {
    logger.info('PiHomeServer is now listening: PORT(' + global.settings.server.portNumber + ')');
});
