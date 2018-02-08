const logger = require('winston');

const DBarticles = require('../data/articles');
const DBfeeds = require('../data/feeds');
const articles = new DBarticles.Data();
const feeds = new DBfeeds.Data();

let dataID = '';

//ALL functions
exports.all = async (req, res, next) => {
    logger.trace('ARTICLES');
    await next();
}

exports.allID = async (req, res, next) => {
    logger.debug('ARTICLES ARTICLEID(' + req.params.articleID + ')');
    dataID = req.params.articleID;
    await next();
}  

exports.allSourceID = async (req, res, next) => {
    logger.debug('ARTICLES SOURCEID (' + req.params.sourceID + ')');
    dataID = req.params.sourceID;
    await next();
}    

// REST methods
exports.get = async (req, res, next) => {
    logger.trace('GET ARTICLES happened');
    res.json(await articles.getAllData());
}

exports.getID = async (req, res, next) => {
    logger.debug('GET ID happened');
    const data = await articles.getDataByID(dataID);
    res.json(data);
}    

exports.getSources = async (req, res, next) => {
    logger.debug('GET SOURCES happened');
    res.json(await feeds.getAllData());
}

exports.postSources = async (req, res, next) => {
    logger.debug('POST SOURCES happened');
    next(new Error('Not yet implemented'));
}

exports.putSourcesID = async (req, res, next) => {
    logger.debug('PUT SOURCESID happened');
    next(new Error('Not yet implemented'));
}

exports.deleteSourcesID = async (req, res, next) => {
    logger.debug('DELETE SOURCESID happened');
    next(new Error('Not yet implemented'));
}

exports.getSourcesIDArticles = async (req, res, next) => {
    logger.debug('GET SOURCES ARTICLES happened');
    const sourceID = req.params.sourceID;
    const articleQuery = { sourceID: sourceID };
    const articleJSON = await articles.getDataByQuery(articleQuery);
    res.json(articleJSON);
}