const dashboard = require('./dashboard');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const util = require('../../common/util');

module.exports = (app) => {
  app.get(`/${CONST.API}/getDashboardDetails/:officeCity`, authenticate.isAuthenticated, dashboard.getDashboardDetails);
}