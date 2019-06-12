const authenticate = require('./authenticate');
const util = require('../../common/util');
const CONST = require('../../common/const');
const MODULE = 'auth';

module.exports = (app) => {
  // Validate user login
  app.post(`/${CONST.API}/${MODULE}/authenticate`, authenticate.validateUser);
  // Trigger reset email on forgot password
  app.post(`/${CONST.API}/${MODULE}/forgot`, authenticate.forgot);
  // Validate the reet request is valid
  app.post(`/${CONST.API}/${MODULE}/reset`, authenticate.reset);
  // API used to change Password
  app.post(`/${CONST.API}/${MODULE}/changePassword`, authenticate.changePassword);
  app.get('/', authenticate.isAuthenticated, (res) => {
    util.successResponse(res, {});
  });
}
