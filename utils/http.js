const logger = require('winston');
const request = require('request');

const httpRequest = (options) => {
    return new Promise((resolve, reject) => {
        request(options, (err, res, req) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}

class Endpoint {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async get(relativeURL, queryString) {
        logger.info('HTTP Request [GET %s] %s', this.baseURL, relativeURL);
        const opt = { baseUrl: this.baseURL, url: relativeURL, qs: queryString };
        let res = null;
        try {
            res = await httpRequest(opt);
        } catch (error) {
            res = null;
            logger.error('HTTP ENDPOINT ERROR [%j]', error);
        }

        return res;
    }
    async post(body) {
        await logger.info('HTTP Request [POST] %s', this.URL);
        const res = 'POST meh';

        return res;
    }
    async put(body) {
        await logger.info('HTTP Request [PUT] %s', this.URL);
        const res = 'PUT meh';

        return res;
    }
    async delete() {
        await logger.info('HTTP Request [DELETE] %s', this.URL);
        const res = 'DELETE meh';

        return res;
    }
}

exports.Endpoint = Endpoint;
