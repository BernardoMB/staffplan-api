const db = require('../../common/connection');
const SQL = require('./query');
const util = require('../../common/util');

const getProjectList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const projectList = await db.execute(
      connection,
      SQL.ProjectList(filters(req))
    );
    util.successResponse(res, projectList);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

const getProjectListCount = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const projectList = await db.execute(
      connection,
      SQL.getQueryCount(SQL.ProjectList(filters(req)))
    );
    util.successResponse(res, projectList[0]);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

const getOpenRoles = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const openRoles = await db.execute(
      connection,
      SQL.getOpenRoles(filters(req))
    );
    util.successResponse(res, openRoles);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

const getOpenRolesListCount = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const openRolesList = await db.execute(
      connection,
      SQL.getQueryCount(SQL.getOpenRoles(filters(req)))
    );
    util.successResponse(res, openRolesList[0]);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

const getProjectTeams = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const projectTeams = await db.execute(
      connection,
      SQL.getProjectTeams(filters(req))
    );
    util.successResponse(res, projectTeams);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

const getProjectTeamsCount = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const projectTeamsList = await db.execute(
      connection,
      SQL.getDistinctFieldCount(SQL.getProjectTeams(filters(req)), 'PROJECT_ID')
    );
    console.log(projectTeamsList);
    util.successResponse(res, projectTeamsList[0]);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

const getProjectDetailById = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const projectDetail = await db.execute(
      connection,
      SQL.getProjectDetailById(req.params.id)
    );
    util.successResponse(res, projectDetail);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

const insertProjectDetail = async (req, res) => {
  try {
    const projectDefault = {
      PROJECT_NAME: '',
      PROJECT_NO: '',
      PROJECT_ROM: 0,
      PROJECT_ADDRESS: '',
      PROJECT_COUNTRY: '',
      PROJECT_CITY: '',
      PROJECT_STATE: '',
      PROJECT_ZIP: '',
      CUSTOMER_ID: null,
      CONTACT_ID: null,
      START_DATE: new Date().toISOString(),
      END_DATE: new Date().toISOString(),
      PROJECT_STATUS_ID: null,
      PROJECT_TYPE_ID: null,
      OFFICE_ID: null,
      CATEGORY_ID: null,
      PROJECT_DESCRIPTION: '',
      GROUP_ID: null,
      TIMELINE_TYPE_ID: null,
    };
    const projectDetails = req.body;
    const connection = await db.connection(req);
    const projectToCreate = Object.assign(
      projectDefault,
      util.cleanObject(projectDetails)
    );
    const rowsAffected = await db.execute(
      connection,
      SQL.insertProjectDetail(projectToCreate)
    );
    util.successResponse(res, rowsAffected);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

const updateProjectDetail = async (req, res) => {
  try {
    const projectDetails = req.body;
    const connection = await db.connection(req);
    const result = await db.execute(
      connection,
      SQL.projectDetailsById(req.params.id)
    );
    let detailsToUpdate = {};
    if (result && result.length > 0) {
      detailsToUpdate = result[0];
    }
    const projectToUpdate = Object.assign(
      detailsToUpdate,
      util.cleanObject(projectDetails)
    );
    const rowsAffected = await db.execute(
      connection,
      SQL.updateProjectDetail(projectToUpdate, req.params.id)
    );
    util.successResponse(res, rowsAffected);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

const filters = (req) => {
  const filter = req.body.filter;
  let filterCondition = ' where 1 = 1 ';
  if (req.params.id) {
    filterCondition = `${filterCondition} AND PROJECT.PROJECT_ID = ${req.params.id}`;
  }
  if (filter) {
    if (filter.status) {
      filterCondition = `${filterCondition} AND PROJECT_STATUS.STATUS_ID IN (${filter.status.join(
        ','
      )})`;
    }

    if (filter.startBetween && filter.endBetween) {
      filterCondition = `${filterCondition} AND PROJECT.START_DATE BETWEEN '${filter.startBetween}' AND '${filter.endBetween}'`;
    }

    if (filter.StartIn) {
      filterCondition = `${filterCondition} AND PROJECT.START_DATE >= NOW() and PROJECT.START_DATE <=  DATE_ADD(NOW(), INTERVAL 90 DAY)`;
    }

    if (filter.EndIn) {
      filterCondition = `${filterCondition} AND PROJECT.END_DATE >= NOW() and PROJECT.END_DATE <=  DATE_ADD(NOW(), INTERVAL 90 DAY)`;
    }

    if (filter.startDate) {
      filterCondition = `${filterCondition} AND PROJECT.START_DATE >= '${filter.startDate}'`;
    }

    if (filter.endDate) {
      filterCondition = `${filterCondition} AND PROJECT.END_DATE >= '${filter.endDate}'`;
      console.log(filterCondition);
    }

    if (filter.office) {
      filterCondition = `${filterCondition} AND PROJECT.OFFICE_ID = ${filter.office}`;
    }

    if (filter.projectId) {
      filterCondition = `${filterCondition} AND PROJECT.PROJECT_ID = ${filter.projectId}`;
    }

    if (filter.ProjectGroup) {
      filterCondition = `${filterCondition} AND PROJECT.GROUP_ID = ${filter.ProjectGroup}`;
    }

    if (filter.OpenRoles) {
      filterCondition = `${filterCondition} AND (SELECT COUNT(ID) FROM
      PLANNED_PROJECT_STAFF WHERE
        PLANNED_PROJECT_STAFF.PROJECT_ID = PROJECT.PROJECT_ID) > 0`;
    }
  }
  // List project based on user office access
  if (util.officeAccessRestricted(req.payload.ROLE)) {
    filterCondition = `${filterCondition} AND PROJECT.OFFICE_ID IN (SELECT OFFICE_ID FROM USER_ACCESS WHERE USER_ID = ${req.payload.ID})`;
  }
  return filterCondition;
};

module.exports = {
  getProjectList,
  getOpenRoles,
  getProjectTeams,
  getProjectDetailById,
  insertProjectDetail,
  updateProjectDetail,
  getProjectListCount,
  getOpenRolesListCount,
  getProjectTeamsCount,
};
