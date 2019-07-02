const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const getProjectList = async (req, res) => {
  const connection = await db.connection(req);
  const projectList = await db.execute(connection, SQL.ProjectList());
  util.successResponse(res, projectList);
}

const getTeam = async (req, res) => {
  const connection = await db.connection(req);
  const teamList = await db.execute(connection, SQL.getTeam(req.params.id));
  util.successResponse(res, teamList);
}

const getOpenRoles = async (req, res) => {
  const connection = await db.connection(req);
  const openRoles = await db.execute(connection, SQL.getOpenRoles());
  util.successResponse(res, openRoles);
}

const getProjectTeams = async (req, res) => {
  const connection = await db.connection(req);
  const projectTeams = await db.execute(connection, SQL.getProjectTeams());
  util.successResponse(res, projectTeams);
}

module.exports = {
  getProjectList,
  getTeam,
  getOpenRoles,
  getProjectTeams
}