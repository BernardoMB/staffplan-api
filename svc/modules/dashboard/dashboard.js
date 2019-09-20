const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const getValue = (rows => {
  if (rows && rows.length) {
    return rows[0].TOTAL;
  }
  return 0;
})

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
    let condition = '';
    if (officeId === 'all'){
      condition = '1 = 1';
    } else {
      condition = `OFFICE_ID = '${officeId}'`;
    }
    const InProgressProjectCount = await db.execute(connection, SQL.InProgress(condition));
    const ProposalProjectCount = await db.execute(connection, SQL.Proposal(condition));
    const UnassignedRoleCount = await db.execute(connection, SQL.UnassignedRole(condition));
    let OnBench = await db.execute(connection, SQL.OnBench(condition));
    //const StaffAssignments = await db.execute(connection, SQL.StaffingGap(condition));
    //const StaffingGap = calculateGap(StaffAssignments);
    OnBench = getValue(OnBench);
    const result = await db.execute(connection, SQL.StaffingGap(condition));

    const StaffingGap = OnBench + result.length
    const OverUnderAllocation = await db.execute(connection, SQL.OverUnderAllocation(condition));

    util.successResponse(res, {
      InProgressProjectCount: getValue(InProgressProjectCount),
      ProposalProjectCount: getValue(ProposalProjectCount),
      UnassignedRoleCount: getValue(UnassignedRoleCount),
      OnBench: OnBench,
      StaffingGap: StaffingGap,      
      OverUnderAllocation: getValue(OverUnderAllocation)
    });
  } catch(exception) {
    util.errorResponse(res, exception);
  }
}
module.exports = {
  getDashboardDetails
}