module.exports = {
  ProjectList: (Condition) =>
    `SELECT PROJECT.PROJECT_NAME,
       PROJECT.PROJECT_ID,
       PROJECT.PROJECT_CITY,
       PROJECT.PROJECT_STATE,
       PROJECT_STATUS.STATUS_NAME,
       PROJECT.START_DATE,
       PROJECT.END_DATE,
       PROJECT.PROJECT_ROM,
       OFFICE.OFFICE_NAME,
       TIMELINE_TYPE.TYPE                            TIMELINE,
       (SELECT COUNT(NOTE_ID)
        FROM NOTES
        WHERE NOTES.PROJECT_ID = PROJECT.PROJECT_ID) NOTECOUNT,
       (SELECT COUNT(ID)
        FROM PROJECT_STAFF
        WHERE PROJECT_STAFF.PROJECT_ID = PROJECT.PROJECT_ID
          AND STAFF_ID IS NULL)                      OPENROLE
FROM PROJECT
       INNER JOIN PROJECT_STATUS
                  ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID
       INNER JOIN OFFICE
                  ON OFFICE.OFFICE_ID = PROJECT.OFFICE_ID
       INNER JOIN TIMELINE_TYPE
                  ON TIMELINE_TYPE.TIMELINE_TYPE_ID = PROJECT.TIMELINE_TYPE_ID
      ${Condition}
    `,
  getQueryCount: (query) => `SELECT COUNT(*) AS count FROM (${query}) AS Q`,
  getDistinctFieldCount: (query, distinctField) =>
    `SELECT COUNT(DISTINCT(${distinctField})) AS count FROM (${query}) AS Q`,
  getQueryCountGroupBy: (query, groupByValue) =>
    `SELECT ${groupByValue}, COUNT(*) AS count FROM (${query}) AS Q GROUP BY ${groupByValue}`,
  getOpenRoles: (condition) =>
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
    `,
  getWorkloadList: (condition, startDate, endDate) =>
    `
    SELECT
        CALENDAR.WEEK,
        CALENDAR.START_DATE,
        CALENDAR.END_DATE,
        SA.ALLOCATION,
        STATUS_ID,
        STATUS_NAME,
        STAFF.STAFF_ID,
        STAFF.FIRST_NAME,
        STAFF.LAST_NAME,
        STAFF.PREFERRED_NAME,
        STAFF.STAFF_PHOTO,
        PROJECT.PROJECT_ID,
        PROJECT.PROJECT_NAME,
        ROLE_ID,
        ROLE_NAME
    FROM CALENDAR
         LEFT JOIN STAFF_ALLOCATION SA ON CALENDAR.CALENDAR_ID = SA.CALENDAR_ID
         LEFT OUTER JOIN PROJECT_STAFF PS ON SA.PROJECT_STAFF_ID = PS.ID
         LEFT OUTER JOIN PROJECT ON PS.PROJECT_ID = PROJECT.PROJECT_ID
         LEFT OUTER JOIN PROJECT_STATUS ON PROJECT.PROJECT_STATUS_ID = PROJECT_STATUS.STATUS_ID
         LEFT OUTER JOIN STAFF ON PS.STAFF_ID = STAFF.STAFF_ID
         LEFT OUTER JOIN STAFF_ROLE SR on PS.PROJECT_ROLE_ID = SR.ROLE_ID
    ${condition}
    AND CALENDAR.START_DATE >= '${startDate}'
    AND CALENDAR.END_DATE <= '${endDate}'
    AND PROJECT.PROJECT_STATUS_ID = 3
    ORDER BY CALENDAR.CALENDAR_ID, ROLE_NAME
    `,
  getWorkloadBench: (condition, startDate, endDate) =>
    `
    SELECT STAFF_ID, FIRST_NAME, LAST_NAME, PREFERRED_NAME, ROLE_ID, ROLE_NAME, STAFF_PHOTO
    FROM STAFF
            INNER JOIN STAFF_ROLE on STAFF.STAFF_ROLE_ID = STAFF_ROLE.ROLE_ID
    WHERE STAFF_ID NOT IN (
      SELECT STAFF_ID
      FROM PROJECT_STAFF
       where  (
          (START_DATE >= '${startDate}' AND START_DATE <= '${endDate}')
          OR (END_DATE >= '${endDate}' OR END_DATE > '${startDate}')
         )
         AND STAFF_ID IS NOT NULL
      )
    AND STAFF_STATUS_ID = 1
    ${condition}
    `,
  getWorkloadUnassigned: (condition, startDate, endDate) =>
    `
    SELECT ID, PPS.START_DATE, PPS.END_DATE, ALLOCATION, ROLE_ID, ROLE_NAME, PPS.PROJECT_ID, PROJECT_NAME
    FROM PLANNED_PROJECT_STAFF PPS
         INNER JOIN STAFF_ROLE on PPS.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID
         LEFT OUTER JOIN PROJECT on PPS.PROJECT_ID = PROJECT.PROJECT_ID
         WHERE 1 = 1
         AND ((PPS.START_DATE >= '${startDate}' AND PPS.START_DATE <= '${endDate}')
         OR (PPS.END_DATE >= '${endDate}' OR PPS.END_DATE > '${startDate}'))
         ${condition}
    `,
  getWorkloadListCount: (condition, startDate, endDate) =>
    `
    select ID
    from PROJECT_STAFF
          LEFT JOIN PROJECT ON PROJECT.PROJECT_ID = PROJECT_STAFF.PROJECT_ID
    where 1 = 1
  ${condition}
    AND (
        (PROJECT_STAFF.START_DATE >= '${startDate}' OR PROJECT_STAFF.START_DATE <= '${endDate}')
        AND 
        (PROJECT_STAFF.END_DATE >= '${endDate}' OR PROJECT_STAFF.END_DATE > '${startDate}')
      )
    GROUP by PROJECT_STAFF.PROJECT_ID
  `,
  getProjectTeams: (condition) =>
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
    `,
  getProjectDetailById: (id) =>
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
    `,
  projectDetailsById: (id) =>
    `
    SELECT
      *
    FROM 
      PROJECT 
    WHERE
      PROJECT.PROJECT_ID = ${id}
    `,
  insertProjectDetail: (project) =>
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
    `,
  updateProjectDetail: (project, id) =>
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
    `,
  insertCustomer: (CUSTOMER_NAME) =>
    `
    INSERT INTO CUSTOMER (
      CUSTOMER_NAME
    ) VALUES (
      '${CUSTOMER_NAME}'
    )
    `,
  insertContact: (CONTACT_NAME) =>
    `
    INSERT INTO CONTACT (
      NAME
    ) VALUES (
      '${CONTACT_NAME}'
    )
    `,
  insertCustomerContact: (CUSTOMER_ID, CONTACT_ID) =>
    `
    INSERT INTO CUSTOMER_CONTACTS (CUSTOMER_ID, CONTACT_ID)
    VALUES (
      ${CUSTOMER_ID},
      ${CONTACT_ID}
    )
    `,

    // Project group CRUD
    ProjectGroupList: (Condition) =>
        `SELECT PROJECT_GROUP.GROUP_ID,
                PROJECT_GROUP.GROUP_NAME
        FROM PROJECT_GROUP
        ${Condition}
        `,
    getProjectGroupQueryCount: (query) => `SELECT COUNT(*) AS count FROM (${query}) AS Q`,
    projectGroupDetailsById: (id) => `SELECT * FROM PROJECT_GROUP WHERE PROJECT_GROUP.GROUP_ID = ${id}`,
    insertProjectGroupDetail: (group) =>
        `INSERT INTO PROJECT_GROUP (
            GROUP_NAME
        ) VALUES (
            '${group.GROUP_NAME}'
        )`,
    updateProjectGroupDetail: (group, id) =>
        `UPDATE PROJECT_GROUP SET 
                GROUP_NAME = '${group.GROUP_NAME}'
        WHERE PROJECT_GROUP.GROUP_ID = ${id}`,
    removeProjectGroup: (id) => `DELETE FROM PROJECT_GROUP WHERE GROUP_ID = ${id}`,

    // Project status CRUD
    ProjectStatusList: (Condition) =>
        `SELECT PROJECT_STATUS.STATUS_ID,
                PROJECT_STATUS.STATUS_NAME,
                PROJECT_STATUS.CUSTOM
        FROM PROJECT_STATUS
        ${Condition}
        `,
    getProjectStatusQueryCount: (query) => `SELECT COUNT(*) AS count FROM (${query}) AS Q`,
    projectStatusDetailsById: (id) => `SELECT * FROM PROJECT_STATUS WHERE PROJECT_STATUS.STATUS_ID = ${id}`,
    insertProjectStatusDetail: (status) =>
        `INSERT INTO PROJECT_STATUS (
            STATUS_NAME,
            CUSTOM
        ) VALUES (
            '${status.STATUS_NAME}',
            ${status.CUSTOM ? '1' : '0'}
        )`,
    updateProjectStatusDetail: (status, id) =>
        `UPDATE PROJECT_STATUS SET 
                STATUS_NAME = '${status.STATUS_NAME}',
                CUSTOM = ${status.CUSTOM ? '1' : '0'}
        WHERE PROJECT_STATUS.STATUS_ID = ${id}`,
    removeProjectStatus: (id) => `DELETE FROM PROJECT_STATUS WHERE STATUS_ID = ${id}`,

    // Project type CRUD category Category
    ProjectCategoryList: (Condition) =>
        `SELECT CATEGORY.CATEGORY_ID,
                CATEGORY.CATEGORY_NAME
        FROM CATEGORY
        ${Condition}
        `,
    getProjectCategoryQueryCount: (query) => `SELECT COUNT(*) AS count FROM (${query}) AS Q`,
    projectCategoryDetailsById: (id) => `SELECT * FROM CATEGORY WHERE CATEGORY.CATEGORY_ID = ${id}`,
    insertProjectCategoryDetail: (category) =>
        `INSERT INTO CATEGORY (
            CATEGORY_NAME
        ) VALUES (
            '${category.CATEGORY_NAME}'
        )`,
    updateProjectCategoryDetail: (category, id) =>
        `UPDATE CATEGORY SET 
                CATEGORY_NAME = '${category.CATEGORY_NAME}'
        WHERE CATEGORY.CATEGORY_ID = ${id}`,
    removeProjectCategory: (id) => `DELETE FROM CATEGORY WHERE CATEGORY_ID = ${id}`,
    
    // Project type CRUD type Type
    ProjectTypeList: (Condition) =>
        `SELECT PROJECT_TYPE.TYPE_ID,
                PROJECT_TYPE.TYPE_NAME
        FROM PROJECT_TYPE
        ${Condition}
        `,
    getProjectTypeQueryCount: (query) => `SELECT COUNT(*) AS count FROM (${query}) AS Q`,
    projectTypeDetailsById: (id) => `SELECT * FROM PROJECT_TYPE WHERE PROJECT_TYPE.TYPE_ID = ${id}`,
    insertProjectTypeDetail: (type) =>
        `INSERT INTO PROJECT_TYPE (
            TYPE_NAME
        ) VALUES (
            '${type.TYPE_NAME}'
        )`,
    updateProjectTypeDetail: (type, id) =>
        `UPDATE PROJECT_TYPE SET 
                TYPE_NAME = '${type.TYPE_NAME}'
        WHERE PROJECT_TYPE.TYPE_ID = ${id}`,
    removeProjectType: (id) => `DELETE FROM PROJECT_TYPE WHERE TYPE_ID = ${id}`,
};
