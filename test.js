const logger = require('./logger');
const DB = require('./dbaccess');

const doHouseStuff = async () => {
    const house = new DB.House();

    await house.addRoom('Lounge');
    await house.addRoom('Kitchen');
    await house.addRoom('Verrandah');
    await house.deleteRoom('Verrandah');
    await house.addRoom('Conservatory');

    const [data,count] = [await house.getAllData(),await house.getCount()];
    logger.info(count + ' records in total.');
    logger.info(data);

    await house.deleteAllData();

    const [data2,count2] = [await house.getAllData(),await house.getCount()];
    logger.info(count2 + ' records in total.');
    logger.info(data2);

}

logger.info('TEST STARTS ...');
doHouseStuff();
logger.info('TEST ENDS ...');
