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
      GROUP BY PROJECT_STAFF.STAFF_ID HAVING ALLOCATION_TOTAL <> ${CONST.MAX_FTE_ALLOCATION} ) 
      as ALLOCATION_TOTAL
`
  ),
  BenchRoles: (date) =>
    `
    SELECT COUNT(STAFF_ID) AS TOTAL, ROLE_NAME
    FROM STAFF
          LEFT JOIN STAFF_ROLE SR on STAFF.STAFF_ROLE_ID = SR.ROLE_ID
    WHERE STAFF_ID NOT IN (
      SELECT STAFF_ID FROM PROJECT_STAFF 
      WHERE START_DATE <= NOW() 
      AND END_DATE >= '${date}' 
      AND STAFF_ID IS NOT NULL
      GROUP BY STAFF_ID
    )
    group by ROLE_NAME
    `,
  GapRoles: (date, officeId) =>
    `
    SELECT COUNT(CURRENT.STAFF_ID) AS TOTAL, ROLE_NAME
    FROM PROJECT_STAFF CURRENT
          INNER JOIN PROJECT_STAFF FUTURE
                      ON CURRENT.STAFF_ID = FUTURE.STAFF_ID
                        AND DATEDIFF(FUTURE.START_DATE, CURRENT.END_DATE) > 1
                        AND CURRENT.ID <> FUTURE.ID
          LEFT JOIN STAFF_ROLE SR on CURRENT.PROJECT_ROLE_ID = SR.ROLE_ID
          LEFT JOIN PROJECT P on CURRENT.PROJECT_ID = P.PROJECT_ID
    WHERE CURRENT.END_DATE > CURDATE()
      AND FUTURE.END_DATE > CURDATE()
      AND CURRENT.STAFF_ID IN (SELECT STAFF_ID FROM STAFF)
      AND OFFICE_ID = '${officeId}'
      AND FUTURE.END_DATE > '${date}'
    GROUP BY SR.ROLE_NAME
    `,
  AllocationRoles: (date, officeId) => `
    SELECT CAST(
              CASE
                WHEN ALLOCATION > ${CONST.MAX_FTE_ALLOCATION} THEN 'OVER_ALLOCATED'
                WHEN ALLOCATION < ${CONST.MIN_FTE_ALLOCATION} THEN 'UNDER_ALLOCATED'
                END AS CHAR)
            AS ALLOCATION_STATUS,
          STAFF_ID,
          ROLE_NAME
    from (
          select AVG(ALLOCATION) ALLOCATION, STAFF_ID, ROLE_NAME
          from (
                  select sum(SA.ALLOCATION) ALLOCATION, C.WEEK, S.STAFF_ID, SR.ROLE_NAME
                  FROM CALENDAR C
                        LEFT JOIN STAFF_ALLOCATION SA ON SA.CALENDAR_ID = C.CALENDAR_ID
                        LEFT JOIN PROJECT_STAFF PS on SA.PROJECT_STAFF_ID = PS.ID
                        LEFT JOIN STAFF S ON S.STAFF_ID = PS.STAFF_ID
                          LEFT JOIN STAFF_ROLE SR ON PS.PROJECT_ROLE_ID = SR.ROLE_ID
                        LEFT JOIN PROJECT P on PS.PROJECT_ID = P.PROJECT_ID
                  WHERE S.STAFF_ID IS NOT NULL
                    AND '${date}' >= C.END_DATE
                    AND C.START_DATE >= NOW()
                    AND P.OFFICE_ID = '${officeId}'
                  group by C.WEEK, S.STAFF_ID, SR.ROLE_NAME
                ) Q1
          WHERE (ALLOCATION < ${CONST.MIN_FTE_ALLOCATION} OR ALLOCATION > ${CONST.MAX_FTE_ALLOCATION})
          GROUP BY STAFF_ID, ROLE_NAME
        ) Q2
    `
}
