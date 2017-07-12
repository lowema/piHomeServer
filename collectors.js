const cron = require('node-cron');
const logger = require('winston');
const settings = require('./settings').settings;

var init = function () {
    logger.info('Starting Background Collectors');

    settings.collectors.forEach(function (collector) {
        logger.debug(collector.name);
        cron.schedule(collector.cron, require(collector.module));
    });

}

exports.init = init;