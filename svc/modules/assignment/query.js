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

  bulkRoleUpdate: (role) => (
    `
    UPDATE PLANNED_PROJECT_STAFF SET
      START_DATE = '${role.START_DATE}',
      END_DATE = '${role.END_DATE}'
    WHERE PLANNED_PROJECT_STAFF.ID IN (${role.PLANNED_PROJECT_STAFFIDS.join(',')})
    `    
  ),

  deleteRole: (id) => (
    `
    DELETE FROM PLANNED_PROJECT_STAFF 
      WHERE ID = ${id}    
    `
  )
}