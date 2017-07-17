const logger = require('./logger');
const DB = require('./dbaccess');

const doHouseStuff = async () => {
    const house = new DB.House();

    await house.addRoom('Lounge');
    await house.addRoom('Kitchen');
    await house.addRoom('Bedroom');

    const [data,count] = [await house.getAllData(),await house.getCount()];
    logger.info(count + ' records in total.');
    logger.info(data);
}

const doFeedStuff = async () => {
    const feeds = new DB.Feeds();

    await feeds.add('BBC News','http://feeds.bbci.co.uk/news/rss.xml');
    await feeds.add('Guardian News','https://www.theguardian.com/uk/rss');

    const [data,count] = [await feeds.getAllData(),await feeds.getCount()];
    logger.info(count + ' records in total.');
    logger.info(data);
}

logger.info('TEST STARTS ...');
doHouseStuff();
logger.info('TEST ENDS ...');

logger.info('TEST STARTS ...');
doFeedStuff();
logger.info('TEST ENDS ...');
