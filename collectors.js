const cron = require('node-cron');
const logger = require('winston');

const init = () => {
    logger.info('Starting Background Collectors');

    global.settings.collectors.forEach((collector) => {
        logger.debug(collector.name);
        cron.schedule(collector.cron, require(collector.module));
    });
}

exports.init = init;