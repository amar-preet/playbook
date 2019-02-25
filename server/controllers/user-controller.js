var jwt         = require('jsonwebtoken');
var bcrypt      = require('bcrypt-nodejs');
var config      = require('config');
var User = require('../models/users');
var logger = require('../common/logger');

/* Export exposed functions */
module.exports = function() {

  module.signup = function(data, callback) {
    User.findOne({username: data.username}, function(err, user) {

      /* Make sure the user doesn't exist */
      // Error
      if (err) {
        logger.error(err);
        callback({
          success: false,
          message, err
        });
        return;
      }
      // User already exists
      else if (user) {
        logger.error('user already exists with username: ' + data.username);
        callback({
          success: false,
          message: 'user already exists with username: ' + data.username
        });
        return;
      }

      var user = new User({
        username: data.username,
        password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(8))
      });

      user.save(function (err) {
        var token = jwt.sign({ username: data.username }, config.secret, {
          expiresIn: '4380h'
        });
        if (err) {
          logger.error(err);
            callback({
              success: false,
              error: err
            });
        } else {
          logger.debug('user created: ' + user.username);
          callback({
            success: true,
            message: 'user created: ' + user.username,
            token:token
          });
        }
      });
    });
  }

  module.login = function(data, callback) {
    User.findOne({username: data.username}, function(err, user) {

      /* Make sure the user exists */
      // Error
      if (err) {
        logger.error(err);
        callback({
          success: false,
          message, err
        });
        return;
      }
      // User doesn't exist
      else if (!user) {
        logger.error('user not found with username: ' + data.username);
        callback({
          success: false,
          message: 'user not found with username: ' + data.username
        });
        return;
      }

      /* Validate password */
      if (!user.validPassword(data.password)) {
        logger.error('Incorrect password for username: ' + data.username);
        callback({
          success: false,
          message: 'Incorrect password',
        });
        return;
      }

      /* Generate token and return */
      var token = jwt.sign({ username: data.username }, config.secret, {
        expiresIn: '4380h'
      });

      callback({
        success: true,
        message: 'user successfully logged in',
        token: token
      });
    });
  }

  return module;
};
