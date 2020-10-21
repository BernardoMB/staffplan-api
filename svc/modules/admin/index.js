const admin = require('./admin');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');

const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  fileSize: 10 * 1024 * 1024
});

const MODULE = 'admin';
module.exports = (app) => {
  app.put(`/${CONST.API}/${MODULE}/calendar/:year`, authenticate.isAuthenticated, admin.insertCalendar);
  app.get(`/${CONST.API}/${MODULE}/users`, authenticate.isAuthenticated, admin.getUsers);
  app.put(`/${CONST.API}/${MODULE}/user`, authenticate.isAuthenticated, admin.insertUser);
  app.post(`/${CONST.API}/${MODULE}/user/:id`, authenticate.isAuthenticated, admin.updateUser);
  app.post(`/${CONST.API}/${MODULE}/user/:id/active`, authenticate.isAuthenticated, admin.activeUser);
  app.get(`/${CONST.API}/${MODULE}/user/:id/office`, authenticate.isAuthenticated, admin.getOfficeAccess);
  app.put(`/${CONST.API}/${MODULE}/user/:id/office/:officeId`, authenticate.isAuthenticated, admin.addOfficeAccess);
  app.delete(`/${CONST.API}/${MODULE}/user/:id/office/:officeId`, authenticate.isAuthenticated, admin.removeOfficeAccess);
  app.post(`/${CONST.API}/${MODULE}/user/:id/reset`, authenticate.isAuthenticated, admin.resetPassword);
  app.get(`/${CONST.API}/${MODULE}/:id/photo`, authenticate.isAuthenticated, admin.getAdminPhoto);
  app.put(`/${CONST.API}/${MODULE}/:id/photo`, authenticate.isAuthenticated, upload.single('photo'), admin.insertAdminPhoto);
}