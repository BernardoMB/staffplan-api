const master = require('./master');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'common';
module.exports = (app) => {
  app.get(`/${CONST.API}/master/:modelName`, authenticate.isAuthenticated, master.getMasterList);
  app.get(`/${CONST.API}/${MODULE}/office`, authenticate.isAuthenticated, master.getOfficeList);
  app.get(`/${CONST.API}/${MODULE}/year`, authenticate.isAuthenticated, master.getYears);
  app.get(`/${CONST.API}/${MODULE}/label`, authenticate.isAuthenticated, master.getCustomLabel);
  app.post(`/${CONST.API}/${MODULE}/updatePreference`, authenticate.isAuthenticated, master.updatePreference);
}