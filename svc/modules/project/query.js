module.exports = {
  ProjectList: (Condition) => (
    `SELECT 
      PROJECT.PROJECT_NAME, 
      PROJECT.PROJECT_ID,
      PROJECT.PROJECT_CITY,
      PROJECT.PROJECT_STATE,
      PROJECT_STATUS.STATUS_NAME,
      PROJECT.START_DATE,
      PROJECT.END_DATE,
      PROJECT.PROJECT_ROM,
      OFFICE.OFFICE_NAME,
      TIMELINE_TYPE.TYPE TIMELINE,
      (SELECT COUNT(NOTE_ID) FROM
        NOTES WHERE NOTES.PROJECT_ID = PROJECT.PROJECT_ID) NOTECOUNT,
      (SELECT COUNT(ID) FROM
        PLANNED_PROJECT_STAFF WHERE
          PLANNED_PROJECT_STAFF.PROJECT_ID = PROJECT.PROJECT_ID) OPENROLE
    FROM 
      PROJECT
    INNER JOIN PROJECT_STATUS
        ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID
    INNER JOIN OFFICE
        ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID
    INNER JOIN TIMELINE_TYPE
        ON TIMELINE_TYPE.TIMELINE_TYPE_ID = PROJECT.TIMELINE_TYPE_ID
      ${Condition}
    `   
  ),
  getTeam: (id) => (
    `
    SELECT
      PROJECT_STAFF.PROJECT_ID,
      STAFF.STAFF_ID,
      STAFF.FIRST_NAME,
      STAFF.MIDDLE_INITIAL,
      STAFF.LAST_NAME,
      STAFF.PREFERRED_NAME,
      STAFF_ROLE.ROLE_NAME
    FROM 
      PROJECT_STAFF  
    INNER JOIN STAFF  
      ON PROJECT_STAFF.STAFF_ID = STAFF.STAFF_ID
    INNER JOIN STAFF_ROLE
      ON STAFF_ROLE.ROLE_ID = PROJECT_STAFF.PROJECT_ROLE_ID

    WHERE
      PROJECT_STAFF.PROJECT_ID = ${id}
    `
  ),
  getOpenRoles: (condition) => (
    `
    SELECT 
      PROJECT.PROJECT_NAME,
      PROJECT.PROJECT_ID,
      PROJECT.PROJECT_CITY,
      PROJECT.PROJECT_STATE,
      PLANNED_PROJECT_STAFF.ID PLANNED_PROJECT_STAFF_ID,
      STAFF_ROLE.ROLE_NAME,
      PROJECT_STATUS.STATUS_NAME,
      PLANNED_PROJECT_STAFF.START_DATE,
      PLANNED_PROJECT_STAFF.END_DATE,
      PLANNED_PROJECT_STAFF.ALLOCATION,
      PLANNED_PROJECT_STAFF.RESUME_SUBMITTED,
      OFFICE.OFFICE_NAME,
      (SELECT COUNT(NOTE_ID) FROM
        NOTES WHERE NOTES.PROJECT_ID = PROJECT.PROJECT_ID) NOTECOUNT
    FROM 
      PROJECT
    INNER JOIN PLANNED_PROJECT_STAFF
      ON PROJECT.PROJECT_ID=PLANNED_PROJECT_STAFF.PROJECT_ID
    INNER JOIN STAFF_ROLE
      ON STAFF_ROLE.ROLE_ID=PLANNED_PROJECT_STAFF.PROJECT_ROLE_ID
    INNER JOIN PROJECT_STATUS
      ON PROJECT_STATUS.STATUS_ID=PROJECT.PROJECT_STATUS_ID
    INNER JOIN OFFICE
      ON OFFICE.OFFICE_ID=PROJECT.OFFICE_ID
   ${condition}
    ` 
  ),
  getProjectTeams: (condition) => (
    `
    SELECT
      STAFF.FIRST_NAME,
      STAFF.MIDDLE_INITIAL,
      STAFF.LAST_NAME,
      STAFF.PREFERRED_NAME,
      PROJECT.PROJECT_NAME,
      PROJECT.PROJECT_ID,
      PROJECT.PROJECT_CITY,
      PROJECT.PROJECT_STATE,
      STAFF_ROLE.ROLE_NAME,
      PROJECT_STATUS.STATUS_NAME,
      PROJECT.START_DATE,
      PROJECT.END_DATE,
      PROJECT_TEAM.ALLOCATION,
      PROJECT_TEAM.RESUME_SUBMITTED
    FROM
	    PROJECT 
	  INNER JOIN
      (
        SELECT 
          PROJECT_ID,
          STAFF_ID,
          PROJECT_ROLE_ID,
          ALLOCATION,
          RESUME_SUBMITTED
        FROM 
          PROJECT_STAFF
        UNION ALL
        SELECT 
          PROJECT_ID,
          NULL,
          PROJECT_ROLE_ID,
          ALLOCATION,
          RESUME_SUBMITTED
        FROM
          PLANNED_PROJECT_STAFF
      
      ) PROJECT_TEAM
		  ON PROJECT_TEAM.PROJECT_ID = PROJECT.PROJECT_ID
	  LEFT JOIN STAFF
 		  ON PROJECT_TEAM.STAFF_ID=STAFF.STAFF_ID
	  INNER JOIN STAFF_ROLE
		  ON PROJECT_TEAM.PROJECT_ROLE_ID=STAFF_ROLE.ROLE_ID
    INNER JOIN PROJECT_STATUS
      ON PROJECT.PROJECT_STATUS_ID=PROJECT_STATUS.STATUS_ID
    ${condition}
    ` 
  ),

  getProjectDetailById: (id) => (
    `
    SELECT
      PROJECT.PROJECT_ID,
      PROJECT.PROJECT_NAME,
      PROJECT.START_DATE,
      PROJECT.END_DATE,
      PROJECT.PROJECT_DESCRIPTION,
      PROJECT.PROJECT_ADDRESS,
      PROJECT.PROJECT_COUNTRY,
      PROJECT.PROJECT_CITY,
      PROJECT.PROJECT_STATE,
      PROJECT.PROJECT_ZIP,
      PROJECT.PROJECT_STATUS_ID,
      PROJECT_STATUS.STATUS_NAME,
      OFFICE.OFFICE_ID,
      OFFICE.OFFICE_NAME,
      PROJECT_GROUP.GROUP_ID,
      PROJECT_GROUP.GROUP_NAME,
      CUSTOMER.CUSTOMER_ID,      
      CUSTOMER.CUSTOMER_NAME,
      CONTACT.CONTACT_ID,
      CONTACT.NAME,
      CATEGORY.CATEGORY_ID,
      CATEGORY.CATEGORY_NAME,
      PROJECT.PROJECT_TYPE_ID,
      PROJECT_TYPE.TYPE_NAME,
      PROJECT.TIMELINE_TYPE_ID,
      TIMELINE_TYPE.TYPE TIMELINE
    FROM 
      PROJECT 
    INNER JOIN PROJECT_GROUP
      ON PROJECT_GROUP.GROUP_ID=PROJECT.GROUP_ID
    INNER JOIN OFFICE
      ON OFFICE.OFFICE_ID=PROJECT.OFFICE_ID    
    LEFT JOIN CUSTOMER
      ON CUSTOMER.CUSTOMER_ID=PROJECT.CUSTOMER_ID
    LEFT JOIN CONTACT
      ON CONTACT.CONTACT_ID=PROJECT.CONTACT_ID
    INNER JOIN CATEGORY
      ON CATEGORY.CATEGORY_ID=PROJECT.CATEGORY_ID
    INNER JOIN PROJECT_TYPE
      ON PROJECT_TYPE.TYPE_ID=PROJECT.PROJECT_TYPE_ID
    INNER JOIN PROJECT_STATUS
      ON PROJECT.PROJECT_STATUS_ID=PROJECT_STATUS.STATUS_ID
    INNER JOIN TIMELINE_TYPE
      ON PROJECT.TIMELINE_TYPE_ID=TIMELINE_TYPE.TIMELINE_TYPE_ID
    WHERE
      PROJECT.PROJECT_ID = ${id}
    `
  ),

  getProjectDetailUpdate: (id) => (
    `
    SELECT
      *
    FROM 
      PROJECT 
    WHERE
      PROJECT.PROJECT_ID = ${id}
    `
  ),

  insertProjectDetail: (project) => (
    `
    INSERT INTO PROJECT (
      PROJECT_NAME,
      PROJECT_ROM,
      PROJECT_ADDRESS,
      PROJECT_COUNTRY,
      PROJECT_CITY,
      PROJECT_STATE,
      PROJECT_ZIP,
      START_DATE,
      END_DATE,	
      PROJECT_STATUS_ID,
      PROJECT_TYPE_ID,
      OFFICE_ID,
      CATEGORY_ID,
      PROJECT_DESCRIPTION,
      GROUP_ID,
      TIMELINE_TYPE_ID
    ) VALUES (
      '${project.PROJECT_NAME}',
      ${project.PROJECT_ROM},
      '${project.PROJECT_ADDRESS}',
      '${project.PROJECT_COUNTRY}',
      '${project.PROJECT_CITY}',
      '${project.PROJECT_STATE}',
      '${project.PROJECT_ZIP}',
      '${project.START_DATE}',
      '${project.END_DATE}',
      ${project.PROJECT_STATUS_ID},
      ${project.PROJECT_TYPE_ID},
      ${project.OFFICE_ID},
      ${project.CATEGORY_ID},
      '${project.PROJECT_DESCRIPTION}',
      ${project.GROUP_ID},
      ${project.TIMELINE_TYPE_ID}
    )
    `
  ),

  updateProjectDetail: (project,id) => (
    `
    UPDATE PROJECT SET 
      PROJECT_NAME = '${project.PROJECT_NAME}',
      PROJECT_ROM = ${project.PROJECT_ROM},
      PROJECT_ADDRESS = '${project.PROJECT_ADDRESS}',
      PROJECT_COUNTRY = '${project.PROJECT_COUNTRY}',
      PROJECT_CITY = '${project.PROJECT_CITY}',
      PROJECT_STATE = '${project.PROJECT_STATE}',
      PROJECT_ZIP = '${project.PROJECT_ZIP}',
      START_DATE = '${project.START_DATE}',
      END_DATE = 	'${project.END_DATE}',
      PROJECT_STATUS_ID = ${project.PROJECT_STATUS_ID},
      PROJECT_TYPE_ID = ${project.PROJECT_TYPE_ID},
      OFFICE_ID = ${project.OFFICE_ID},
      CATEGORY_ID = ${project.CATEGORY_ID},
      PROJECT_DESCRIPTION = '${project.PROJECT_DESCRIPTION}',
      GROUP_ID = ${project.GROUP_ID},
      TIMELINE_TYPE_ID = ${project.TIMELINE_TYPE_ID}
    WHERE
      PROJECT.PROJECT_ID = ${id}
    `
  ),

  getProjectNotes: (condition) => (
    `
    SELECT 
      PROJECT.PROJECT_NAME,
      PROJECT.PROJECT_ID,
      NOTES.NOTE_ID,
      NOTES.CONTENT,
      NOTES.NODE_PARENT_ID,
      NOTES.IS_PARENT,
      NOTES.UPDATED,
      USERS.FIRST_NAME,
      USERS.MIDDLE_NAME,
      USERS.LAST_NAME,
      (SELECT COUNT(CHILDNOTES.NOTE_ID) FROM NOTES CHILDNOTES WHERE CHILDNOTES.NODE_PARENT_ID = NOTES.NOTE_ID) REPLYCOUNT
    FROM
	    PROJECT
	  INNER JOIN NOTES
		  ON PROJECT.PROJECT_ID = NOTES.PROJECT_ID
	  INNER JOIN USERS
		  ON USERS.USER_ID = NOTES.USER_ID
    WHERE
      ${condition}
    ORDER BY
      NOTES.NOTE_ID DESC
    `
  ),
  insertProjectNotes: (notes) => (
    `
    INSERT INTO NOTES (
      USER_ID,
      CONTENT,
      CREATED,
      UPDATED,
      PROJECT_ID,
      NODE_PARENT_ID,
      IS_PARENT
    ) VALUES (
      ${notes.USER_ID},
      '${notes.CONTENT}',
      NOW(),
      NOW(),
      ${notes.PROJECT_ID},
      ${notes.NODE_PARENT_ID},
      ${notes.IS_PARENT}      
    )
    `
  ),

  updateProjectNotes: (content, noteid) => (
    `
    UPDATE NOTES SET 
      CONTENT = '${content}',
      UPDATED = NOW()
    WHERE
      NOTE_ID = ${noteid}
    `
  ),

  deleteProjectNote: (projectId, noteId) => (
    `
    DELETE FROM NOTES 
    WHERE
      NOTE_ID = ${noteId}
      AND PROJECT_ID = ${projectId}
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
        START_DATE = '${role.END_DATE}'
      WHERE PLANNED_PROJECT_STAFF.ID IN (${role.PLANNED_PROJECT_STAFFIDS.join(',')})
      `    
      )
}