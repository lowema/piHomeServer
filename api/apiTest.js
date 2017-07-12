// apitest.js
//
// a test module to see if the endpoint works
//==========================================================================================================

exports.all = function (req, res, next) {
    console.log('APITEST.JS');
    next();
}

exports.get = function (req, res, next) {
    console.log('GET happened');
    res.sendStatus(200);
}

exports.post = function (req, res, next) {
    console.log('POST happened');
    next(new Error('Not yet implemented'));
}

exports.put = function (req, res, next) {
    console.log('POST happened');
    next(new Error('Not yet implemented'));
}

exports.delete = function (req, res, next) {
    console.log('POST happened');
    next(new Error('Not yet implemented'));
}