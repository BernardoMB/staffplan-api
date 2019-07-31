const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

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
  insertProjectRole,
  bulkRoleUpdate
}