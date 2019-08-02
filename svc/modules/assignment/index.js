const assignment = require('./assignment');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'project';
module.exports = (app) => {
  app.get(`/${CONST.API}/${MODULE}/:id/role`, authenticate.isAuthenticated, assignment.getProjectRole);
  app.put(`/${CONST.API}/${MODULE}/:id/role`, authenticate.isAuthenticated, assignment.insertProjectRole);
  app.post(`/${CONST.API}/${MODULE}/:id/bulkroleupdate`, authenticate.isAuthenticated, assignment.bulkRoleUpdate);
  app.delete(`/${CONST.API}/${MODULE}/:id/deleterole`, authenticate.isAuthenticated, assignment.deleteRole);
}