const checkAuth = require('../middleware/checkAuth');

const router = function(app) {
    app.get('/', require('./frontpage').get);

    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);

    app.post('/logout', require('./logout').post);

    app.get('/chat', checkAuth, require('./chat').get);
};

module.exports = router;
