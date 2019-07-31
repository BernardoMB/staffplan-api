const project = require('./project');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'project';
module.exports = (app) => {
  // Get Project Grid
  app.post(`/${CONST.API}/${MODULE}/list`, authenticate.isAuthenticated, project.getProjectList);
  app.post(`/${CONST.API}/${MODULE}/openroles`, authenticate.isAuthenticated, project.getOpenRoles);
  app.post(`/${CONST.API}/${MODULE}/teams`, authenticate.isAuthenticated, project.getProjectTeams);
  // Project details CUR operations
  app.get(`/${CONST.API}/${MODULE}/:id/details`, authenticate.isAuthenticated, project.getProjectDetailById);
  app.post(`/${CONST.API}/${MODULE}/:id/details`, authenticate.isAuthenticated, project.updateProjectDetail);
  app.put(`/${CONST.API}/${MODULE}/details`, authenticate.isAuthenticated, project.insertProjectDetail);
}