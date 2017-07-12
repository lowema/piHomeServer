// server.js
//
// server initialisation
//==========================================================================================================
const path = require('path');
const express = require('express');

// app settings
const settings = require('./settings').settings;

// winston logger
const logger = require('./logger');
logger.level = settings.logging.logLevel;

//this is an express application
var app = express();
// server access log middleware
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
//route to the bower modules
logger.info('ROUTE: /bower_components');
app.use('/bower_components', express.static(path.join(__dirname, 'static/bower_components')));
//route to the client application at /client
logger.info('ROUTE: /client');
app.use('/client', express.static(path.join(__dirname, 'static/client')));
//route to the admin application at /admin
logger.info('ROUTE: /admin');
app.use('/admin', express.static(path.join(__dirname, 'static/admin')));


// start data collectors off
require('./collectors').init();

//and listen
app.listen(settings.server.portNumber, function () {
    logger.info('PiHomeServer is now listening: PORT(' + settings.server.portNumber + ')');
});