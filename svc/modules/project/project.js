const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const getProjectList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const projectList = await db.execute(connection, SQL.ProjectList(filters(req)));
    util.successResponse(res, projectList);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }  
}

const getTeam = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const teamList = await db.execute(connection, SQL.getTeam(req.params.id));
    util.successResponse(res, teamList);
  } catch (exception) {
      util.errorResponse(res, exception)
  }
}

const getOpenRoles = async (req, res) => {
  try { 
    const connection = await db.connection(req);
    const openRoles = await db.execute(connection, SQL.getOpenRoles(filters(req)));
    util.successResponse(res, openRoles);
  } catch (exception) {
      util.errorResponse(res, exception)
  }
}

const getProjectTeams = async (req, res) => {
  try {
      const connection = await db.connection(req);
      const projectTeams = await db.execute(connection, SQL.getProjectTeams(filters(req)));
      util.successResponse(res, projectTeams);
  } catch (exception) {
      util.errorResponse(res,exception)
  }
}

const getProjectDetail = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const projectDetail = await db.execute(connection, SQL.getProjectDetail(req.params.id));
    util.successResponse(res, projectDetail);
  } catch (exception) {
      util.errorResponse(res,exception)
  }
}

const insertProjectDetail = async (req, res) => {
  try {
    const projectDefault = {
      PROJECT_NAME: '',
      PROJECT_ROM: 0,
      PROJECT_ADDRESS: '',
      PROJECT_COUNTRY: '',
      PROJECT_CITY: '',
      PROJECT_STATE: '',
      PROJECT_ZIP: '',
      START_DATE: new Date().toISOString(),
      END_DATE: new Date().toISOString(),
      PROJECT_STATUS_ID: null,
      PROJECT_TYPE_ID: null,
      OFFICE_ID: null,
      CATEGORY_ID: null,
      PROJECT_DESCRIPTION: '',
      GROUP_ID: null,
      TIMELINE_TYPE_ID: null
    };
    const projectDetails = req.body.project;
    const projectToCreate = Object.assign(projectDefault, projectDetails);
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.insertProjectDetail(projectToCreate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}

const updateProjectDetail = async (req, res) => {
  try {
    const projectDetails = req.body.project;    
    const connection = await db.connection(req);
    const result = await db.execute(connection, SQL.getProjectDetailUpdate(req.params.id));
    let detailsToUpdate = {};
    if (result && result.length > 0) {
      detailsToUpdate = result[0];
    }
    const projectToUpdate = Object.assign(detailsToUpdate, projectDetails);
    const rowsAffected = await db.execute(connection, SQL.updateProjectDetail(projectToUpdate, req.params.id));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}

const getProjectNotes = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const projectNotes = await db.execute(connection, SQL.getProjectNotes(req.params.id));
    util.successResponse(res, projectNotes);
  } catch (exception) {
      util.errorResponse(res,exception)
  }
}

const insertProjectNotes = async (req, res) => {
  try {
      const IS_PARENT = !(req.body.project.parentId && req.body.project.parentId !== null);
      const notesToCreate = {
      USER_ID: req.payload.ID,
      CONTENT: req.body.project.content,      
      PROJECT_ID: req.params.id,
      NODE_PARENT_ID: req.body.project.parentId,
      IS_PARENT
    };
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.insertProjectNotes(notesToCreate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}

const updateProjectNotes = async (req, res) => {
  try {
    const notes = req.body.project;    
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.updateProjectNotes(notes.content, notes.noteId));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}
const filters = req => {
  const filter = req.body.filter;
  let filterCondition = " where 1 = 1 ";
  if (req.params.id) {
    filterCondition = `${filterCondition} AND PROJECT.PROJECT_ID = ${req.params.id}`;
  }
  if (filter) {
    if (filter.status) {
      filterCondition = `${filterCondition} AND PROJECT_STATUS.STATUS_ID IN (${filter.status.join(',')})`;
    }    
    
    if (filter.startBetween && filter.endBetween) {
      filterCondition = `${filterCondition} AND PROJECT.START_DATE BETWEEN '${filter.startBetween}' AND '${filter.endBetween}'`;
    }

    if (filter.startDate) {
      filterCondition = `${filterCondition} AND PROJECT.START_DATE >= '${filter.startDate}'`;  
    }
  
    if (filter.endDate) {
      filterCondition = `${filterCondition} AND PROJECT.END_DATE <= '${filter.endDate}'`;
    }    
  
    if (filter.office) {
      filterCondition = `${filterCondition} AND PROJECT.OFFICE_ID = ${filter.office}`;
    }

    if (filter.projectId) {
      filterCondition = `${filterCondition} AND PROJECT.PROJECT_ID = ${filter.projectId}`;
    }
  }
  return (filterCondition); 
}

const insertProjectRole = async (req, res) => {
  try {      
      const roleToCreate = {      
      ALLOCATION: req.body.project.allocation,      
      PROJECT_ID: req.params.id,
      PROJECT_ROLE_ID: req.body.project.roleId,
      START_DATE: req.body.project.startDate,
      END_DATE: req.body.project.endDate
    };
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.insertProjectRole(roleToCreate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}

const bulkRoleUpdate = async (req, res) => {
  try {      
      const rolesToUpdate = {            
      PROJECT_ID: req.params.id,
      START_DATE: req.body.project.startDate,
      END_DATE: req.body.project.endDate,
      PLANNED_PROJECT_STAFFIDS: req.body.project.plannedStaffIds
    };
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.bulkRoleUpdate(rolesToUpdate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}

module.exports = {
  getProjectList,
  getTeam,
  getOpenRoles,
  getProjectTeams,
  getProjectDetail,
  insertProjectDetail,
  updateProjectDetail,
  getProjectNotes,
  insertProjectNotes,
  updateProjectNotes,
  insertProjectRole,
  bulkRoleUpdate
}