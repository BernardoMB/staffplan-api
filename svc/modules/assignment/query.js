module.exports = {
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
      START_DATE = '${role.END_DATE}'
    WHERE PLANNED_PROJECT_STAFF.ID IN (${role.PLANNED_PROJECT_STAFFIDS.join(',')})
    `    
  )
}