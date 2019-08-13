const router = function(app) {
    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });
};

module.exports = router;
