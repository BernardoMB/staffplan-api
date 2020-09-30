const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");
const dashboardUtil = require('./util');
const { MAX_FTE_ALLOCATION, MIN_FTE_ALLOCATION } = require('../../common/const');

const getValue = (rows => {
  if (rows && rows.length) {
    return rows[0].TOTAL;
  }
  return 0;
});

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
      projectStatusQuery += '(3)'
      // in-progress
    } else if (projectStatus == 1) {
      projectStatusQuery += '(3, 2)'
    }

    if (!condition || !date) return;

    const UnassignedRoleCount = await db.execute(connection,
      SQL.UnassignedRole(condition, date, projectStatusQuery, roleCondition));
    const OnBench = await db.execute(connection, SQL.OnBench(condition));
    const StaffingGap = await db.execute(connection, SQL.StaffingGap(condition, roleCondition));
    const OverUnderAllocation = await db.execute(connection,
      SQL.OverUnderAllocation(condition, projectStatusQuery, date)
    );

    util.successResponse(res, {
      UnassignedRoleCount: getValue(UnassignedRoleCount),
      OnBench: getValue(OnBench),
      StaffingGap: getValue(StaffingGap),
      OverUnderAllocation: dashboardUtil.getOverUnderCount(OverUnderAllocation, projectGroup)
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
    const projectGroup = req.body.projectGroup;
    const projectStatus = req.body.projectStatus;

    // TOTAL, ROLE_NAME
    const bench = await db.execute(connection, SQL.BenchRoles(date))
    const gap = await db.execute(connection, SQL.GapRoles(date, officeId, projectGroup))

    let condition = '';
    condition = (officeId === 'all') ? '1 = 1' : `OFFICE_ID = '${officeId}'`;

    let projectStatusQuery = 'AND PROJECT_STATUS.STATUS_ID in ';

    if (projectStatus == 0) {
      projectStatusQuery += '(3)'
      // in-progress
    } else if (projectStatus == 1) {
      projectStatusQuery += '(3, 2)'
    }

    const OverUnderAllocation = await db.execute(connection,
      SQL.OverUnderAllocation(condition, projectStatusQuery, date)
    );

    const overUnderHash = dashboardUtil.groupOverUnderCount(OverUnderAllocation)
    const over = [];
    const under = [];

    for (let id in overUnderHash) {
      if ((projectGroup === 'All' || overUnderHash[id].GROUP_ID.includes(projectGroup))) {
        if (overUnderHash[id].ALLOCATION > MAX_FTE_ALLOCATION) {
          const index = over.findIndex(el => el.ROLE_NAME === overUnderHash[id].ROLE_NAME)
          if (index !== -1) {
            over[index].TOTAL++
          } else {
            over.push({
              TOTAL: 1,
              ROLE_NAME: overUnderHash[id].ROLE_NAME
            })
          }
        }
        if (overUnderHash[id].ALLOCATION < MIN_FTE_ALLOCATION) {
          const index = under.findIndex(el => el.ROLE_NAME === overUnderHash[id].ROLE_NAME)
          if (index !== -1) {
            under[index].TOTAL++
          } else {
            under.push({
              TOTAL: 1,
              ROLE_NAME: overUnderHash[id].ROLE_NAME
            })
          }
        }
      }
    }

    util.successResponse(res, {
      over, under, bench, gap,
    })
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

module.exports = {
  getDashboardDetails,
  getGraphData
};
