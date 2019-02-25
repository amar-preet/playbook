var config  = require('config');
var winston = require('winston');

var useConsoleLogger = config.logging.useConsoleLogger;
var useFileLogger    = config.logging.useFileLogger;
var logfile          = config.logging.logfile;
var fileLogLevel     = config.logging.fileLogLevel;
var consoleLogLevel  = config.logging.consoleLogLevel;
var maxFileSize      = config.logging.maxFileSize;
var maxFiles         = config.logging.maxFiles;

// Instantiate and configure winston logger
var transports = [];
if (useConsoleLogger) {
  transports.push(new winston.transports.Console({
    level: consoleLogLevel,
    handleExceptions: true,
    json: false,
    colorize: true,
    silent: (process.env.NODE_ENV === 'test') ? true : false,
    timestamp: true
  }));
}
if (useFileLogger) {
  transports.push(new winston.transports.File({
    level: fileLogLevel,
    filename: logfile,
    handleExceptions: true,
    json: false,
    maxsize: maxFileSize,
    maxFiles: maxFiles,
    colorize: false,
    timestamp: true
  }));
}
var logger = new winston.Logger({
  transports: transports,
  exitOnError: false
});

module.exports = logger;
