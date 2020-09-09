const dashboard = require('./dashboard');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'dashboard';
module.exports = (app) => {
  app.get(`/${CONST.API}/${MODULE}/details/:officeId/:date/:projectStatus`,
    authenticate.isAuthenticated, dashboard.getDashboardDetails);
}
