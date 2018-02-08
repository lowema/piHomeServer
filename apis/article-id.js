const logger = require('winston');

const DBarticleID = require('../data/articles');
const articleDB = new DBarticleID.Data();

exports.all = async (req, res, next) => {
    logger.trace('ARTICLE-ID.JS');
    await next();
}

exports.get = async (req, res, next) => {
    logger.trace('GET happened');
    res.json(await articleDB.getAllData());
}