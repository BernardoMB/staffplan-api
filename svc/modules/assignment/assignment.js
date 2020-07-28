const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");
var moment = require('moment');

const getProjectRole = async (req, res) => {
  try {
    const connection = await db.connection(req);
    let condition = `PROJECT_TEAM.PROJECT_ID = ${req.params.id} `;
    if (req.query && req.query.active === 'true') {
      condition = `${condition} AND  PROJECT_TEAM.END_DATE >= CURDATE()`
    }
    const projectRoles = await db.execute(connection, SQL.getProjectTeams(condition));
    if (projectRoles && projectRoles.length) {
      for (let i = 0; i < projectRoles.length; i++) {
        const role = projectRoles[i];
        // Check role as assigned
        if (role.STAFF_ID) {
          // Check Staff have any other project allocation to show alert
          const allocation = await db.execute(connection,
            SQL.getAlert(role.ID, role.STAFF_ID, moment(role.START_DATE).format('YYYY-MM-DD'),
              moment(role.END_DATE).format('YYYY-MM-DD'), role.ALLOCATION));
          // SET ALERT as true if total allocation is > 100%
          projectRoles[i].ALERT = (allocation[0].TOTAL > 100);
        }
      }
    }
    util.successResponse(res, projectRoles);
  }
  catch (exception) {
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
      END_DATE: req.body.endDate,
      RESUME_SUBMITTED: req.body.resumeSubmitted ? 1 : 0
    };
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.insertProjectRole(roleToCreate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const updateProjectRole = async (req, res) => {
  try {
    const roleToCreate = {
      ID: req.params.roleId,
      ALLOCATION: req.body.allocation,
      PROJECT_ID: req.params.id,
      PROJECT_ROLE_ID: req.body.roleId,
      START_DATE: req.body.startDate,
      END_DATE: req.body.endDate,
      RESUME_SUBMITTED: req.body.resumeSubmitted ? 1 : 0
    };
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.updateProjectRole(roleToCreate));
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

const updateAssignment = async (req, res) => {
  try {
    const assignments = req.body;
    if (assignments && assignments.length) {
      const connection = await db.connection(req);
      for (let i = 0; i < assignments.length; i++) {
        const assignment = assignments[i];
        if (assignment.selectedView === 'Week') {
          await db.execute(connection, SQL.updateAllocation(
            assignment.allocation,
            assignment.year,
            assignment.week,
            assignment.plannedStaffId
          ));
        } else {
          // Get List of weeks in that month
          // update for all
          const weeks = getWeeknoInMonth(assignment.date, assignment.year);
          for (let j = 0; j < weeks.length; j++) {
            const week = weeks[j];
            await db.execute(connection, SQL.updateAllocation(
              assignment.allocation,
              week.year,
              week.week,
              assignment.plannedStaffId
            ));
          }
        }
      }
    }
    util.successResponse(res, {})
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const getWeeknoInMonth = (selectedDate, year) => {
  const firstDay = moment(selectedDate).startOf('month');
  const lastDay = moment(selectedDate).endOf('month');
  let date = firstDay;
  let week = 0;
  const dates = [];
  while (date < lastDay && week !== 52) {
    week = date.week();
    const startDate = date.startOf('week').format('YYYY-MM-DD');
    const endDate = date.endOf('week').format('YYYY-MM-DD');
    dates.push({
      year, week, startDate, endDate
    });
    date = date.add(7);
  }
  return dates;
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

const outlookList = async (req, res) => {
  try {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    let condition = '1 = 1';
    if (req.body.staffId && req.body.staffId.length) {
      condition = ` PROJECT_STAFF.STAFF_ID in (${req.body.staffId.join(',')})`;
    }
    const connection = await db.connection(req);
    const result = await db.execute(connection, SQL.outlookList(startDate, endDate, condition));
    util.successResponse(res, result);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

module.exports = {
  getProjectRole,
  insertProjectRole,
  updateProjectRole,
  bulkRoleUpdate,
  deleteRole,
  assignStaff,
  updateAssignment,
  assignList,
  outlookList
}