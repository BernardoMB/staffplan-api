const CONST = require('../../common/const');

module.exports = {
  // InProgress: (condition, date, projectStatusQuery) => (
  //   `SELECT COUNT(PROJECT_ID) AS TOTAL FROM PROJECT 
  //     LEFT JOIN PROJECT_STATUS on PROJECT.PROJECT_STATUS_ID = STATUS_ID
  //     AND PROJECT.${condition}
  //     AND END_DATE >= '${date}'`
  // ),
  // Proposal: (condition, date, projectStatusQuery) => (
  //   `SELECT COUNT(PROJECT_ID) AS TOTAL FROM PROJECT 
  //    LEFT JOIN PROJECT_STATUS on PROJECT.PROJECT_STATUS_ID = STATUS_ID
  //     AND PROJECT.${condition}
  //     AND END_DATE >= '${date}'`
  // ),
  UnassignedRole: (condition, date, projectStatusQuery) => (
    `SELECT SUM(COUNT) AS TOTAL FROM 
      (SELECT COUNT(ID) AS COUNT FROM PLANNED_PROJECT_STAFF 
       LEFT JOIN PROJECT ON PLANNED_PROJECT_STAFF.PROJECT_ID = PROJECT.PROJECT_ID
       LEFT JOIN PROJECT_STATUS on PROJECT.PROJECT_STATUS_ID = STATUS_ID
      WHERE PROJECT.${condition}
      AND PROJECT.END_DATE >= '${date}'
      ${projectStatusQuery}
      GROUP BY PROJECT.PROJECT_ID) as COUNT`
  ),
  OnBench: (condition) => (
    `SELECT COUNT(STAFF_ID) AS TOTAL FROM 
      STAFF WHERE STAFF_ID NOT IN (
        SELECT STAFF_ID FROM PROJECT_STAFF WHERE START_DATE <= NOW() AND END_DATE >= NOW() GROUP BY STAFF_ID
      ) AND STAFF.${condition}`
  ),
  StaffingGap: (condition) => (
    /* Get all staff id, project start and end date details if they have */
    `
      SELECT
        COUNT(CURRENT.STAFF_ID) AS TOTAL
      FROM 
        PROJECT_STAFF CURRENT
      INNER JOIN PROJECT_STAFF FUTURE
        ON CURRENT.STAFF_ID = FUTURE.STAFF_ID 
        AND DATEDIFF(FUTURE.START_DATE, CURRENT.END_DATE) > 1
        AND CURRENT.ID <> FUTURE.ID
      WHERE 
       CURRENT.END_DATE > CURDATE()
       AND
       FUTURE.END_DATE > CURDATE()
       AND CURRENT.STAFF_ID IN (SELECT STAFF_ID FROM STAFF WHERE STAFF.${condition})
      `
  ),
  OverUnderAllocation: (condition) => (
    `SELECT COUNT(ALLOCATION_TOTAL) AS TOTAL FROM 
      (SELECT SUM(ALLOCATION) as ALLOCATION_TOTAL FROM PROJECT_STAFF
        INNER JOIN STAFF ON STAFF.STAFF_ID = PROJECT_STAFF.STAFF_ID
      WHERE PROJECT_STAFF.START_DATE <= NOW() AND PROJECT_STAFF.END_DATE >= NOW() AND STAFF.${condition}
      GROUP BY PROJECT_STAFF.STAFF_ID HAVING ALLOCATION_TOTAL <> 100 ) as ALLOCATION_TOTAL
`
  )
};
