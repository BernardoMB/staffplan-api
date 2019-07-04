const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const getProjectList = async (req, res) => {
  const connection = await db.connection(req);
  const projectList = await db.execute(connection, SQL.ProjectList(filters(req)));
  util.successResponse(res, projectList);
}

const getTeam = async (req, res) => {
  const connection = await db.connection(req);
  const teamList = await db.execute(connection, SQL.getTeam(req.params.id));
  util.successResponse(res, teamList);
}

const getOpenRoles = async (req, res) => {
  const connection = await db.connection(req);
  const openRoles = await db.execute(connection, SQL.getOpenRoles(filters(req)));
  util.successResponse(res, openRoles);
}

const getProjectTeams = async (req, res) => {
  const connection = await db.connection(req);
  const projectTeams = await db.execute(connection, SQL.getProjectTeams(filters(req)));
  util.successResponse(res, projectTeams);
}

const getProjectDetail = async (req, res) => {
  const connection = await db.connection(req);
  const projectDetail = await db.execute(connection, SQL.getProjectDetail(req.params.id));
  util.successResponse(res, projectDetail);
}

const getProjectNotes = async (req, res) => {
  const connection = await db.connection(req);
  const projectNotes = await db.execute(connection, SQL.getProjectNotes(req.params.id));
  util.successResponse(res, projectNotes);
}

const filters = req => {
  const filter = req.body.filter;
  let filterCondition = " where 1 = 1 ";
  if (filter) {
    if (filter.status) {
      filterCondition = `${filterCondition} AND PROJECT_STATUS.STATUS_ID IN (${filter.status.join(',')})`;
    }    
    
    if (filter.startDate1 && filter.startDate2) {
      filterCondition = `${filterCondition} AND PROJECT.START_DATE BETWEEN '${filter.startDate1}' AND '${filter.startDate2}'`;
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

  module.exports = {
  getProjectList,
  getTeam,
  getOpenRoles,
  getProjectTeams,
  getProjectDetail,
  getProjectNotes
}