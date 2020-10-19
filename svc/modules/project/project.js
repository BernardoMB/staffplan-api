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

const getWorkloadList = async (req, res) => {
  try {
    const connection = await db.connection(req);

    const filter = req.body.filter;
    let condition = ' where 1 = 1 '
    if (filter) {
      if (filter.role) {
        condition += ` AND PROJECT_ROLE_ID IN (${filter.role.join(',')})`;
      }
      if (filter.group) {
        condition = `${condition} AND STAFF.STAFF_GROUP_ID IN (${filter.group.join(',')})`;
      }
      if (filter.office) {
        condition = `${condition} AND PROJECT.OFFICE_ID = ${filter.office}`;
      }
    }
    let workloadList = await db.execute(
      connection, SQL.getWorkloadList(condition, req.body.startDate, req.body.endDate)
    )
    workloadList = workloadList.map((item) => {
      return {
        ...item,
        STAFF_PHOTO: util.getThumbnailUrl(item.STAFF_PHOTO)
      }
    });
    util.successResponse(res, workloadList)
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const getWorkloadBench = async (req, res) => {
  try {
    const connection = await db.connection(req);

    const filter = req.body.filter;
    let condition = ''
    if (filter) {
      if (filter.role) {
        condition += ` AND STAFF_ROLE.ROLE_ID IN (${filter.role.join(',')})`;
      }
      if (filter.office) {
        condition += ` AND STAFF.OFFICE_ID = ${filter.office}`;
      }
    }

    let workLoadBench = await db.execute(connection,
      SQL.getWorkloadBench(condition, req.body.startDate, req.body.endDate))
    workLoadBench = workLoadBench.map((item) => {
      return {
        ...item,
        STAFF_PHOTO: util.getThumbnailUrl(item.STAFF_PHOTO)
      }
    });
    util.successResponse(res, workLoadBench)
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

const getWorkloadUnassigned = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const filter = req.body.filter;
    let condition = ''
    if (filter) {
      if (filter.role) {
        condition += ` AND STAFF_ROLE.ROLE_ID IN (${filter.role.join(',')})`;
      }
      if (filter.office) {
        condition += ` AND PROJECT.OFFICE_ID = ${filter.office}`;
      }
      if (filter.group) {
        condition += ` AND PROJECT.GROUP_ID IN (${filter.group})`;
      }
    }

    let workloadUnassigned = await db.execute(connection,
      SQL.getWorkloadUnassigned(condition, req.body.startDate, req.body.endDate)
    )
    util.successResponse(res, workloadUnassigned)
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

const getWorkloadListCount = async (req, res) => {
  try {
    const filter = req.body.filter;
    let condition = ''
    if (filter) {
      if (filter.role) {
        condition += ` AND PROJECT_ROLE_ID IN (${filter.role.join(',')})`;
      }
      if (filter.office) {
        condition += ` AND OFFICE_ID = ${filter.office}`;
      }
      if (filter.group) {
        condition += ` AND GROUP_ID IN (${filter.group.join(',')})`;
      }
    }
    let condition2 = ''
    if (filter) {
      if (filter.role) {
        condition2 += ` AND STAFF_ROLE.ROLE_ID IN (${filter.role.join(',')})`;
      }
      if (filter.office) {
        condition2 += ` AND STAFF.OFFICE_ID = ${filter.office}`;
      }
    }
    const connection = await db.connection(req);
    let workLoadBenchCount = await db.execute(
      connection,
      SQL.getQueryCount(SQL.getWorkloadBench(condition2, req.body.startDate, req.body.endDate))
    )
    const openRolesList = await db.execute(
      connection,
      SQL.getQueryCount(SQL.getWorkloadListCount(condition, req.body.startDate, req.body.endDate))
    )
    const result = { count: openRolesList[0].count + workLoadBenchCount[0].count }
    util.successResponse(res, result);
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

    if (filter.role) {
      filterCondition = `${filterCondition} AND STAFF.STAFF_ROLE_ID IN (${filter.role.join(',')})`;
    }

    if (filter.group) {
      filterCondition = `${filterCondition} AND STAFF.STAFF_GROUP_ID IN (${filter.group.join(',')})`;
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

//#region Project groups CRUD

const getProjectGroupList = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectGroupList = await db.execute(
          connection,
          SQL.ProjectGroupList(filters(req))
      );
      util.successResponse(res, projectGroupList);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getProjectGroupListCount = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectGroupList = await db.execute(
          connection,
          SQL.getProjectGroupQueryCount(SQL.ProjectGroupList(filters(req)))
      );
      util.successResponse(res, projectGroupList[0]);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getProjectGroupDetailById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectGroupDetail = await db.execute(
          connection,
          SQL.projectGroupDetailsById(req.params.id)
      );
      util.successResponse(res, projectGroupDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const insertProjectGroupDetail = async (req, res) => {
  try {
      const projectGroupDefault = {
          GROUP_NAME: '',
      };
      const projectGroupDetails = req.body;
      const connection = await db.connection(req);
      const projectGroupToCreate = Object.assign(
          projectGroupDefault,
          util.cleanObject(projectGroupDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.insertProjectGroupDetail(projectGroupToCreate)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const updateProjectGroupDetail = async (req, res) => {
  try {
      const projectGroupDetails = req.body;
      const connection = await db.connection(req);
      const result = await db.execute(
          connection,
          SQL.projectGroupDetailsById(req.params.id)
      );
      let detailsToUpdate = {};
      if (result && result.length > 0) {
          detailsToUpdate = result[0];
      }
      const projectGroupToUpdate = Object.assign(
          detailsToUpdate,
          util.cleanObject(projectGroupDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.updateProjectGroupDetail(projectGroupToUpdate, req.params.id)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const deleteProjectGroupById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectGroupDetail = await db.execute(
          connection,
          SQL.removeProjectGroup(req.params.id)
      );
      util.successResponse(res, projectGroupDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

//#endregion

//#region Project status CRUD

const getProjectStatusList = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectStatusList = await db.execute(
          connection,
          SQL.ProjectStatusList(filters(req))
      );
      util.successResponse(res, projectStatusList);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getProjectStatusListCount = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectStatusList = await db.execute(
          connection,
          SQL.getProjectStatusQueryCount(SQL.ProjectStatusList(filters(req)))
      );
      util.successResponse(res, projectStatusList[0]);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getProjectStatusDetailById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectStatusDetail = await db.execute(
          connection,
          SQL.projectStatusDetailsById(req.params.id)
      );
      util.successResponse(res, projectStatusDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const insertProjectStatusDetail = async (req, res) => {
  try {
      const projectStatusDefault = {
          STATUS_NAME: '',
      };
      const projectStatusDetails = req.body;
      const connection = await db.connection(req);
      const projectStatusToCreate = Object.assign(
          projectStatusDefault,
          util.cleanObject(projectStatusDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.insertProjectStatusDetail(projectStatusToCreate)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const updateProjectStatusDetail = async (req, res) => {
  try {
      const projectStatusDetails = req.body;
      const connection = await db.connection(req);
      const result = await db.execute(
          connection,
          SQL.projectStatusDetailsById(req.params.id)
      );
      let detailsToUpdate = {};
      if (result && result.length > 0) {
          detailsToUpdate = result[0];
      }
      const projectStatusToUpdate = Object.assign(
          detailsToUpdate,
          util.cleanObject(projectStatusDetails)
      );
      console.log(`\nProject status to update\n`, projectStatusToUpdate);
      const rowsAffected = await db.execute(
          connection,
          SQL.updateProjectStatusDetail(projectStatusToUpdate, req.params.id)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const deleteProjectStatusById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectStatusDetail = await db.execute(
          connection,
          SQL.removeProjectStatus(req.params.id)
      );
      util.successResponse(res, projectStatusDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

//#endregion

//#region Project category CRUD

const getProjectCategoryList = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectCategoryList = await db.execute(
          connection,
          SQL.ProjectCategoryList(filters(req))
      );
      util.successResponse(res, projectCategoryList);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getProjectCategoryListCount = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectCategoryList = await db.execute(
          connection,
          SQL.getProjectCategoryQueryCount(SQL.ProjectCategoryList(filters(req)))
      );
      util.successResponse(res, projectCategoryList[0]);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getProjectCategoryDetailById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectCategoryDetail = await db.execute(
          connection,
          SQL.projectCategoryDetailsById(req.params.id)
      );
      util.successResponse(res, projectCategoryDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const insertProjectCategoryDetail = async (req, res) => {
  try {
      const projectCategoryDefault = {
          Category_NAME: '',
      };
      const projectCategoryDetails = req.body;
      const connection = await db.connection(req);
      const projectCategoryToCreate = Object.assign(
          projectCategoryDefault,
          util.cleanObject(projectCategoryDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.insertProjectCategoryDetail(projectCategoryToCreate)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const updateProjectCategoryDetail = async (req, res) => {
  try {
      const projectCategoryDetails = req.body;
      const connection = await db.connection(req);
      const result = await db.execute(
          connection,
          SQL.projectCategoryDetailsById(req.params.id)
      );
      let detailsToUpdate = {};
      if (result && result.length > 0) {
          detailsToUpdate = result[0];
      }
      const projectCategoryToUpdate = Object.assign(
          detailsToUpdate,
          util.cleanObject(projectCategoryDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.updateProjectCategoryDetail(projectCategoryToUpdate, req.params.id)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const deleteProjectCategoryById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectCategoryDetail = await db.execute(
          connection,
          SQL.removeProjectCategory(req.params.id)
      );
      util.successResponse(res, projectCategoryDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

//#endregion

//#region Project type CRUD

const getProjectTypeList = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectTypeList = await db.execute(
          connection,
          SQL.ProjectTypeList(filters(req))
      );
      util.successResponse(res, projectTypeList);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getProjectTypeListCount = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectTypeList = await db.execute(
          connection,
          SQL.getProjectTypeQueryCount(SQL.ProjectTypeList(filters(req)))
      );
      util.successResponse(res, projectTypeList[0]);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const getProjectTypeDetailById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectTypeDetail = await db.execute(
          connection,
          SQL.projectTypeDetailsById(req.params.id)
      );
      util.successResponse(res, projectTypeDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const insertProjectTypeDetail = async (req, res) => {
  try {
      const projectTypeDefault = {
          Type_NAME: '',
      };
      const projectTypeDetails = req.body;
      const connection = await db.connection(req);
      const projectTypeToCreate = Object.assign(
          projectTypeDefault,
          util.cleanObject(projectTypeDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.insertProjectTypeDetail(projectTypeToCreate)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const updateProjectTypeDetail = async (req, res) => {
  try {
      const projectTypeDetails = req.body;
      const connection = await db.connection(req);
      const result = await db.execute(
          connection,
          SQL.projectTypeDetailsById(req.params.id)
      );
      let detailsToUpdate = {};
      if (result && result.length > 0) {
          detailsToUpdate = result[0];
      }
      const projectTypeToUpdate = Object.assign(
          detailsToUpdate,
          util.cleanObject(projectTypeDetails)
      );
      const rowsAffected = await db.execute(
          connection,
          SQL.updateProjectTypeDetail(projectTypeToUpdate, req.params.id)
      );
      util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

const deleteProjectTypeById = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectTypeDetail = await db.execute(
          connection,
          SQL.removeProjectType(req.params.id)
      );
      util.successResponse(res, projectTypeDetail);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
};

//#endregion

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
  getWorkloadList,
  getWorkloadListCount,
  getWorkloadBench,
  getWorkloadUnassigned,

  getProjectGroupList,
  getProjectGroupListCount,
  getProjectGroupDetailById,
  insertProjectGroupDetail,
  updateProjectGroupDetail,
  deleteProjectGroupById,

  getProjectStatusList,
  getProjectStatusListCount,
  getProjectStatusDetailById,
  insertProjectStatusDetail,
  updateProjectStatusDetail,
  deleteProjectStatusById,

  getProjectCategoryList,
  getProjectCategoryListCount,
  getProjectCategoryDetailById,
  insertProjectCategoryDetail,
  updateProjectCategoryDetail,
  deleteProjectCategoryById,

  getProjectTypeList,
  getProjectTypeListCount,
  getProjectTypeDetailById,
  insertProjectTypeDetail,
  updateProjectTypeDetail,
  deleteProjectTypeById,
  
};
