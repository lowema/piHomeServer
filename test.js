const logger = require('./logger');
const DBhome = require('./data/home');
const DBrooms = require('./data/rooms');
const DBfeeds = require('./data/feeds');

const doHomeStuff = async () => {
    const home = new DBhome.Data();
    await home.add('My Home');

    const rooms = new DBrooms.Data();

    await rooms.addRoom('Lounge');
    await rooms.addRoom('Kitchen');
    await rooms.addRoom('Bedroom');

    const [datah,counth] = [await home.getAllData(),await home.getCount()];
    logger.info(datah);
    logger.info(counth + ' records in total.');

    const [datar,countr] = [await rooms.getAllData(),await rooms.getCount()];
    logger.info(datar);
    logger.info(countr + ' records in total.');
}

const doFeedStuff = async () => {
    const feeds = new DBfeeds.Data();

    await feeds.add('BBC News','http://feeds.bbci.co.uk/news/rss.xml');
    await feeds.add('Guardian News','https://www.theguardian.com/uk/rss');

    const [data,count] = [await feeds.getAllData(),await feeds.getCount()];
    logger.info(data);
    logger.info(count + ' records in total.');
}

logger.info('TEST STARTS ...');
doHomeStuff();
logger.info('TEST ENDS ...');

logger.info('TEST STARTS ...');
doFeedStuff();
logger.info('TEST ENDS ...');
