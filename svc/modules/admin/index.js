const admin = require('./admin');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');

const MODULE = 'admin';
module.exports = (app) => {
  app.put(`/${CONST.API}/${MODULE}/calendar/:year`, authenticate.isAuthenticated, admin.insertCalendar);
}