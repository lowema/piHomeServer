const logger = require('winston');

const DBarticles = require('../data/articles');
const articlesDB = new DBarticles.Data();

exports.all = async (req, res, next) => {
    logger.trace('ARTICLES.JS');
    await next();
}

exports.get = async (req, res, next) => {
    logger.trace('GET happened');
    res.json(await articlesDB.getAllData());
}