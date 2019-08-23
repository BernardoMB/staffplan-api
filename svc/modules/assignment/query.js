module.exports = {
  getProjectTeams: (condition) => (
    `
    SELECT
      PROJECT_TEAM.ID,
      STAFF.STAFF_ID,
      STAFF.FIRST_NAME,
      STAFF.MIDDLE_INITIAL,
      STAFF.LAST_NAME,
      STAFF.PREFERRED_NAME,
      STAFF_ROLE.ROLE_NAME,
      PROJECT_TEAM.PROJECT_ID,
      PROJECT_TEAM.START_DATE,
      PROJECT_TEAM.END_DATE,
      PROJECT_TEAM.ALLOCATION      
    FROM
    (
      SELECT
        ID,
        PROJECT_ID,
        STAFF_ID,
        PROJECT_ROLE_ID,
        START_DATE,
        END_DATE,
        ALLOCATION
      FROM 
        PROJECT_STAFF
      UNION ALL
      SELECT
        ID,
        PROJECT_ID,
        NULL,
        PROJECT_ROLE_ID,
        START_DATE,
        END_DATE,
        ALLOCATION
      FROM
        PLANNED_PROJECT_STAFF
    ) PROJECT_TEAM
    INNER JOIN STAFF_ROLE
		  ON PROJECT_TEAM.PROJECT_ROLE_ID=STAFF_ROLE.ROLE_ID
	  LEFT JOIN STAFF
      ON PROJECT_TEAM.STAFF_ID=STAFF.STAFF_ID
    WHERE
      ${condition}
    `
  ),
  insertProjectRole: (role) => (
    `
    INSERT INTO PLANNED_PROJECT_STAFF (
      START_DATE,
      END_DATE,
      ALLOCATION,
      PROJECT_ROLE_ID,
      PROJECT_ID      
    ) VALUES (
      '${role.START_DATE}',
      '${role.END_DATE}',
      ${role.ALLOCATION},
      ${role.PROJECT_ROLE_ID},
      ${role.PROJECT_ID}
    )
    `
  ),
  bulkRoleUpdate: (tableName, startDate, endDate, projectId, ids) => (
    `
    UPDATE ${tableName} SET
      START_DATE = '${startDate}',
      END_DATE = '${endDate}'
    WHERE
      PROJECT_ID = ${projectId} AND
      ID IN (${ids.join(',')})
    `
  ),
  deleteProjectPlanned: (projectId, id) => (
    `
    DELETE FROM PLANNED_PROJECT_STAFF 
    WHERE
      PROJECT_ID = ${projectId} AND
      ID = ${id}    
    `
  ),
  deleteStaffAllocation: (id) => (
    `
    DELETE FROM STAFF_ALLOCATION 
    WHERE PROJECT_STAFF_ID = ${id}    
    `
  ),
  deleteProjectStaff: (projectId, id) => (
    `
    DELETE FROM PROJECT_STAFF 
    WHERE
      PROJECT_ID = ${projectId} AND
      ID = ${id}    
    `
  ),
  getAlert: (id, staffId, startDate, endDate, allocation) => (
    `
    SELECT 
      COALESCE(SUM(PROJECT_STAFF.ALLOCATION), 0) + ${allocation} TOTAL
    FROM
      PROJECT_STAFF
    INNER JOIN
      PROJECT ON PROJECT.PROJECT_ID = PROJECT_STAFF.PROJECT_ID
    WHERE 
      PROJECT_STAFF.END_DATE > CURDATE()
      AND PROJECT_STAFF.ID <> ${id}
      AND PROJECT_STAFF.STAFF_ID = ${staffId}
      AND PROJECT_STAFF.START_DATE < '${endDate}'
      AND PROJECT_STAFF.END_DATE > '${startDate}'
    `
  ),
  getAssignmentDetails: (plannedId) => (
    `SELECT * FROM PLANNED_PROJECT_STAFF WHERE ID = ${plannedId}`
  ),
  insertProjectStaff: (staffId, plannedId) => (
    `
    INSERT INTO PROJECT_STAFF (STAFF_ID, START_DATE, END_DATE, ALLOCATION, PROJECT_ROLE_ID, CONFIRMED, PROJECT_ID)
    Select ${staffId}, START_DATE, END_DATE, ALLOCATION, PROJECT_ROLE_ID, CONFIRMED, PROJECT_ID 
    FROM PLANNED_PROJECT_STAFF WHERE ID = ${plannedId}
    `
  ),
  insertStaffAllocation: (plannedStaffId) => (
    `
      INSERT INTO STAFF_ALLOCATION
        (CALENDAR_ID, PROJECT_STAFF_ID, ALLOCATION)
        SELECT CALENDAR.CALENDAR_ID, PROJECT_STAFF.ID, PROJECT_STAFF.ALLOCATION 
        FROM CALENDAR LEFT JOIN 
        PROJECT_STAFF ON PROJECT_STAFF.ID = ${plannedStaffId} 
          WHERE CALENDAR.START_DATE >= PROJECT_STAFF.START_DATE AND CALENDAR.END_DATE <= PROJECT_STAFF.END_DATE
    `
  ),
  removeProjectPlan: (plannedId) => (
    `DELETE FROM PLANNED_PROJECT_STAFF WHERE ID = ${plannedId}`
  ),
  assignmentList: (plannedId, condition) => (
    `
    SELECT
      CALENDAR.WEEK,
      CALENDAR.YEAR,
      PROJECT_STAFF.STAFF_ID,
      STAFF_ALLOCATION.ALLOCATION
    FROM
      CALENDAR
      INNER JOIN STAFF_ALLOCATION
      ON CALENDAR.CALENDAR_ID = STAFF_ALLOCATION.CALENDAR_ID
      INNER JOIN PROJECT_STAFF
      ON PROJECT_STAFF.ID = STAFF_ALLOCATION.PROJECT_STAFF_ID
      LEFT JOIN PLANNED_PROJECT_STAFF
      on PLANNED_PROJECT_STAFF.ID = ${plannedId}
    WHERE
      CALENDAR.START_DATE >= PLANNED_PROJECT_STAFF.START_DATE
      AND CALENDAR.END_DATE <= PLANNED_PROJECT_STAFF.END_DATE
      AND ${condition}
    `
  ),
  outlookList: (startDate, endDate, condition) => (
    `
    SELECT
      CALENDAR.WEEK,
      CALENDAR.YEAR,
      PROJECT_STAFF.STAFF_ID,
      STAFF_ALLOCATION.ALLOCATION
    FROM
      CALENDAR
      INNER JOIN STAFF_ALLOCATION
      ON CALENDAR.CALENDAR_ID = STAFF_ALLOCATION.CALENDAR_ID
      INNER JOIN PROJECT_STAFF
      ON PROJECT_STAFF.ID = STAFF_ALLOCATION.PROJECT_STAFF_ID
    WHERE
      CALENDAR.START_DATE >= '${startDate}'
      AND CALENDAR.END_DATE <= '${endDate}'
      AND ${condition}
    `
  )
}