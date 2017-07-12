const feed = require('./rss-reader');
const logger = require('winston');
const feeds = require('../settings').feeds;
const deepstream = require('deepstream.io-client-js');

var feedArray = feeds.RSS;
const client = deepstream('localhost:6020').login();

client.on('error', (error, event, topic) => {
    logger.error('ERROR: %1 [%2],[%3]', error, event, topic);
});

const list = client.record.getList('articles');

var feedHandler = function (err, articles) {
    if (err) {
        logger.error('Articles did not get refreshed');
    } else {
        articles.forEach(function (article) {
            // each article will become part of a deepstream list ... articles(article) type
            //logger.debug(article);
            logger.debug(article.guid);
            const record = client.record.getRecord('articles/' + article.guid);
            record.set(article);
            list.addEntry('articles/' + article.guid);
        }, this);
        logger.info(articles.length + ' articles fetched from RSS feed');
    }
}

var fetchAll = function () {
    logger.info('Fetching RSS feeds');
    list.setEntries([]);
    feedArray.forEach(function (URL) {
        logger.info('Fetching: ' + URL);
        feed(URL, feedHandler);
    });
}

module.exports = fetchAll;