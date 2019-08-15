const User = require('../models/user').User;

module.exports = function(req, res, next) {
    const uid = req.session.user;
    req.user = res.locals.user = null;

    if (!uid) return next();

    if (uid) {
      User.findById(uid, function (err, user) {
        if (err) return next(err)

        req.user = res.locals.user = user;
        next();
      })
    }
};