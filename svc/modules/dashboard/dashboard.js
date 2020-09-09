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
    const officeId = req.params.officeId;
    const date = req.params.date;
    const projectStatus = req.params.projectStatus;

    console.log(projectStatus)
    console.log(projectStatus === 0)

    let condition = '';
    condition = (officeId === 'all') ? '1 = 1' : `OFFICE_ID = '${officeId}'`;

    let projectStatusQuery = 'AND PROJECT_STATUS.STATUS_ID in ';

    if (projectStatus == 0) {
      projectStatusQuery += '(1, 2, 3)'
    } else if (projectStatus == 1) {
      projectStatusQuery += '(1)'
    } else if (projectStatus == 2) {
      projectStatusQuery += '(3)'
    }

    console.log(projectStatusQuery)

    if (!condition || !date) return;

    // const InProgressProjectCount = await db.execute(connection, SQL.InProgress(condition, date));
    // const ProposalProjectCount = await db.execute(connection, SQL.Proposal(condition, date));
    console.log(SQL.UnassignedRole(condition, date, projectStatusQuery))
    const UnassignedRoleCount = await db.execute(connection, SQL.UnassignedRole(condition, date, projectStatusQuery));
    let OnBench = await db.execute(connection, SQL.OnBench(condition));
    OnBench = getValue(OnBench);
    const result = await db.execute(connection, SQL.StaffingGap(condition));

    const StaffingGap = getValue(result);
    const OverUnderAllocation = await db.execute(connection, SQL.OverUnderAllocation(condition));

    util.successResponse(res, {
      // InProgressProjectCount: getValue(InProgressProjectCount),
      // ProposalProjectCount: getValue(ProposalProjectCount),
      UnassignedRoleCount: getValue(UnassignedRoleCount),
      OnBench: OnBench,
      StaffingGap: StaffingGap,
      OverUnderAllocation: getValue(OverUnderAllocation)
    });
  } catch (exception) {
    util.errorResponse(res, exception);
  }
};

module.exports = {
  getDashboardDetails
};
