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
      const connection = await db.connection(req);
      let rowsAffected;
      // Based on the assignment the table will be selected
      if (req.body.staffId) {
        rowsAffected = await db.execute(connection, SQL.deleteStaffAllocation(id));
        rowsAffected = await db.execute(connection, SQL.deleteProjectStaff(projectId, id));
      } else {
        rowsAffected = await db.execute(connection, SQL.deleteProjectPlanned(projectId, id));
      }
      util.successResponse(res, rowsAffected);
    } catch (exception) {
      util.errorResponse(res, exception);
    }
}

const getAlert = async (req, res) => {
  try {
    const id = req.params.id;
    const staffId = req.body.staffId;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.getAlert(id, staffId, startDate, endDate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const assignStaff = async (req, res) => {
  try {
    const plannedId = req.body.plannedId;
    const staffId = req.body.staffId;
    const connection = await db.connection(req);
    connection.beginTransaction((err) => {
      if (err) {
        util.errorResponse(res, err);
      } else {
        // Insert into project staff
        db.execute(connection, SQL.insertProjectStaff(staffId, plannedId)).then(
          rowsAffected => {
            const plannedStaffId = rowsAffected.insertId;
            // Insert into Staff Allocation
            db.execute(connection, SQL.insertStaffAllocation(plannedStaffId)).then(
              inserted => {
                // Remove the data from planned project staff
                db.execute(connection, SQL.removeProjectPlan(plannedId)).then(
                  () => {
                    connection.commit((error) => {
                      if (error) {
                        util.errorResponse(res, error)
                      } else {
                        util.successResponse(res, inserted)
                      }
                    });
                  }
                )
              }
            );
          }
        )
      }
    });
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const assignList = async (req, res) => {
  try {
    const plannedId = req.body.plannedId;
    let condition = '1 = 1';
    if (req.body.staffId && req.body.staffId.length) {
      condition = ` PROJECT_STAFF.STAFF_ID in (${req.body.staffId.join(',')})`;
    }
    const connection = await db.connection(req);
    const result = await db.execute(connection, SQL.assignmentList(plannedId, condition));
    util.successResponse(res, result);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

module.exports = {
  getProjectRole,
  insertProjectRole,
  bulkRoleUpdate,
  deleteRole,
  getAlert,
  assignStaff,
  assignList
}