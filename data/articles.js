const logger = require('winston');
const Database = require('./DB');

class ArticlesDB extends Database {
    constructor() {
        super('articlesDB');
        this.database.ensureIndex({ fieldName: 'articleGUID', unique: true });
    }
    async add(articleGUID, title, contents, author, URL, feedURL, feedTitle) {
        logger.debug('DB [' + this.db + '] add article: ' + articleGUID);
        var idx = {
            articleGUID: articleGUID
        };
        var doc = {
            title: title,
            contents: contents,
            author: author,
            URL: URL,
            feedURL: feedURL,
            feedTitle: feedTitle,
            articleGUID: articleGUID,
            createdAt: Date.now()
        };

        const record = await this.database.update(idx, doc, { upsert: true, returnUpdatedDocs: true });

        return record;
    }
    async delete(articleGUID) {
        logger.debug('DB [' + this.db + '] delete article: ' + articleGUID);
        var idx = {
            articleGUID: articleGUID
        };

        await this.database.remove(idx, { multi: true });
    }
}

exports.Data = ArticlesDB;