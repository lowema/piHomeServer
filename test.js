const logger = require('./utils/logger');
const DBhome = require('./data/home');
const DBrooms = require('./data/rooms');
const DBdevices = require('./data/devices');
const DBfeeds = require('./data/feeds');

const doHomeStuff = async () => {
    const home = new DBhome.Data();
    logger.info(await home.add('My Home'));

    const rooms = new DBrooms.Data();
    logger.info(await rooms.addRoom('Lounge'));
    logger.info(await rooms.addRoom('Kitchen'));
    logger.info(await rooms.addRoom('Bedroom'));

    const devices = new DBdevices.Data();
    logger.info(await devices.add('Lamp 1'));
    logger.info(await devices.add('Lamp 2'));
    logger.info(await devices.add('Lamp 3'));
    logger.info(await devices.add('Lamp 4'));
    logger.info(await devices.add('Lamp 5'));

    logger.info(await devices.linkToRoom('Lamp 1', 'Lounge'));
    logger.info(await devices.linkToRoom('Lamp 4', 'Lounge'));

    logger.info(await devices.linkToRoom('Lamp 2', 'Bedroom'));

    logger.info(await devices.getDevicesInRoom('Lounge'));


    const [datah, counth] = [await home.getAllData(), await home.getCount()];
    logger.info(datah);
    logger.info(counth + ' records in total.');

    const [datar, countr] = [await rooms.getAllData(), await rooms.getCount()];
    logger.info(datar);
    logger.info(countr + ' records in total.');

    const [datad, countd] = [await devices.getAllData(), await devices.getCount()];
    logger.info(datad);
    logger.info(countd + ' records in total.');
}

const doFeedStuff = async () => {
    const feeds = new DBfeeds.Data();

    await feeds.add('BBC News', 'http://feeds.bbci.co.uk/news/rss.xml');
    await feeds.add('Guardian News', 'https://www.theguardian.com/uk/rss');

    const [data, count] = [await feeds.getAllData(), await feeds.getCount()];
    logger.info(data);
    logger.info(count + ' records in total.');
}

logger.info('TEST STARTS ...');
doHomeStuff();
logger.info('TEST ENDS ...');

logger.info('TEST STARTS ...');
doFeedStuff();
logger.info('TEST ENDS ...');