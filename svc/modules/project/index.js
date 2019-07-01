const project = require('./project');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'project';
module.exports = (app) => {
  app.post(`/${CONST.API}/${MODULE}/list`, authenticate.isAuthenticated, project.getProjectList);
  app.get(`/${CONST.API}/${MODULE}/:id/team`, authenticate.isAuthenticated, project.getTeam);
}