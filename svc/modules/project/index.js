const project = require('./project');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'project';
module.exports = (app) => {
  app.post(`/${CONST.API}/${MODULE}/list`, authenticate.isAuthenticated, project.getProjectList);
  app.get(`/${CONST.API}/${MODULE}/:id/team`, authenticate.isAuthenticated, project.getTeam);
  app.post(`/${CONST.API}/${MODULE}/:id/openroles`, authenticate.isAuthenticated, project.getOpenRoles);
  app.post(`/${CONST.API}/${MODULE}/openroles`, authenticate.isAuthenticated, project.getOpenRoles);
  app.post(`/${CONST.API}/${MODULE}/teams`, authenticate.isAuthenticated, project.getProjectTeams);
  app.get(`/${CONST.API}/${MODULE}/:id/details`, authenticate.isAuthenticated, project.getProjectDetail);
  app.put(`/${CONST.API}/${MODULE}/details`, authenticate.isAuthenticated, project.insertProjectDetail);
  app.post(`/${CONST.API}/${MODULE}/:id/details`, authenticate.isAuthenticated, project.updateProjectDetail);
  app.get(`/${CONST.API}/${MODULE}/:id/notes`, authenticate.isAuthenticated, project.getProjectNotes);
  app.put(`/${CONST.API}/${MODULE}/:id/notes`, authenticate.isAuthenticated, project.insertProjectNotes);
  app.post(`/${CONST.API}/${MODULE}/:id/notes`, authenticate.isAuthenticated, project.updateProjectNotes);
  app.delete(`/${CONST.API}/${MODULE}/:id/notes/:noteid`, authenticate.isAuthenticated, project.deleteProjectNote);
  app.get(`/${CONST.API}/${MODULE}/:id/notes/:noteid`, authenticate.isAuthenticated, project.getProjectNotes);
  app.put(`/${CONST.API}/${MODULE}/:id/role`, authenticate.isAuthenticated, project.insertProjectRole);
  app.post(`/${CONST.API}/${MODULE}/:id/bulkroleupdate`, authenticate.isAuthenticated, project.bulkRoleUpdate);

}