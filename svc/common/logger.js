const bunyan = require('bunyan');
const config = require('./config');

// create a logger instance
const logger = bunyan.createLogger({
  name: 'StaffPlan',
  level: config.LOG_LEVEL,
  serializers: bunyan.stdSerializers,
  environment: config.ENVIRONMENT_NAME,
  company: config.COMPANY_NAME
});

module.exports = logger;
