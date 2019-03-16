const authenticate = require('./authenticate');
const util = require('../../common/util');
const CONST = require('../../common/const');

module.exports = (app) => {
  app.post(`/${CONST.API}/authenticate`, authenticate.validateUser);
  app.get('/', authenticate.isAuthenticated, (res) => {
    util.successResponse(res, {});
  });
}
