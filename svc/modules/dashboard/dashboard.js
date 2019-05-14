const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const getValue = (rows => {
  if (rows && rows.length) {
    return rows[0].TOTAL;
  }
  return 0;
})

const calculateGap = (StaffAssignments => {
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
              // console.log(nextInfo.STAFF_ID);
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
});

const getDashboardDetails = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const officeId = req.params.officeId;
    let condition = '';
    if (officeId === 'all'){
      condition = '1 = 1';
    } else {
      condition = `PROJECT.OFFICE_ID = '${officeId}'`
    }
    const InProgressProjectCount = await db.execute(connection, SQL.InProgress(condition));
    const ProposalProjectCount = await db.execute(connection, SQL.Proposal(condition));
    const UnassignedRoleCount = await db.execute(connection, SQL.UnassignedRole(condition));
    const ProjectStartedThisYear = await db.execute(connection, SQL.ProjectStartedThisYear(condition));
    const ProjectEndThisYear = await db.execute(connection, SQL.ProjectEndThisYear(condition));
    const ProjectStarting = await db.execute(connection, SQL.ProjectStarting(condition));
    const ProjectEnding = await db.execute(connection, SQL.ProjectEnding(condition));
    const AdminStaff = await db.execute(connection, SQL.AdminStaff());
    const OPSStaff = await db.execute(connection, SQL.OPSStaff());
    const OnBench = await db.execute(connection, SQL.OnBench());
    const StaffAssignments = await db.execute(connection, SQL.StaffingGap());
    const StaffingGap = calculateGap(StaffAssignments);
    const OverUnderAllocation = await db.execute(connection, SQL.OverUnderAllocation());
    const AssignmentEnding = await db.execute(connection, SQL.AssignmentEnding());

    util.successResponse(res, {
      InProgressProjectCount: getValue(InProgressProjectCount),
      ProposalProjectCount: getValue(ProposalProjectCount),
      UnassignedRoleCount: getValue(UnassignedRoleCount),
      ProjectStartedThisYear: getValue(ProjectStartedThisYear),
      ProjectEndThisYear: getValue(ProjectEndThisYear),
      ProjectStarting: getValue(ProjectStarting),
      ProjectEnding: getValue(ProjectEnding),
      AdminStaff: getValue(AdminStaff),
      OPSStaff: getValue(OPSStaff),
      OnBench: getValue(OnBench),
      StaffingGap,
      OverUnderAllocation: getValue(OverUnderAllocation),
      AssignmentEnding: getValue(AssignmentEnding)
    });
  } catch(exception) {
    util.errorResponse(res, exception);
  }
}
module.exports = {
  getDashboardDetails
}