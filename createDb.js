const User = require('./models/user').User;

var user = new User({
  username: 'Toliy',
  password: 'secret'
})

user.save(function (err, user, affected) {
  if (err) throw err;

  User.findOne({
    username: "Toliy"
  }, function(err, user) {
    console.log(user.get);
  })
})