const logger = require('winston');
const DBfeeds = require('../../data/feeds');
const DBarticles = require('../../data/articles');

const runMe = async () => {
    logger.info('RSS Collector - Expiring Articles');

    const feedDB = new DBfeeds.Data();
    const articleDB = new DBarticles.Data();
    const feedData = await feedDB.getAllData();

    feedData.forEach(async(feedEntry) => {
        logger.info('RSS Collector - Expiring feed %s', feedEntry.feedURL);
        const expiryDate = Date.now() + feedEntry.expiryTime;
        logger.trace('Expiry: %s', expiryDate);
        const numberRemoved = await articleDB.removeExpiredArticles(feedEntry.feedURL, expiryDate);
        logger.info('RSS Collector - Removed %s records', numberRemoved);
    });
}

module.exports = runMe;