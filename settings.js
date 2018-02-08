// settings.js
//
// all of the relevant server settings
//==========================================================================================================
const path = require('path');

exports.settings = {
    "server": {
        "portNumber": 3000
    },
    "DBpath": "/serverDB/",
    "logging": {
        "logDirectory": path.join(__dirname, 'log'),
        "logLevel": 'trace',
        "accessLogTokens": ":date[iso] :method :url :status :response-time :user-agent :remote-addr :remote-user"
    },
    "collectors": [
        { "name": 'RSS Collector', "cron": '*/1 * * * *', "module": './collectors/RSS/getNews' }
    ],
    "allcollectors": [
        { "name": 'RSS Collector', "cron": '*/10 * * * *', "module": './collectors/RSS/getNews' },
        { "name": 'RSS Expirer', "cron": '* */12 * * *', "module": './collectors/RSS/expireArticles' },
        { "name": 'Weather Collector', "cron": '*/10 * * * * *', "module": './collectors/weather/getWeather' },
        { "name": 'Test Collector', "cron": '*/10 * * * * *', "module": './collectors/test' }
    ]
}