module.exports = function(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send('You aren`t authorized')
  }

  next()
}