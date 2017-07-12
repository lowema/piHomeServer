var ds = deepstream('localhost:6020');
var koTools = new KoTools(ko);

var ArticleViewModel = function () {
    this.record = ds.record.getAnonymousRecord();
    this.title = koTools.getObservable(this.record, 'title');
    this.content = koTools.getObservable(this.record, 'content');
    this.published = koTools.getObservable(this.record, 'published');
    this.author = koTools.getObservable(this.record, 'author');
    this.link = koTools.getObservable(this.record, 'link');
    this.guid = koTools.getObservable(this.record, 'guid');
};

var ArticleListEntryViewModel = function (articleRecordName, viewList) {
    this.record = ds.record.getRecord(articleRecordName);
    this.viewList = viewList;
    this.title = koTools.getObservable(this.record, 'title');
    this.published = koTools.getObservable(this.record, 'published');
    this.isActive = ko.observable(false);
};

var AppViewModel = function () {
    this.articles = koTools.getViewList(ArticleListEntryViewModel, ds.record.getList('articles'));
    this.article = new ArticleViewModel();
};

AppViewModel.prototype.selectArticle = function (articleAppViewModel) {
    this.article.record.setName(articleAppViewModel.record.name);
    this.articles.callOnEntries('isActive', [false]);
    articleAppViewModel.isActive(true);
};

ds.login(function () {
    ko.applyBindings(new AppViewModel());
});