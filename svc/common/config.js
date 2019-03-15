const masterDB = require('../../env.json');

const encryption = {
  KEY: 'StaffPlanner',
  SUPERSECRETTIME: 6060,
  SUPERSECRETREFRESHTIME: 6000
}

module.exports = {
  DB: { ...masterDB },
  AUTH: { ...encryption }
}
