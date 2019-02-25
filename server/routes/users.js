var express = require('express');
var router = express.Router();
var userController = require('../controllers/user-controller')();

/*Get all users*/
router.get('/users', function (req, res, next) {
  userController.login(req.body, function(payload) {
    res.json(payload);
  });
  console.log('users')
});

/* User login */
router.post('/login', function (req, res, next) {
  userController.login(req.body, function(payload) {
    res.json(payload);
  });
});

/* User signup */
router.post('/signup', function (req, res, next) {
  userController.signup(req.body, function(payload) {
    res.json(payload);
  });
});

module.exports = router;
