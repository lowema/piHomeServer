// settings.js
//
// all of the relevant server settings
//==========================================================================================================
const path = require('path');

exports.settings = {
    "server": {
        "portNumber": 3000
    },
    "logging": {
        "logDirectory": path.join(__dirname, 'log'),
        "logLevel": 'trace',
        "accessLogTokens": ":date[iso] :method :url :status :response-time :user-agent :remote-addr :remote-user"
    },
    "collectors": [
        { "name": 'RSS Collector', "cron": '*/30 * * * * *', "module": './collectors/getNews' },
        { "name": 'Test Collector', "cron": '*/10 * * * * *', "module": './collectors/test' }
    ]
}

exports.feeds = {
    "RSS": [
        'http://feeds.bbci.co.uk/news/rss.xml',
        'https://www.theguardian.com/uk/rss'
    ]
}