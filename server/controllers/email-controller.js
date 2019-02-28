const sgMail = require('@sendgrid/mail');
var logger = require('../common/logger');

module.exports = function () {

    module.sendEmail = function (data, callback) {
        var apiKey = '';
        sgMail.setApiKey(apiKey);
        sgMail.send({
            to: data.query.to,
            from: data.query.from,
            subject: data.query.subject,
            text: data.query.text
        }, function (err, res) {
            if (err) {
                logger.error(err);
                callback({
                    success: false,
                    message: err
                })
                return;
            }
            else {
                logger.debug(JSON.stringify(res));
            }
            callback({
                success: true,
                message: res
            });
        });
    };

    return module;

}