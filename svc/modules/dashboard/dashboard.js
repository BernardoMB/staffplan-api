const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const getValue = (rows => {
  if (rows && rows.length) {
    return rows[0].TOTAL;
  };
  return 0;
})

const getDashboardDetails = async (req, res) => {
  const connection = await db.masterDB(req);
  var officeCity = req.params.officeCity;
  var condition = '';
  if (officeCity === 'all'){
    condition = '1 = 1';
  } else {
    condition = `PROJECT.OFFICE_ID = '${officeCity}'`
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
  const StaffingGap = await db.execute(connection, SQL.StaffingGap());
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
    StaffingGap: getValue(StaffingGap),
    OverUnderAllocation: getValue(OverUnderAllocation),
    AssignmentEnding: getValue(AssignmentEnding)
  });
}
module.exports = {
  getDashboardDetails
}