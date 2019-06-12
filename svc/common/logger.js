const bunyan = require('bunyan');
const config = require('./config');

// create a logger instance
const logger = bunyan.createLogger({
  name: 'StaffPlan',
  level: config.LOG_LEVEL,
  serializers: bunyan.stdSerializers
});

module.exports = logger;
