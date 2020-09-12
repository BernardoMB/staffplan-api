const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const getValue = (rows => {
  if (rows && rows.length) {
    return rows[0].TOTAL;
  }
  return 0;
});

/* const calculateGap = (StaffAssignments => {
  let gap = 0;
  if (StaffAssignments && StaffAssignments.length) {
    StaffAssignments.forEach((currentInfo, index) => {
      // if staff doesn't have project start date add to gap
      if (currentInfo.START_DATE) {
        // Check itteration reached end
        if (index < StaffAssignments.length - 1) {
          const nextInfo = StaffAssignments[index + 1];
          // check next staff equals to current one
          if (nextInfo.STAFF_ID === currentInfo.STAFF_ID) {
            // check the current project end date with next project start date
            if (nextInfo.START_DATE > currentInfo.END_DATE) {
              gap++;
            }
          }
        }
      } else {
        gap++
      }
    })
  }
  return gap;
}); */

const getDashboardDetails = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const officeId = req.body.officeId;
    const date = req.body.date;
    const projectStatus = req.body.projectStatus;
    const projectGroup = req.body.projectGroup;

    let condition = '';
    condition = (officeId === 'all') ? '1 = 1' : `OFFICE_ID = '${officeId}'`;
    let roleCondition = '';
    if (projectGroup !== 'All') {
      roleCondition += `  AND PROJECT.GROUP_ID = ${projectGroup} `;
    }

    let projectStatusQuery = 'AND PROJECT_STATUS.STATUS_ID in ';

    if (projectStatus == 0) {
      projectStatusQuery += '(3, 2)'
      // potencial
    } else if (projectStatus == 1) {
      projectStatusQuery += '(2)'
      // in-progress
    } else if (projectStatus == 2) {
      projectStatusQuery += '(3)'
    }

    if (!condition || !date) return;

    const UnassignedRoleCount = await db.execute(connection,
      SQL.UnassignedRole(condition, date, projectStatusQuery, roleCondition));
    const OnBench = await db.execute(connection, SQL.OnBench(condition));
    const StaffingGap = await db.execute(connection, SQL.StaffingGap(condition, roleCondition));
    const OverUnderAllocation = await db.execute(connection, SQL.OverUnderAllocation(condition, roleCondition));

    util.successResponse(res, {
      UnassignedRoleCount: getValue(UnassignedRoleCount),
      OnBench: getValue(OnBench),
      StaffingGap: getValue(StaffingGap),
      OverUnderAllocation: getValue(OverUnderAllocation)
    });
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

const getGraphData = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const officeId = req.body.officeId;
    const date = req.body.date;

    // TOTAL, ROLE_NAME
    const bench = await db.execute(connection, SQL.BenchRoles(date))
    const gap = await db.execute(connection, SQL.GapRoles(date, officeId))
    // ALLOCATION_STATUS STAFF_ID ROLE_NAME
    const allocHash = {
      'OVER_ALLOCATED': {},
      'UNDER_ALLOCATED': {},
    };

    const allocation = await db.execute(connection, SQL.AllocationRoles(date, officeId))
    allocation.forEach(e => {
      if (!allocHash[e.ALLOCATION_STATUS][e.ROLE_NAME]) {
        allocHash[e.ALLOCATION_STATUS][e.ROLE_NAME] = 0
      }
      allocHash[e.ALLOCATION_STATUS][e.ROLE_NAME]++
    })

    const over = [];
    const under = [];

    Object.keys(allocHash.OVER_ALLOCATED).forEach(k =>
      over.push({ TOTAL: allocHash.OVER_ALLOCATED[k], ROLE_NAME: k })
    )
    Object.keys(allocHash.UNDER_ALLOCATED).forEach(k =>
      under.push({ TOTAL: allocHash.UNDER_ALLOCATED[k], ROLE_NAME: k })
    )

    util.successResponse(res, {
      gap, under, bench, over,
    })
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

module.exports = {
  getDashboardDetails,
  getGraphData
};
