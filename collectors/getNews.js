const logger = require('winston');
const deepstream = require('deepstream.io-client-js');
const feeds = require('../settings').feeds;
const feed = require('./feedRead');

var feedArray = feeds.RSS;
const client = deepstream('localhost:6020').login();

client.on('error', (error, event, topic) => {
    logger.error('DEEPSTREAM ERROR: %s [%s],[%s]', error, event, topic);
});

const list = client.record.getList('articles');

var feedHandler = (err, articles) => {
    if (err) {
        logger.error('RSS Collector - Articles did not get refreshed.');
    } else {
        articles.forEach((article) => {
            // each article will become part of a deepstream list ... articles(article) type
            const record = client.record.getRecord('articles/' + article.guid);
            record.whenReady((rec) => {
                rec.set(article, (e) => {
                    if (e) {
                        logger.error('RSS Collector - Record set with error: ', e);
                    } else {
                        list.addEntry('articles/' + article.guid);
                    }
                });
            });
        }, this);
        logger.info('RSS Collector - ' + articles.length + ' articles fetched from RSS feed');
    }
}

var fetchAll = () => {
    logger.info('RSS Collector - Fetching all RSS feeds');
    list.setEntries([]);
    list.whenReady(() => {
        feedArray.forEach((URL) => {
            logger.info('RSS Collector - Fetching ' + URL);
            feed.get(URL, feedHandler);
        });
    });
}

module.exports = fetchAll;