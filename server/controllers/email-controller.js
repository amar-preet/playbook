const sgMail = require('@sendgrid/mail');
var logger = require('../common/logger');

module.exports = function () {

    module.sendEmail = function (data, callback) {
        logger.debug('Send from controller data is ', data.query.text)
        logger.debug('Send from controller to is ', data.query.to)
        logger.debug('Send from controller ', data.query)
        var apiKey = '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';
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