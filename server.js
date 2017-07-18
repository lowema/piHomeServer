const path = require('path');
const express = require('express');
const logger = require('./utils/logger');
const settings = require('./settings').settings;

// app settings
logger.level = settings.logging.logLevel;
let app = express();
app.use(require('./utils/access'));

//***API routes are defined here
logger.info('API ROUTES ...');
app.use(require('./api').router());

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

require('./collectors').init();
app.listen(settings.server.portNumber, () => {
    logger.info('PiHomeServer is now listening: PORT(' + settings.server.portNumber + ')');
});