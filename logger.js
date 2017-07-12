const settings = require('./settings').settings;
const fs = require('fs');
const logger = require('winston');

// ensure log directory exists
fs.existsSync(settings.logging.logDirectory) || fs.mkdirSync(settings.logging.logDirectory);

// Set up logger
var customColours = {
    trace: 'cyan',
    debug: 'cyan',
    info: 'white',
    warn: 'yellow',
    error: 'red',
    fatal: 'red'
};

var customLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5
};

logger.setLevels(customLevels);
logger.addColors(customColours);

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    prettyPrint: true,
    colorize: true,
    silent: false,
    timestamp: false
});

//logger.remove(logger.transports.File);
logger.add(logger.transports.File, {
    filename: settings.logging.logDirectory + '/debug.log',
    level: 'trace',
    prettyPrint: true,
    colorize: false,
    silent: false,
    timestamp: true
});

module.exports = logger;