const async = require('async');
const crypto = require('crypto');
const AuthError = require('../error').AuthError;
const mongoose = require('../libs/mongoose'),
  Schema = mongoose.Schema;

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    require: true,
  },
  created: {
    type: Date,
    default: Date.now
  }
})

schema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt)
    .update(password)
    .digest('hex');
};

schema.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(() => this._plainPassword)

schema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
}

schema.statics.authorize = function(username, password, callback) {
  const User = this;

  if (!username || !password) {
      callback(new AuthError('Login and password are required'));
  }

  async.waterfall(
    [
        cb => User.findOne({ username }, cb),
        (user, cb) => {
            if (user) {
                if (user.checkPassword(password)) {
                    cb(null, user);
                } else {
                    cb(new AuthError('Incorrect password'));
                }
            } else {
                const user = new User({
                    username,
                    password,
                });

                user.save(err => {
                    if (err) return cb(err);

                    cb(null, user);
                });
            }
        },
    ],
    callback
  );
}

exports.User = mongoose.model('User', schema);

