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

  // Project group crud
  app.put(
    `/${CONST.API}/${MODULE}/group/details`,
    authenticate.isAuthenticated,
    project.insertProjectGroupDetail
  );
  app.post(
    `/${CONST.API}/${MODULE}/group/list`,
    authenticate.isAuthenticated,
    project.getProjectGroupList
  );
  app.post(
    `/${CONST.API}/${MODULE}/group/list-count`,
    authenticate.isAuthenticated,
    project.getProjectGroupListCount
  );
  app.get(
    `/${CONST.API}/${MODULE}/group/:id/details`,
    authenticate.isAuthenticated,
    project.getProjectGroupDetailById
  );
  app.patch(
    `/${CONST.API}/${MODULE}/group/:id/details`,
    authenticate.isAuthenticated,
    project.updateProjectGroupDetail
  );
  app.delete(
    `/${CONST.API}/${MODULE}/group/:id`,
    authenticate.isAuthenticated,
    project.deleteProjectGroupById
  );

  // Project status crud
  app.put(
    `/${CONST.API}/${MODULE}/status/details`,
    authenticate.isAuthenticated,
    project.insertProjectStatusDetail
  );
  app.post(
    `/${CONST.API}/${MODULE}/status/list`,
    authenticate.isAuthenticated,
    project.getProjectStatusList
  );
  app.post(
    `/${CONST.API}/${MODULE}/status/list-count`,
    authenticate.isAuthenticated,
    project.getProjectStatusListCount
  );
  app.get(
    `/${CONST.API}/${MODULE}/status/:id/details`,
    authenticate.isAuthenticated,
    project.getProjectStatusDetailById
  );
  app.patch(
    `/${CONST.API}/${MODULE}/status/:id/details`,
    authenticate.isAuthenticated,
    project.updateProjectStatusDetail
  );
  app.delete(
    `/${CONST.API}/${MODULE}/status/:id`,
    authenticate.isAuthenticated,
    project.deleteProjectStatusById
  );

  // Project category crud
  app.put(
    `/${CONST.API}/${MODULE}/category/details`,
    authenticate.isAuthenticated,
    project.insertProjectCategoryDetail
  );
  app.post(
    `/${CONST.API}/${MODULE}/category/list`,
    authenticate.isAuthenticated,
    project.getProjectCategoryList
  );
  app.post(
    `/${CONST.API}/${MODULE}/category/list-count`,
    authenticate.isAuthenticated,
    project.getProjectCategoryListCount
  );
  app.get(
    `/${CONST.API}/${MODULE}/category/:id/details`,
    authenticate.isAuthenticated,
    project.getProjectCategoryDetailById
  );
  app.patch(
    `/${CONST.API}/${MODULE}/category/:id/details`,
    authenticate.isAuthenticated,
    project.updateProjectCategoryDetail
  );
  app.delete(
    `/${CONST.API}/${MODULE}/category/:id`,
    authenticate.isAuthenticated,
    project.deleteProjectCategoryById
  );

  // Project type crud
  app.put(
    `/${CONST.API}/${MODULE}/type/details`,
    authenticate.isAuthenticated,
    project.insertProjectTypeDetail
  );
  app.post(
    `/${CONST.API}/${MODULE}/type/list`,
    authenticate.isAuthenticated,
    project.getProjectTypeList
  );
  app.post(
    `/${CONST.API}/${MODULE}/type/list-count`,
    authenticate.isAuthenticated,
    project.getProjectTypeListCount
  );
  app.get(
    `/${CONST.API}/${MODULE}/type/:id/details`,
    authenticate.isAuthenticated,
    project.getProjectTypeDetailById
  );
  app.patch(
    `/${CONST.API}/${MODULE}/type/:id/details`,
    authenticate.isAuthenticated,
    project.updateProjectTypeDetail
  );
  app.delete(
    `/${CONST.API}/${MODULE}/type/:id`,
    authenticate.isAuthenticated,
    project.deleteProjectTypeById
  );

};
