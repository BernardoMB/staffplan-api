const dashboard = require('./dashboard');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'dashboard';
module.exports = (app) => {
  app.post(`/${CONST.API}/${MODULE}/details`,
    authenticate.isAuthenticated, dashboard.getDashboardDetails);
  app.post(`/${CONST.API}/${MODULE}/graph`,
    authenticate.isAuthenticated, dashboard.getGraphData);
}
