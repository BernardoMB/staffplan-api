const environment = require('../env.json');

const encryption = {
  KEY: 'StaffPlanner',
  SUPERSECRETTIME: 6060,
  SUPERSECRETREFRESHTIME: 6000
}

module.exports = {
  DB: { ...environment },
  AUTH: { ...encryption },
  DOMAINCHECK: false,
  SENDGRID_API_KEY: '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',
  FROM_EMAIL: 'donotreply@staffplan.io',
  RESET_EXPIRY_IN_HOUR: 24,
  LOG_LEVEL: 'debug',
  COMPANY_NAME: environment.companyName,
  ENVIRONMENT_NAME: environment.name
}
