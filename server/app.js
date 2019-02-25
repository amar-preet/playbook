var config          = require('config');
var express         = require('express');
var expressWinston  = require('express-winston');
var bodyParser      = require('body-parser');
var _				        = require('lodash');
var cors 			      = require('cors');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');

var users         = require('./routes/users');
var playbooks     = require('./routes/playbooks');
var playbookitems = require('./routes/playbookitems');
var logger        = require('./common/logger');
var Promise		    = require('es6-promise');
var email         = require('./routes/email');
const sgMail      = require('@sendgrid/mail');

var app = express();

app.use(cors());
app.set('port', config.port || 3200);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/users', users);
app.use('/playbooks', playbooks);
app.use('/playbookitems', playbookitems);
app.get('/send', email);
mongoose.set('debug', true);

mongoose.connect('mongodb://' + config.database.dbServer + '/' + config.database.dbDialect);

// * Use express-winston middleware for express route logging
app.use(expressWinston.logger({
  transports: _.values(logger.transports),
  winstonInstance: logger
}));

// * Use express-winston middleware for express route error logging
app.use(expressWinston.errorLogger({
  transports: _.values(logger.transports),
  winstonInstance: logger
}));

app.listen(app.get('port'), function() {
  logger.info('playbooks API listening on port ' + app.get('port'));
});

// module.exports = app;
