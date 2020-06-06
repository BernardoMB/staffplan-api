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
  getQueryCount: (query) => (`SELECT COUNT(*) AS count FROM (${query}) AS Q`),
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
      PROJECT_TEAM.START_DATE,
      PROJECT_TEAM.END_DATE,
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
          START_DATE,
          END_DATE,
          ALLOCATION,
          RESUME_SUBMITTED
        FROM 
          PROJECT_STAFF
        UNION ALL
        SELECT 
          PROJECT_ID,
          NULL,
          PROJECT_ROLE_ID,
          START_DATE,
          END_DATE,
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
      PROJECT.PROJECT_NO,
      PROJECT.START_DATE,
      PROJECT.END_DATE,
      PROJECT.PROJECT_DESCRIPTION,
      PROJECT.PROJECT_ADDRESS,
      PROJECT.PROJECT_COUNTRY,
      PROJECT.PROJECT_CITY,
      PROJECT.PROJECT_STATE,
      PROJECT.PROJECT_ZIP,
      PROJECT.PROJECT_STATUS_ID,
      PROJECT.PROJECT_ROM,
      PROJECT_STATUS.STATUS_NAME,
      OFFICE.OFFICE_ID,
      OFFICE.OFFICE_NAME,
      PROJECT_GROUP.GROUP_ID,
      PROJECT_GROUP.GROUP_NAME,
      CUSTOMER.CUSTOMER_ID,      
      CUSTOMER.CUSTOMER_NAME,
      CONTACT.CONTACT_ID,
      CONTACT.NAME CONTACT_NAME,
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
    INNER JOIN CATEGORY
      ON CATEGORY.CATEGORY_ID=PROJECT.CATEGORY_ID
    INNER JOIN TIMELINE_TYPE
      ON PROJECT.TIMELINE_TYPE_ID=TIMELINE_TYPE.TIMELINE_TYPE_ID 
    LEFT JOIN CUSTOMER
      ON CUSTOMER.CUSTOMER_ID=PROJECT.CUSTOMER_ID
    LEFT JOIN CONTACT
      ON CONTACT.CONTACT_ID=PROJECT.CONTACT_ID
    LEFT JOIN PROJECT_TYPE
      ON PROJECT_TYPE.TYPE_ID=PROJECT.PROJECT_TYPE_ID
    LEFT JOIN PROJECT_STATUS
      ON PROJECT.PROJECT_STATUS_ID=PROJECT_STATUS.STATUS_ID
    WHERE
      PROJECT.PROJECT_ID = ${id}
    `
  ),
  projectDetailsById: (id) => (
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
      PROJECT_NO,
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
      TIMELINE_TYPE_ID,
      CUSTOMER_ID,
      CONTACT_ID
    ) VALUES (
      '${project.PROJECT_NAME}',
      '${project.PROJECT_NO}',
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
      ${project.TIMELINE_TYPE_ID},
      ${project.CUSTOMER_ID},
      ${project.CONTACT_ID}
    )
    `
  ),
  updateProjectDetail: (project,id) => (
    `
    UPDATE PROJECT SET 
      PROJECT_NAME = '${project.PROJECT_NAME}',
      PROJECT_NO = '${project.PROJECT_NO}',
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
      TIMELINE_TYPE_ID = ${project.TIMELINE_TYPE_ID},
      CUSTOMER_ID = ${project.CUSTOMER_ID},
      CONTACT_ID = ${project.CONTACT_ID}
    WHERE
      PROJECT.PROJECT_ID = ${id}
    `
  ),
  insertCustomer: (CUSTOMER_NAME) => (
    `
    INSERT INTO CUSTOMER (
      CUSTOMER_NAME
    ) VALUES (
      '${CUSTOMER_NAME}'
    )
    `
  ),
  insertContact: (CONTACT_NAME) => (
    `
    INSERT INTO CONTACT (
      NAME
    ) VALUES (
      '${CONTACT_NAME}'
    )
    `
  ),
  insertCustomerContact: (CUSTOMER_ID, CONTACT_ID) => (
    `
    INSERT INTO CUSTOMER_CONTACTS (CUSTOMER_ID, CONTACT_ID)
    VALUES (
      ${CUSTOMER_ID},
      ${CONTACT_ID}
    )
    `
  )
}
