const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const getProjectRole = async (req, res) => {
  try {
    const connection = await db.connection(req);
    let condition = `PROJECT_TEAM.PROJECT_ID = ${req.params.id} `;
    if (req.query && req.query.active) {
      condition = `${condition} AND  PROJECT_TEAM.END_DATE >= CURDATE()`
    }
    const projectTeams = await db.execute(connection, SQL.getProjectTeams(condition));
    util.successResponse(res, projectTeams);
  }
  catch(exception) {
    util.errorResponse(res, exception);
  }
}

const insertProjectRole = async (req, res) => {
  try {      
    const roleToCreate = {      
      ALLOCATION: req.body.allocation,      
      PROJECT_ID: req.params.id,
      PROJECT_ROLE_ID: req.body.roleId,
      START_DATE: req.body.startDate,
      END_DATE: req.body.endDate
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
    const projectId = req.params.id;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const assignedIds = req.body.roleIds.filter(item => item.staffId);
    const plannedIds = req.body.roleIds.filter(item => !item.staffId);
    const connection = await db.connection(req);
    if (assignedIds && assignedIds.length) {
      await db.execute(connection, SQL.bulkRoleUpdate(
        'PROJECT_STAFF', startDate, endDate, projectId, assignedIds.map(item => item.id)
      ));
    }
    if (plannedIds && plannedIds.length) {
      await db.execute(connection, SQL.bulkRoleUpdate(
        'PLANNED_PROJECT_STAFF', startDate, endDate, projectId, plannedIds.map(item => item.id)
      ));
    }
    util.successResponse(res, true);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}

const deleteRole = async (req, res) => {
  try {
      const projectId = req.params.id;
      const id = req.body.roleId;
      // Based on the assignment the table will be selected
      const tableName = req.body.staffId ? 'PROJECT_STAFF' : 'PLANNED_PROJECT_STAFF';
      const connection = await db.connection(req);
      const rowsAffected = await db.execute(connection, SQL.deleteRole(tableName, projectId, id));
      util.successResponse(res, rowsAffected);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
}

module.exports = {
  getProjectRole,
  insertProjectRole,
  bulkRoleUpdate,
  deleteRole
}