var express = require('express');
var router = express.Router();
var emailController = require('../controllers/email-controller')();
var logger = require('../common/logger');

/* Post a new playbook item */
router.get('/send', function (req, res, next) {
    emailController.sendEmail(req, function (payload) {
        res.json(payload);
    });
});

module.exports = router;
