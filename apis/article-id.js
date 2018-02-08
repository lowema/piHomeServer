const logger = require('winston');

const DBarticleID = require('../data/articles');
const articleDB = new DBarticleID.Data();

exports.all = async (req, res, next) => {
    logger.trace('ARTICLE-ID.JS');
    await next();
}

exports.get = async (req, res, next) => {
    logger.trace('GET happened');
    const articleID = req.params.articleID;
    logger.debug('GET happened for article %s', articleID);
    const articleJSON = await articleDB.getDataByID(articleID);
    logger.debug('JSON --> %j', articleJSON);
    res.json(articleJSON);
}