const logger = require('winston');

exports.all = async (req, res, next) => {
    logger.info('TEST.JS(all)');
    await next();
}

exports.get = async (req, res, next) => {
    const plop = await logger.info('TEST.JS(get)');
    res.sendStatus(200);
    return plop;
}

exports.post = async (req, res, next) => {
    console.log('POST happened');
    next(new Error('Not yet implemented'));
}

exports.put = async (req, res, next) => {
    console.log('POST happened');
    next(new Error('Not yet implemented'));
}

exports.delete = async (req, res, next) => {
    console.log('POST happened');
    next(new Error('Not yet implemented'));
}