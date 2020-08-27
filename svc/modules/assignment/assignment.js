const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");
var moment = require('moment');

const getProjectRole = async (req, res) => {
  try {
    const connection = await db.connection(req);
    let condition = `PROJECT_STAFF.PROJECT_ID = ${req.params.id} `;
    if (req.query && req.query.active === 'true') {
      condition = `${condition} AND  PROJECT_STAFF.END_DATE >= CURDATE()`
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

/**
 * Creates a new unassigned/open role for a particular project 
 * on planned_project_staff and project_staff with a staff_id of null
 * and on project_staff for all weeks with given allocation
 */
const insertProjectRole = async (req, res) => {
  const roleToCreate = {
    ALLOCATION: req.body.allocation,
    PROJECT_ID: req.params.id,
    PROJECT_ROLE_ID: req.body.roleId,
    START_DATE: req.body.startDate,
    END_DATE: req.body.endDate,
    RESUME_SUBMITTED: req.body.resumeSubmitted ? 1 : 0
  };

  try {
    const connection = await db.connection(req);
    connection.beginTransaction(async (err) => {
      if (err) {
        util.errorResponse(res, err);
      } else {
        // insert role in planned_project_staff
        const plannedId = await db.execute(connection, SQL.insertProjectRole(roleToCreate));
        // instert role in project_staff with null staff_id
        const projectStaffId = await db.execute(connection, SQL.insertProjectStaff(null, plannedId.insertId));
        // insert allocation accordingly
        await db.execute(connection, SQL.insertStaffAllocation(projectStaffId.insertId))
        connection.commit((error) => {
          if (error) {
            util.errorResponse(res, error)
          } else {
            util.successResponse(res)
          }
        });
      }
    });
  } catch (exception) {
    console.log(exception)
    util.errorResponse(res, exception);
  }
}

/**
 * Updates an existing unassigned open role
 * it updates PLANNED_PROJECT_STAFF, PROJECT_STAFF
 * and deletes and reenters the data STAFF_ALLOCATION
 */
const updateProjectRole = async (req, res) => {
  try {
    const isAssigned = !!req.body.staffId
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

    console.log(isAssigned)

    if (isAssigned) {
      // update table PROJECT_STAFF
      await db.execute(connection, SQL.updateRoleAssignedProjectStaff(roleToCreate));
      // delete previous STAFF ALLOCATION
      await db.execute(connection, SQL.deleteStaffAllocation(req.params.roleId));
      // insert new STAFF ALLOCATION
      await db.execute(connection, SQL.insertStaffAllocation(req.params.roleId));
    } else {
      // update table PLANNED_PROJECT_STAFF
      await db.execute(connection, SQL.updateRolePlannedProject(roleToCreate));
      // update table PROJECT_STAFF
      await db.execute(connection, SQL.updateRoleProjectStaff(roleToCreate));
      // delete previous STAFF ALLOCATION
      await db.execute(connection, SQL.deleteUnassignedStaffAllocation(req.params.roleId));
      // insert new STAFF ALLOCATION
      await db.execute(connection, SQL.insertUnassignedStaffAllocation(req.params.roleId));
    }
    util.successResponse(res);
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
    // staff is assigned to project_staff
    if (assignedIds && assignedIds.length) {
      await db.execute(connection, SQL.bulkRoleUpdate(
        'PROJECT_STAFF', startDate, endDate, projectId, assignedIds.map(item => item.id)
      ));
    }
    // open role is assigned to project_staff
    if (plannedIds && plannedIds.length) {
      await db.execute(connection, SQL.bulkRoleUpdate(
        'PLANNED_PROJECT_STAFF', startDate, endDate, projectId, plannedIds.map(item => item.id)
      ));
      await db.execute(connection, SQL.bulkRoleUpdate(
        'PROJECT_STAFF', startDate, endDate, projectId, plannedIds.map(item => item.id)
      ));
    }
    util.successResponse(res, true);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

/**
 * Deletes assigned and unassigned roles
 */
const deleteRole = async (req, res) => {
  try {
    const projectId = req.params.id;
    const roleId = req.body.roleId;
    const isAssigned = !!req.body.staffId

    const connection = await db.connection(req);

    // assigned role
    if (isAssigned) {
      await db.execute(connection, SQL.deleteStaffAllocation(roleId));
      await db.execute(connection, SQL.deleteProjectStaff(projectId, roleId));
    }
    // unassigned role
    else {
      await db.execute(connection, SQL.deleteUnassignedStaffAllocation(roleId));
      await db.execute(connection, SQL.deleteUnassignedProjectStaff(roleId));
      await db.execute(connection, SQL.removeProjectPlan(roleId));
    }
    util.successResponse(res);
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

/**
 * Assigns a staff ID to an unassigned/open role.
 * Updates table staff_id with a staff ID for that role
 * and deletes role from planned_project_staff
 */
const assignStaff = async (req, res) => {
  try {
    const plannedId = req.body.plannedId
    const staffId = req.body.staffId;
    const connection = await db.connection(req);
    // set staff_id in project_staff, set planned_staff_id to null
    await db.execute(connection, SQL.updateProjectStaff(plannedId, staffId))
    // delete row in planned_project_staff
    await db.execute(connection, SQL.removeProjectPlan(plannedId))
    util.successResponse(res)
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