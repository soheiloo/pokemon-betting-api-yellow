const EventEmitter = require('events').EventEmitter;

var messageBus = new EventEmitter();
messageBus.setMaxListeners(100);

module.exports.messageBus = messageBus;
