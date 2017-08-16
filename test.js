const logger = require('./utils/logger');
const DBhome = require('./data/home');
const DBrooms = require('./data/rooms');
const DBdevices = require('./data/devices');
const DBfeeds = require('./data/feeds');

const doHomeStuff = async() => {
    const home = new DBhome.Data();
    logger.info(await home.add('My Home'));

    const rooms = new DBrooms.Data();
    logger.info(await rooms.addRoom('Lounge'));
    logger.info(await rooms.addRoom('Kitchen'));
    logger.info(await rooms.addRoom('Bedroom'));

    const devices = new DBdevices.Data();
    logger.info(await devices.add('Lamp 1', 'lighting', 'hue'));
    logger.info(await devices.add('Lamp 2', 'lighting', 'hue'));
    logger.info(await devices.add('Lamp 3', 'lighting', 'hue'));
    logger.info(await devices.add('Lamp 4', 'lighting', 'hue'));
    logger.info(await devices.add('Lamp 5', 'lighting', 'hue'));

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

const doFeedStuff = async() => {
    const feeds = new DBfeeds.Data();

    await feeds.deleteAllData();

    await feeds.add('BBC News', 'http://feeds.bbci.co.uk/news/rss.xml', 86400);
    await feeds.add('Guardian News', 'https://www.theguardian.com/uk/rss', 86400);

    const [data, count] = [await feeds.getAllData(), await feeds.getCount()];
    logger.info(data);
    logger.info(count + ' records in total.');
}

const DBLocations = require('./data/locations');
const doWeatherStuff = async() => {
    const data = new DBLocations.DB();

    await data.deleteAllData();

    await data.add(new DBLocations.Record('Heathrow, GB', 7284876, 51.4673, -0.4529, 'openWeather', true));
    await data.add(new DBLocations.Record('Birmingham, GB', 2655603, 52.481419, -1.89983, 'openWeather', false));

    const [recs, count] = [await data.getAllData(), await data.getCount()];
    logger.info(recs);
    logger.info(count + ' records in total.');
}

const httpLib = require('./utils/http');
const doHTTPStuff = async () => {

    const httpEndpoint = new httpLib.Endpoint('http://news.bbc.co.uk/');

    const get1 = await httpEndpoint.get('/');
    const get2 = await httpEndpoint.get('/poopz.html');

    logger.info(get1);
    logger.info(get2);

}

//logger.info('TEST STARTS ...');
//doHomeStuff();
//logger.info('TEST ENDS ...');

//logger.info('TEST STARTS ...');
//doFeedStuff();
//logger.info('TEST ENDS ...');

logger.info('TEST STARTS ...');
doWeatherStuff();
logger.info('TEST ENDS ...');

logger.info('TEST STARTS ...');
doHTTPStuff();
logger.info('TEST ENDS ...');

