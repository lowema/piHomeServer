const logger = require('winston');
const feed = require('./feedRead');
const DBfeeds = require('../../data/feeds');
const DBarticles = require('../../data/articles');

const feedDB = new DBfeeds.Data();
const articleDB = new DBarticles.Data();

const feedHandler = (err, articles) => {
    if (err) {
        logger.error('RSS Collector - Articles did not get refreshed.');
    } else {
        articles.forEach((article) => {
            // each article will become part of the articles database
            articleDB.add(
                article.guid,
                article.title,
                article.content,
                article.author,
                article.link,
                article.feed.source,
                article.feed.name,
                article.sourceID
            );
        }, this);
        logger.info('RSS Collector - ' + articles.length + ' articles fetched from RSS feed');
    }
}

const runMe = async () => {
    logger.info('RSS Collector - Fetching all RSS feeds');

    const feedData = await feedDB.getAllData();

    feedData.forEach((feedEntry) => {
        logger.info('RSS Collector - Fetching %s [%s] ', feedEntry.feedURL, feedEntry._id );
        feed.get(feedEntry.feedURL, feedEntry._id , feedHandler);
    });
}

module.exports = runMe;