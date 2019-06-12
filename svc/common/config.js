const masterDB = require('../env.json');

const encryption = {
  KEY: 'StaffPlanner',
  SUPERSECRETTIME: 6060,
  SUPERSECRETREFRESHTIME: 6000
}

module.exports = {
  DB: { ...masterDB },
  AUTH: { ...encryption },
  DOMAINCHECK: false,
  SENDGRID_API_KEY: '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',
  FROM_EMAIL: 'donotreply@staffplan.io',
  RESET_EXPIRY_IN_HOUR: 24
}
