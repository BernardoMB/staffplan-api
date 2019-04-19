const master = require('./master');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');

module.exports = (app) => {
  app.get(`/${CONST.API}/commonListing/:modelName`, authenticate.isAuthenticated, master.getMasterList);
  app.get(`/${CONST.API}/getOfficeNameListing`, authenticate.isAuthenticated, master.getOfficeList);
  app.get(`/${CONST.API}/getCustomLabel`, authenticate.isAuthenticated, master.getCustomLabel);
}