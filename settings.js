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
        "logLevel": 'info',
        "accessLogTokens": ":date[iso] :method :url :status :response-time :user-agent :remote-addr :remote-user"
    },
    "collectors": [
        { "name": 'RSS Collector', "cron": '*/10 * * * *', "module": './collectors/RSS/getNews' },
        { "name": 'RSS Expirer', "cron": '* */12 * * *', "module": './collectors/RSS/expireArticles' },
        { "name": 'Weather Collector', "cron": '*/20 * * * *', "module": './collectors/weather/getWeather' }
    ],
    "weather":{
        "openWeatherKey": "66aad567a94e22100a5323d748cc9ebf",
        "openWeatherURL": "http://api.openweathermap.org/data/2.5/"
    },
    "allcollectors": [
        { "name": 'RSS Collector', "cron": '*/10 * * * *', "module": './collectors/RSS/getNews' },
        { "name": 'RSS Expirer', "cron": '* */12 * * *', "module": './collectors/RSS/expireArticles' },
        { "name": 'Weather Collector', "cron": '*/10 * * * * *', "module": './collectors/weather/getWeather' },
        { "name": 'Test Collector', "cron": '*/10 * * * * *', "module": './collectors/test' }
    ]
}