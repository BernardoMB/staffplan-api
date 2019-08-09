const assignment = require('./assignment');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'project';
const SUBMODULE = 'assignment';
module.exports = (app) => {
  app.get(`/${CONST.API}/${MODULE}/:id/role`, authenticate.isAuthenticated, assignment.getProjectRole);
  app.put(`/${CONST.API}/${MODULE}/:id/role`, authenticate.isAuthenticated, assignment.insertProjectRole);
  app.post(`/${CONST.API}/${MODULE}/:id/bulkroleupdate`, authenticate.isAuthenticated, assignment.bulkRoleUpdate);
  app.post(`/${CONST.API}/${MODULE}/:id/deleterole`, authenticate.isAuthenticated, assignment.deleteRole);
  app.post(`/${CONST.API}/${SUBMODULE}/:id/alert`, authenticate.isAuthenticated, assignment.getAlert);
  app.post(`/${CONST.API}/${SUBMODULE}/assign`, authenticate.isAuthenticated, assignment.assignStaff);
}