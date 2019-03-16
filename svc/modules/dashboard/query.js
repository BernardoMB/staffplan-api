const CONST = require('../../common/const');

module.exports = {
  InProgress: (condition) => (
    `SELECT COUNT(PROJECT_ID) AS TOTAL FROM PROJECT 
      WHERE PROJECT_STATUS_ID = 
        (SELECT STATUS_ID FROM PROJECT_STATUS WHERE STATUS_NAME = '${CONST.INPROGRESS}')
      AND ${condition}`
  ),
  Proposal: (condition) => (
    `SELECT COUNT(PROJECT_ID) AS TOTAL FROM PROJECT 
      WHERE PROJECT_STATUS_ID = 
        (SELECT STATUS_ID FROM PROJECT_STATUS WHERE STATUS_NAME = '${CONST.PROPOSAL}')
      AND ${condition}`
  ),
  UnassignedRole: (condition) => (
    `SELECT SUM(COUNT) AS TOTAL FROM 
      (SELECT COUNT(ID) AS COUNT FROM PLANNED_PROJECT_PEOPLE LEFT JOIN 
      PROJECT ON PLANNED_PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID 
      WHERE ${condition}
      GROUP BY PROJECT.PROJECT_ID) as COUNT`
  ),
  ProjectStartedThisYear: (condition) => (
    `SELECT COUNT(PROJECT_ID) AS TOTAL FROM 
      PROJECT WHERE YEAR(START_DATE) = YEAR(NOW())
      AND ${condition}`
  ),
  ProjectEndThisYear: (condition) => (
    `SELECT COUNT(PROJECT_ID) AS TOTAL FROM 
      PROJECT WHERE YEAR(END_DATE) = YEAR(NOW())
      AND ${condition}`
  ),
  ProjectStarting: (condition) => (
    `SELECT COUNT(START_DATE) AS TOTAL FROM 
      PROJECT WHERE DATEDIFF(PROJECT.START_DATE, NOW()) > 0 
      AND ${condition}`
  ),
  ProjectEnding: (condition) => (
    `SELECT COUNT(END_DATE) AS TOTAL FROM 
      PROJECT WHERE DATEDIFF(PROJECT.END_DATE, NOW()) < ${CONST.GAP} 
      AND ${condition}`
  ),
  AdminStaff: () => (
    `SELECT COUNT(STAFF_ID) AS TOTAL FROM 
      STAFF WHERE STAFF_GROUP_ID = (
        SELECT GROUP_ID FROM STAFF_GROUP WHERE GROUP_NAME = '${CONST.OPERATION}'
      )`
  ),
  OPSStaff: () => (
    `SELECT COUNT(STAFF_ID) AS TOTAL FROM 
      STAFF WHERE STAFF_GROUP_ID = (
        SELECT GROUP_ID FROM STAFF_GROUP WHERE GROUP_NAME = '${CONST.TBD}'
      )`
  ),
  OnBench: () => (
    `SELECT COUNT(STAFF_ID) AS TOTAL FROM 
      STAFF WHERE STAFF_ID NOT IN (
        SELECT STAFF_ID FROM PROJECT_PEOPLE WHERE START_DATE <= NOW() AND END_DATE >= NOW() GROUP BY STAFF_ID
      )`
  ),
  StaffingGap: () => (
    ``
  //   conn.query('SELECT PROJECT_PEOPLE.*,PROJECT.PROJECT_ID,PROJECT.OFFICE_ID FROM ' + DBName + '.PROJECT_PEOPLE INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID where STAFF_ID IN ( SELECT STAFF_ID FROM ' + DBName + '.PROJECT_PEOPLE WHERE START_DATE >= NOW() GROUP BY STAFF_ID) AND PROJECT_PEOPLE.START_DATE >= NOW() AND ' + additionalCondition + ' ORDER BY PROJECT_PEOPLE.STAFF_ID ASC, PROJECT_PEOPLE.START_DATE ASC', function (err, StaffingGap) {
  //     if (err) {
  //         console.log("Error:" + err);
  //         callback(null, '0');
  //     } else {
  //         const futureProjectPeople = JSON.parse(JSON.stringify(StaffingGap));
  //         let arrayResponse = [];
  //         let responseCounter = 0;
  //         // May want to get cleaner logic here, this is faster since we only go through the loop one but may be confusion and harder for maintenance 
  //         // we will get a list of future projects order by Staff ID and then order by start date.
  //         // For each staff, we will compare the end date of project n with start date of project n+1.
  //         // If there is a gap, we will push this to our response
  //         if (futureProjectPeople.length > 0) {
  //             let currentStaffId = futureProjectPeople[0].STAFF_ID;
  //             for (let i = 0; i < futureProjectPeople.length - 1; i++) {
  //                 let nextRecord = futureProjectPeople[i+1];
  //                 if (currentStaffId === nextRecord.STAFF_ID) {
  //                     if (formatDate(futureProjectPeople[i].END_DATE) < formatDate(futureProjectPeople[i+1].START_DATE)) {
  //                         arrayResponse.push(futureProjectPeople[i]);
  //                         responseCounter++;
  //                         // If the last record is also in the gap list, add it here
  //                         if (i+1 === futureProjectPeople.length - 1) {
  //                             arrayResponse.push(futureProjectPeople[i+1]);
  //                             responseCounter++;
  //                         }
  //                     }
  //                 } else {
  //                     // We are moving to check next staff. Add the last project of this staff in the list as well if its in the gap comparison 
  //                     if (i > 0 && formatDate(futureProjectPeople[i-1].END_DATE) < formatDate(futureProjectPeople[i].START_DATE)) {
  //                         arrayResponse.push(futureProjectPeople[i]);
  //                         responseCounter++;
  //                     }
  //                     // If this staff only has one future project, then add that to the gap response
  //                     if (i > 0 && currentStaffId !== futureProjectPeople[i-1].STAFF_ID) {
  //                         arrayResponse.push(futureProjectPeople[i]);
  //                         responseCounter++;
  //                     }
  //                     currentStaffId = nextRecord.STAFF_ID;
  //                 }
  //             }
  //         }
  //         callback(null, responseCounter);
  //     }
  // })
  ),
  OverUnderAllocation: () => (
    ``
    // conn.query('SELECT PROJECT_PEOPLE.*, CONCAT_WS(" ",  (CASE WHEN STAFF.PREFERRED_NAME = "" THEN STAFF.FIRST_NAME WHEN STAFF.PREFERRED_NAME IS NULL THEN STAFF.FIRST_NAME ELSE STAFF.PREFERRED_NAME END), STAFF.LAST_NAME) AS STAFF_NAME,PROJECT.PROJECT_NAME,PROJECT.PROJECT_STATUS_ID,PROJECT_STATUS.STATUS_NAME, STAFF_ROLE.ROLE_NAME,OFFICE.OFFICE_NAME, STAFF_STATUS.STATUS_NAME AS STAFF_STATUS_NAME, (SELECT SUM(ALLOCATION) as ALLOCATION_TOTAL FROM PROJECT_PEOPLE WHERE PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID AND PROJECT_PEOPLE.START_DATE <= NOW() AND PROJECT_PEOPLE.END_DATE >= NOW()) as ALLOCATION_TOTAL  FROM PROJECT_PEOPLE  INNER JOIN STAFF ON PROJECT_PEOPLE.STAFF_ID = STAFF.STAFF_ID INNER JOIN PROJECT ON PROJECT_PEOPLE.PROJECT_ID = PROJECT.PROJECT_ID INNER JOIN STAFF_ROLE ON PROJECT_PEOPLE.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID INNER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID INNER JOIN STAFF_STATUS ON STAFF.STAFF_STATUS_ID = STAFF_STATUS.STATUS_ID INNER JOIN OFFICE ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID WHERE PROJECT_PEOPLE.START_DATE <= NOW() AND PROJECT_PEOPLE.END_DATE >= NOW() HAVING ALLOCATION_TOTAL > 100', function (err, OUAllocation) {
    // OUAllocation.length
  ),
  AssignmentEnding: () => (
    `SELECT COUNT(END_DATE) TOTAL FROM 
      PROJECT_PEOPLE WHERE START_DATE < NOW() AND END_DATE > NOW() 
      AND DATEDIFF(PROJECT_PEOPLE.END_DATE, NOW()) <= ${CONST.GAP}`
  )
}
