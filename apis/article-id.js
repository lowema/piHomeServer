var logger = require('winston');
const DB = require('../data/articles');

const articlesDB = new DB.Data();

exports.all = async (req, res, next) => {
    logger.trace('ARTICLE-ID.JS');
    await next();
}

exports.get = async (req, res, next) => {
    logger.trace('GET happened');
    const data = await articlesDB.getAllData();
    res.json(data);
}