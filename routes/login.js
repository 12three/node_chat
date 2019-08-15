const User = require('../models/user').User;
const AuthError = require('../error').AuthError;

exports.get = function(req, res) {
    res.render('login');
};

exports.post = function(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.authorize(username, password, function(err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return res.status(403).send(err.message);
            }

            return next(err);
        }

        req.session.user = user._id;
        res.end();
    })
}
