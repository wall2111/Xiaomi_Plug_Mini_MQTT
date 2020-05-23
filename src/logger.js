'use strict'
//***********************************************************
//* To use this class, require() it and access one of       *
//* its helper functions to log output from your            *
//* JavaScript code. Call the function that corresponds     *
//* to the level of granularity that you want. The message  *
//* will appear if its Level is >= the current log level    *
//* (default: INFO). Standard logging stuff. No surprises.  *
//*                                                         *
//* trace() - log a trace message (finest granularity)      *
//* debug()                                                 *
//* info()                                                  *
//* warn()                                                  *
//* error()                                                 *
//* fatal() - log a fatal message (coarsest granularity)    *
//*                                                         *
//* setLogLevel() - sets the log level to the specified     *
//* Level.                                                  *
//* Setting the LogLevel to Level.OFF turns off logging.    *
//***********************************************************
//*
//*
const SysUtil = require('./system-utils');

const Level = {
    TRACE : { priority : 0, outputString : 'TRACE' },
    DEBUG : { priority : 100, outputString : 'DEBUG' },
    INFO :  { priority : 200, outputString : 'INFO' },
    WARN :  { priority : 300, outputString : 'WARN' },
    ERROR :  { priority : 400, outputString : 'ERROR' },
    FATAL :  { priority : 500, outputString : 'FATAL' },
    OFF : { priority : 1000, outputString : 'OFF'}
};
// The current Log level
var logLevel = Level.INFO;
//console.log('Current log level: priority => ' + logLevel.priority + ', outputString => ' + logLevel.outputString);

var decorateOutputMessage = true;
function setDecorateOutputMessage(value) {
    decorateOutputMessage = value;
}

function log(messageLogLevel, message, source) {
    if (messageLogLevel.priority >= logLevel.priority) {
        let computedMessage = message.toString();
        if (decorateOutputMessage === true) {
            // Compute the message text based on log level output string, and whether
            /// or not the startTime was present
            let now = SysUtil.getTimeDbgStr(); //Date.now();
            let outputString = now + ' [' + messageLogLevel.outputString + ']';
            computedMessage = outputString + ': ' + ((source) ? source + ': ' : '') + message;
            // Now log the computed message
        }
        console.log(computedMessage);
    }
}

/**
 * Allows dependent module to mutate the log level
 */
function setLogLevel(newLevel) {
    logLevel = newLevel;
}

function setMessageOnlyOutput(value) {
    messageOnlyOutput = value;
}

/**
 * TRACE level messages
 */
function trace(message, source) {
    log(Level.TRACE, message, source);
}

/**
 * DEBUG level messages
 */
function debug(message, source) {
    log(Level.DEBUG, message, source);
}

/**
 * INFO level messages
 */
function info(message, source) {
    log(Level.INFO, message, source);
}

/**
 * WARN messages
 */
function warn(message, source) {
    log(Level.WARN, message, source);
}

/**
 * ERROR messages
 */
function error(message, source) {
    log(Level.ERROR, message, source);
}

/**
 * FATAL messages
 */
function fatal(message, source) {
    log(Level.FATAL, message, source);
}

//************************ 
// EXPORTS SECTION
//

module.exports.Level = Level;
module.exports.setLogLevel = setLogLevel;
module.exports.setDecorateOutputMessage = setDecorateOutputMessage;

module.exports.trace = trace;
module.exports.debug = debug;
module.exports.info = info;
module.exports.warn = warn;
module.exports.error = error;
module.exports.fatal = fatal;
