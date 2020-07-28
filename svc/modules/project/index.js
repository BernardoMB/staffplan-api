const project = require('./project');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'project';
module.exports = (app) => {
  // Get Project Grid
  app.post(
    `/${CONST.API}/${MODULE}/list`,
    authenticate.isAuthenticated,
    project.getProjectList
  );
  app.post(
    `/${CONST.API}/${MODULE}/list-count`,
    authenticate.isAuthenticated,
    project.getProjectListCount
  );
  app.post(
    `/${CONST.API}/${MODULE}/workload`,
    authenticate.isAuthenticated,
    project.getWorkload
  );
  app.post(
    `/${CONST.API}/${MODULE}/workload-list`,
    authenticate.isAuthenticated,
    project.getWorkloadList
  );
  app.post(
    `/${CONST.API}/${MODULE}/workload-bench`,
    authenticate.isAuthenticated,
    project.getWorkloadBench
  );
  app.post(
    `/${CONST.API}/${MODULE}/workload-unassigned`,
    authenticate.isAuthenticated,
    project.getWorkloadUnassigned
  );
  app.post(
    `/${CONST.API}/${MODULE}/workload-count`,
    authenticate.isAuthenticated,
    project.getWorkloadListCount
  );
  app.post(
    `/${CONST.API}/${MODULE}/openroles`,
    authenticate.isAuthenticated,
    project.getOpenRoles
  );
  app.post(
    `/${CONST.API}/${MODULE}/openroles-count`,
    authenticate.isAuthenticated,
    project.getOpenRolesListCount
  );
  app.post(
    `/${CONST.API}/${MODULE}/teams`,
    authenticate.isAuthenticated,
    project.getProjectTeams
  );
  app.post(
    `/${CONST.API}/${MODULE}/teams-count`,
    authenticate.isAuthenticated,
    project.getProjectTeamsCount
  );
  // Project details CUR operations
  app.get(
    `/${CONST.API}/${MODULE}/:id/details`,
    authenticate.isAuthenticated,
    project.getProjectDetailById
  );
  app.post(
    `/${CONST.API}/${MODULE}/:id/details`,
    authenticate.isAuthenticated,
    project.updateProjectDetail
  );
  app.put(
    `/${CONST.API}/${MODULE}/details`,
    authenticate.isAuthenticated,
    project.insertProjectDetail
  );
};
