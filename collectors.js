const cron = require('node-cron');
const logger = require('winston');

var init = function () {
    logger.info('Starting Background Collectors');

    global.settings.collectors.forEach(function (collector) {
        logger.debug(collector.name);
        cron.schedule(collector.cron, require(collector.module));
    });
}

exports.init = init;