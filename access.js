const settings = require('./settings').settings;
const fs = require('fs');
const path = require('path');
const FileStreamRotator = require('file-stream-rotator');
const morgan = require('morgan');

// ensure log directory exists
fs.existsSync(settings.logging.logDirectory) || fs.mkdirSync(settings.logging.logDirectory);
// create a rotating write stream
var accessStreamParameters = {
    date_format: 'YYYYMMDD',
    filename: path.join(settings.logging.logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
};
var accessLogStream = FileStreamRotator.getStream(accessStreamParameters);

module.exports = morgan(settings.logging.accessLogTokens, { stream: accessLogStream });