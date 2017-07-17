const logger = require('winston');
const feed = require('./feedRead');
const DB = require('../../dbaccess');

const feedDB = new DB.Feeds();
const articleDB = new DB.Articles();

const feedHandler = (err, articles) => {
    if (err) {
        logger.error('RSS Collector - Articles did not get refreshed.');
    } else {
        articles.forEach((article) => {
            // each article will become part of the articles database
            articleDB.add(article.guid,
                article.title,
                article.content,
                article.author,
                article.link,
                article.feed.source,
                article.feed.name);
        }, this);
        logger.info('RSS Collector - ' + articles.length + ' articles fetched from RSS feed');
    }
}

const runMe = async () => {
    logger.info('RSS Collector - Fetching all RSS feeds');

    const feedData = await feedDB.getAllData();

    feedData.forEach((feedEntry) => {
        logger.info('RSS Collector - Fetching ' + feedEntry.feedURL);
        feed.get(feedEntry.feedURL, feedHandler);
    });
}

module.exports = runMe;