const constants = require('../../common/const');
// todo: date params
const getStaffAllocationNow = `
    SELECT PROJECT_STAFF.STAFF_ID, SUM(ALLOCATION) AS ALLOCATION
    FROM PROJECT_STAFF
    WHERE PROJECT_STAFF.END_DATE >= CURDATE()
      AND PROJECT_STAFF.START_DATE <= CURDATE()
    GROUP BY STAFF_ID
    `;
const getStaffGapNow = `
    SELECT CURRENT.STAFF_ID
      FROM PROJECT_STAFF CURRENT
                INNER JOIN PROJECT_STAFF FUTURE
                          ON CURRENT.STAFF_ID = FUTURE.STAFF_ID
                              AND DATEDIFF(FUTURE.START_DATE, CURRENT.END_DATE) > 1
                              AND CURRENT.ID <> FUTURE.ID
                LEFT OUTER JOIN STAFF S on CURRENT.STAFF_ID = S.STAFF_ID
      WHERE CURRENT.END_DATE > CURDATE()
        AND FUTURE.END_DATE > CURDATE()
    `;

module.exports = {
  staffAssignments: (staffId) => (
    `
    SELECT 
      STAFF.STAFF_ID,
      PROJECT.PROJECT_NAME,
      PROJECT.PROJECT_CITY,
      PROJECT.PROJECT_STATE,
      PROJECT.PROJECT_ZIP,
      PROJECT.PROJECT_STATUS_ID,
      PROJECT_STATUS.STATUS_NAME,
      PROJECT_STAFF.PROJECT_ID,        
      PROJECT_STAFF.START_DATE,
      PROJECT_STAFF.END_DATE,
      PROJECT_STAFF.ALLOCATION,
      PROJECT_STAFF.PROJECT_ROLE_ID,
      STAFF_ROLE.ROLE_NAME,
      OFFICE.OFFICE_NAME,
      CATEGORY.CATEGORY_NAME 
    FROM 
        STAFF 
    LEFT JOIN PROJECT_STAFF
      ON STAFF.STAFF_ID = PROJECT_STAFF.STAFF_ID
    INNER JOIN STAFF_ROLE
      ON PROJECT_STAFF.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID
    INNER JOIN PROJECT
      ON PROJECT.PROJECT_ID=PROJECT_STAFF.PROJECT_ID
    INNER JOIN OFFICE
      ON OFFICE.OFFICE_ID=PROJECT.OFFICE_ID
    INNER JOIN PROJECT_STATUS
      ON PROJECT.PROJECT_STATUS_ID=PROJECT_STATUS.STATUS_ID
    LEFT JOIN CATEGORY
      ON PROJECT.CATEGORY_ID=CATEGORY.CATEGORY_ID
    WHERE STAFF.STAFF_ID = ${staffId}
    `
  ),
  staffList: (Condition) => (
    `
    SELECT STAFF.STAFF_ID,
       CAST(
               CASE
                   WHEN GAP.STAFF_ID IS NOT NULL THEN 'GAP'
                   WHEN ALLOCATION.ALLOCATION < ${constants.MIN_FTE_ALLOCATION} THEN 'UNDER_ALLOCATED'
                   WHEN ALLOCATION.ALLOCATION > ${constants.MAX_FTE_ALLOCATION} THEN 'OVER_ALLOCATED'
                   WHEN ALLOCATION.ALLOCATION IS NULL THEN 'BENCH'
                   ELSE 'NO_ALERT'
                   END AS CHAR) AS ALLOCATION_STATUS,
       STAFF.FIRST_NAME,
       STAFF.MIDDLE_INITIAL,
       STAFF.LAST_NAME,
       STAFF.PREFERRED_NAME,
       STAFF.STAFF_ROLE_ID,
       STAFF_ROLE.ROLE_NAME,
       STAFF.STAFF_STATUS_ID,
       STAFF_STATUS.STATUS_NAME,
       STAFF.OFFICE_ID,
       STAFF.STAFF_PHOTO,
       OFFICE.OFFICE_NAME,
       STAFF.STAFF_GROUP_ID,
       STAFF_GROUP.GROUP_NAME
    FROM 
        STAFF
    INNER JOIN STAFF_ROLE
        ON STAFF_ROLE.ROLE_ID = STAFF.STAFF_ROLE_ID
    INNER JOIN OFFICE
        ON OFFICE.OFFICE_ID = STAFF.OFFICE_ID
    INNER JOIN STAFF_STATUS
        ON STAFF_STATUS.STATUS_ID = STAFF.STAFF_STATUS_ID
    INNER JOIN STAFF_GROUP
        ON STAFF_GROUP.GROUP_ID = STAFF.STAFF_GROUP_ID
    LEFT OUTER JOIN PROJECT_STAFF
                      ON STAFF.STAFF_ID = PROJECT_STAFF.STAFF_ID
    LEFT OUTER JOIN (${getStaffAllocationNow}) 
         AS ALLOCATION ON ALLOCATION.STAFF_ID = STAFF.STAFF_ID 
    LEFT OUTER JOIN (${getStaffGapNow}) AS GAP ON GAP.STAFF_ID = STAFF.STAFF_ID
      ${Condition} 
GROUP BY STAFF.STAFF_ID,
         STAFF.STAFF_ID, ALLOCATION_STATUS, GAP.STAFF_ID,
         STAFF.FIRST_NAME, STAFF.MIDDLE_INITIAL, STAFF.LAST_NAME,
         STAFF.PREFERRED_NAME,
         STAFF.STAFF_ROLE_ID, STAFF_ROLE.ROLE_NAME, STAFF.STAFF_STATUS_ID, STAFF_STATUS.STATUS_NAME, STAFF.OFFICE_ID,
         STAFF.STAFF_PHOTO, OFFICE.OFFICE_NAME, STAFF.STAFF_GROUP_ID, STAFF_GROUP.GROUP_NAME
ORDER BY STAFF.FIRST_NAME;
    `
  ),
  staffListCount: (Condition) => (
    `
    SELECT STAFF.STAFF_ID
        FROM
            STAFF
        INNER JOIN STAFF_ROLE
            ON STAFF_ROLE.ROLE_ID = STAFF.STAFF_ROLE_ID
        INNER JOIN OFFICE
            ON OFFICE.OFFICE_ID = STAFF.OFFICE_ID
        INNER JOIN STAFF_STATUS
            ON STAFF_STATUS.STATUS_ID = STAFF.STAFF_STATUS_ID
        INNER JOIN STAFF_GROUP
            ON STAFF_GROUP.GROUP_ID = STAFF.STAFF_GROUP_ID
        LEFT OUTER JOIN PROJECT_STAFF
                          ON STAFF.STAFF_ID = PROJECT_STAFF.STAFF_ID
        ${Condition} 
    GROUP BY STAFF.STAFF_ID
    `
  ),
  getStaffWorkloadList: (condition, startDate, endDate) =>
    `
    select CALENDAR.WEEK,
       CALENDAR.START_DATE as CALENDAR_SD,
       CALENDAR.END_DATE as CALENDAR_ED,
       STAFF.STAFF_ID,
       STAFF.FIRST_NAME,
       STAFF.LAST_NAME,
       STAFF_PHOTO,
       STAFF.PREFERRED_NAME,
       O.OFFICE_NAME,
       O.OFFICE_STATE,
       ROLE_NAME,
       ROLE_ID,
       PS.START_DATE,
       PS.END_DATE,
       PROJECT_NAME,
       P.PROJECT_ID,
       SA.ALLOCATION,
       PROJECT_STATUS_ID
        FROM CALENDAR
          LEFT JOIN STAFF_ALLOCATION SA ON CALENDAR.CALENDAR_ID = SA.CALENDAR_ID
          LEFT OUTER JOIN PROJECT_STAFF PS ON SA.PROJECT_STAFF_ID = PS.ID
          LEFT OUTER JOIN PROJECT P ON PS.PROJECT_ID = P.PROJECT_ID
          LEFT OUTER JOIN STAFF ON PS.STAFF_ID = STAFF.STAFF_ID
          LEFT OUTER JOIN STAFF_ROLE SR on PS.PROJECT_ROLE_ID = SR.ROLE_ID
          INNER JOIN OFFICE O on STAFF.OFFICE_ID = O.OFFICE_ID
      ${condition}
      AND (PROJECT_STATUS_ID = 3 OR PROJECT_STATUS_ID = 10)
      AND (PS.END_DATE >= '${startDate}')
      AND (PS.START_DATE < '${endDate}')
    ORDER BY STAFF.STAFF_ID
  `,
  getStaffWorkload: (id, startDate, endDate) =>
    `
    SELECT CALENDAR.WEEK,
       CALENDAR.START_DATE as CALENDAR_SD,
       CALENDAR.END_DATE as CALENDAR_ED, 
       STAFF.STAFF_ID,
        STAFF.FIRST_NAME,
        STAFF.LAST_NAME,
        STAFF_PHOTO,
        STAFF.PREFERRED_NAME,
        O.OFFICE_NAME,
        O.OFFICE_STATE,
        ROLE_NAME,
        ROLE_ID,
        PS.START_DATE,
        PS.END_DATE,
        PROJECT_NAME,
        P.PROJECT_ID,
         SA.ALLOCATION,
        PROJECT_STATUS_ID
    FROM CALENDAR
            LEFT JOIN STAFF_ALLOCATION SA ON CALENDAR.CALENDAR_ID = SA.CALENDAR_ID
           LEFT OUTER JOIN PROJECT_STAFF PS ON SA.PROJECT_STAFF_ID = PS.ID
            LEFT OUTER JOIN PROJECT P on PS.PROJECT_ID = P.PROJECT_ID
            LEFT OUTER JOIN STAFF ON PS.STAFF_ID = STAFF.STAFF_ID
            INNER JOIN OFFICE O on STAFF.OFFICE_ID = O.OFFICE_ID
            INNER JOIN STAFF_ROLE SR on STAFF.STAFF_ROLE_ID = SR.ROLE_ID
      WHERE STAFF.STAFF_ID = ${id}
      AND (PROJECT_STATUS_ID = 3 OR PROJECT_STATUS_ID = 10)
      AND (PS.END_DATE >= '${startDate}')
      AND (PS.START_DATE < '${endDate}')
  `,
  getStaffWorkloadListCount: (condition, startDate, endDate) =>
    `
    SELECT 1
    FROM STAFF
            LEFT JOIN PROJECT_STAFF PS on STAFF.STAFF_ID = PS.STAFF_ID
            LEFT OUTER JOIN PROJECT P on PS.PROJECT_ID = P.PROJECT_ID
            INNER JOIN OFFICE O on STAFF.OFFICE_ID = O.OFFICE_ID
            INNER JOIN STAFF_ROLE SR on STAFF.STAFF_ROLE_ID = SR.ROLE_ID
      ${condition}
      AND (PROJECT_STATUS_ID = 3 OR PROJECT_STATUS_ID = 10)
      AND (PS.END_DATE >= '${startDate}')
      AND (PS.START_DATE < '${endDate}')
      GROUP by PS.STAFF_ID
  `,
  availabilityByDate: (startDate, endDate, filters) => (
    `
    SELECT CALENDAR.WEEK,
       CALENDAR.YEAR,
       PROJECT_STAFF.STAFF_ID,
       STAFF_ALLOCATION.ALLOCATION,
       CALENDAR.END_DATE,
       CALENDAR.START_DATE,
       PROJECT_STAFF.ID
    FROM CALENDAR
            LEFT JOIN STAFF_ALLOCATION
                      ON CALENDAR.CALENDAR_ID = STAFF_ALLOCATION.CALENDAR_ID
            LEFT OUTER JOIN PROJECT_STAFF
                            ON PROJECT_STAFF.ID = STAFF_ALLOCATION.PROJECT_STAFF_ID
    WHERE CALENDAR.START_DATE >= ${startDate}
      AND CALENDAR.END_DATE <= date_add(${startDate}, interval 3 month)
      AND PROJECT_STAFF.STAFF_ID IN (
        SELECT ALLOC.STAFF_ID
        FROM (
                SELECT STAFF.STAFF_ID, SUM(ALLOCATION) AS SUM
                FROM STAFF
                          LEFT JOIN PROJECT_STAFF ON PROJECT_STAFF.STAFF_ID = STAFF.STAFF_ID
                INNER JOIN STAFF_ROLE
                            ON STAFF_ROLE.ROLE_ID = STAFF.STAFF_ROLE_ID
                INNER JOIN OFFICE
                            ON OFFICE.OFFICE_ID = STAFF.OFFICE_ID
                INNER JOIN STAFF_STATUS
                            ON STAFF_STATUS.STATUS_ID = STAFF.STAFF_STATUS_ID
                INNER JOIN STAFF_GROUP
                            ON STAFF_GROUP.GROUP_ID = STAFF.STAFF_GROUP_ID
                WHERE PROJECT_STAFF.START_DATE < ${startDate}
                  AND PROJECT_STAFF.END_DATE > ${endDate}
                   ${filters} 
                GROUP BY STAFF.STAFF_ID
            ) AS ALLOC
        WHERE ALLOC.SUM > ${constants.MIN_FTE_ALLOCATION}
    )
    ORDER BY STAFF_ID, START_DATE;
    `
  ),
  assignmentList: (Condition) => (
    `
    SELECT 
        STAFF.FIRST_NAME,
        STAFF.MIDDLE_INITIAL,
        STAFF.LAST_NAME,
        STAFF.PREFERRED_NAME,        
        STAFF.STAFF_ID,
        PROJECT.PROJECT_NAME,
        PROJECT.PROJECT_ADDRESS,
        PROJECT.PROJECT_COUNTRY,
        PROJECT.PROJECT_CITY,
        PROJECT.PROJECT_STATE,
        PROJECT.PROJECT_ZIP,
        PROJECT.PROJECT_STATUS_ID,
        PROJECT_STATUS.STATUS_NAME,
        PROJECT_STAFF.PROJECT_ID,        
        PROJECT_STAFF.START_DATE,
        PROJECT_STAFF.END_DATE,
        PROJECT_STAFF.ALLOCATION,
        PROJECT_STAFF.PROJECT_ROLE_ID,
        STAFF_ROLE.ROLE_NAME,
        PROJECT_STAFF.RESUME_SUBMITTED,
        OFFICE.OFFICE_NAME     
    FROM 
        STAFF 
    LEFT JOIN PROJECT_STAFF
        ON STAFF.STAFF_ID = PROJECT_STAFF.STAFF_ID
    INNER JOIN STAFF_ROLE
        ON PROJECT_STAFF.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID
    INNER JOIN PROJECT
        ON PROJECT.PROJECT_ID=PROJECT_STAFF.PROJECT_ID
    INNER JOIN OFFICE
        ON OFFICE.OFFICE_ID=PROJECT.OFFICE_ID
    INNER JOIN PROJECT_STATUS
        ON PROJECT.PROJECT_STATUS_ID=PROJECT_STATUS.STATUS_ID
      ${Condition}
    ORDER BY STAFF.FIRST_NAME
    `
  ),
  assignmentListGrouped: (Condition) => (
    `
    SELECT        
        STAFF.STAFF_ID  
    FROM 
        STAFF 
    LEFT JOIN PROJECT_STAFF
        ON STAFF.STAFF_ID = PROJECT_STAFF.STAFF_ID
    INNER JOIN STAFF_ROLE
        ON PROJECT_STAFF.PROJECT_ROLE_ID = STAFF_ROLE.ROLE_ID
    INNER JOIN PROJECT
        ON PROJECT.PROJECT_ID=PROJECT_STAFF.PROJECT_ID
    INNER JOIN OFFICE
        ON OFFICE.OFFICE_ID=PROJECT.OFFICE_ID
    INNER JOIN PROJECT_STATUS
        ON PROJECT.PROJECT_STATUS_ID=PROJECT_STATUS.STATUS_ID
      ${Condition}
    GROUP BY STAFF.STAFF_ID
    `
  ),
  getStaffProjectList: (id) => (
    `
    SELECT
        PROJECT.PROJECT_NAME,
        PROJECT.PROJECT_CITY,
        STAFF_ROLE.ROLE_NAME,
        PROJECT_STAFF.START_DATE,
        PROJECT_STAFF.END_DATE,
        CUSTOMER.CUSTOMER_NAME,
        PROJECT_STATUS.STATUS_NAME,
        CATEGORY.CATEGORY_NAME                
      FROM 
        PROJECT_STAFF  
      INNER JOIN STAFF  
        ON PROJECT_STAFF.STAFF_ID = STAFF.STAFF_ID
      INNER JOIN STAFF_ROLE
        ON STAFF_ROLE.ROLE_ID = PROJECT_STAFF.PROJECT_ROLE_ID
      INNER JOIN PROJECT
        ON PROJECT.PROJECT_ID=PROJECT_STAFF.PROJECT_ID
      INNER JOIN PROJECT_STATUS
        ON PROJECT.PROJECT_STATUS_ID=PROJECT_STATUS.STATUS_ID
      LEFT JOIN CATEGORY
        ON PROJECT.CATEGORY_ID=CATEGORY.CATEGORY_ID
      LEFT JOIN CUSTOMER
        ON PROJECT.CUSTOMER_ID = CUSTOMER.CUSTOMER_ID
      WHERE
        PROJECT_STAFF.STAFF_ID = ${id}
    `
  ),
  insertStaff: (staff) => (
    `
    INSERT INTO STAFF (
      FIRST_NAME,
      MIDDLE_INITIAL,
      LAST_NAME,
      PREFERRED_NAME,
      EMAIL_ID,
      PHONE_1,
      PHONE_1_TYPE,
      PHONE_2,
      PHONE_2_TYPE,
      HOME_CITY,
      HOME_STATE,
      HOME_ZIP,
      STAFF_ROLE_ID,
      STAFF_GROUP_ID,
      STAFF_STATUS_ID,
      OFFICE_ID,
      EMPLOYMENT_START_DATE,
      PREFERENCES,
      CANRELOCATE,
      CANCOMMUTE
    ) VALUES (
      '${staff.FIRST_NAME}',
      '${staff.MIDDLE_INITIAL}',
      '${staff.LAST_NAME}',
      '${staff.PREFERRED_NAME}',
      '${staff.EMAIL_ID}',
      '${staff.PHONE_1}',
      '${staff.PHONE_1_TYPE}',
      '${staff.PHONE_2}',
      '${staff.PHONE_2_TYPE}',
      '${staff.HOME_CITY}',
      '${staff.HOME_STATE}',
      '${staff.HOME_ZIP}',
      ${staff.STAFF_ROLE_ID},
      ${staff.STAFF_GROUP_ID},
      ${staff.STAFF_STATUS_ID},
      ${staff.OFFICE_ID},
      '${staff.EMPLOYMENT_START_DATE}',
      '${staff.PREFERENCES}',
      ${staff.CANRELOCATE},
      ${staff.CANCOMMUTE}
    )  
    `
  ),
  getStaffInfoByID: (id) => (
    `
    SELECT
      *
    FROM 
      STAFF 
    WHERE
      STAFF.STAFF_ID = ${id}
    `
  ),
  updateStaff: (id, staff) => (
    `
    UPDATE STAFF SET 
      FIRST_NAME = '${staff.FIRST_NAME}',
      MIDDLE_INITIAL = '${staff.MIDDLE_INITIAL}',
      LAST_NAME = '${staff.LAST_NAME}',
      PREFERRED_NAME = '${staff.PREFERRED_NAME}',
      EMAIL_ID = '${staff.EMAIL_ID}',
      PHONE_1 = '${staff.PHONE_1}',
      PHONE_1_TYPE = '${staff.PHONE_1_TYPE}',
      PHONE_2 = '${staff.PHONE_2}',
      PHONE_2_TYPE = '${staff.PHONE_2_TYPE}',
      HOME_CITY = '${staff.HOME_CITY}',
      HOME_STATE = '${staff.HOME_STATE}',
      HOME_ZIP = '${staff.HOME_ZIP}',
      STAFF_ROLE_ID = ${staff.STAFF_ROLE_ID},
      STAFF_GROUP_ID = ${staff.STAFF_GROUP_ID},
      STAFF_STATUS_ID = ${staff.STAFF_STATUS_ID},
      OFFICE_ID = ${staff.OFFICE_ID},
      EMPLOYMENT_START_DATE = '${staff.EMPLOYMENT_START_DATE}',
      PREFERENCES= '${staff.PREFERENCES}',
      CANRELOCATE = ${staff.CANRELOCATE},     
      CANCOMMUTE = ${staff.CANCOMMUTE}  
    WHERE
      STAFF.STAFF_ID = ${id}
    `
  ),
  getStaffCertificationById: (id) => (
    `
    SELECT
      STAFF_CERTIFICATION.CERTIFICATION_ID,
      CERTIFICATION_SKILLS.CERTIFICATION_NAME
    FROM
      STAFF_CERTIFICATION
    INNER JOIN CERTIFICATION_SKILLS
      on CERTIFICATION_SKILLS.CERTIFICATION_ID = STAFF_CERTIFICATION.CERTIFICATION_ID
    WHERE
    STAFF_CERTIFICATION.STAFF_ID = ${id}
    `
  ),
  insertStaffCertification: (STAFF_ID, CERTIFICATION_ID) => (
    `
    INSERT INTO STAFF_CERTIFICATION (
      STAFF_ID,
      CERTIFICATION_ID
    ) VALUES (
      ${STAFF_ID},
      ${CERTIFICATION_ID}
    )
    `
  ),
  deleteStaffCertification: (STAFF_ID, CERTIFICATION_ID) => (
    `
    DELETE FROM STAFF_CERTIFICATION 
      WHERE 
      STAFF_ID = ${STAFF_ID}
      AND
      CERTIFICATION_ID = ${CERTIFICATION_ID}    
    `
  ),
  getstaffProjectExperience: (staffId, projectId) => (
    `
    SELECT
      EXPERIENCE.EXPERIENCE_ID as 'key',
      EXPERIENCE.EXPERIENCE_LABEL as 'value'
    FROM
      STAFF_PROJECT_EXPERIENCE
    INNER JOIN EXPERIENCE
      on EXPERIENCE.EXPERIENCE_ID = STAFF_PROJECT_EXPERIENCE.EXPERIENCE_ID
    WHERE
      STAFF_PROJECT_EXPERIENCE.STAFF_ID = ${staffId}
      AND
      STAFF_PROJECT_EXPERIENCE.PROJECT_ID = ${projectId}
    `
  ),
  getstaffExperienceById: (id) => (
    `
    SELECT
      STAFF_PROJECT_EXPERIENCE.EXPERIENCE_ID,
      EXPERIENCE.EXPERIENCE_LABEL
    FROM
      STAFF_PROJECT_EXPERIENCE
    INNER JOIN EXPERIENCE
      on EXPERIENCE.EXPERIENCE_ID = STAFF_PROJECT_EXPERIENCE.EXPERIENCE_ID
    WHERE
      STAFF_PROJECT_EXPERIENCE.STAFF_ID = ${id}
    `
  ),
  insertStaffExperience: (experience) => (
    `
    INSERT INTO STAFF_PROJECT_EXPERIENCE (
      EXPERIENCE_ID,
      STAFF_ID,
      PROJECT_ID
    ) VALUES (
      ${experience.EXPERIENCE_ID},
      ${experience.STAFF_ID},
      ${experience.PROJECT_ID}
    )
    `
  ),
  removeStaffExperience: (experience) => (
    `
    DELETE FROM STAFF_PROJECT_EXPERIENCE 
      WHERE 
    EXPERIENCE_ID = ${experience.EXPERIENCE_ID}
      AND
    STAFF_ID = ${experience.STAFF_ID}
      AND
    PROJECT_ID = ${experience.PROJECT_ID}    
    `
  ),
  getStaffDetailsById: (STAFF_ID) => (
    ` 
    SELECT
      STAFF.STAFF_ID,
      STAFF.FIRST_NAME,
      STAFF.MIDDLE_INITIAL,
      STAFF.LAST_NAME,
      STAFF.PREFERRED_NAME,
      STAFF.STAFF_PHOTO,
      STAFF.EMAIL_ID,
      STAFF.PHONE_1,
      STAFF.PHONE_2,
      STAFF.HOME_CITY,
      STAFF.HOME_STATE,
      STAFF.HOME_ZIP,
      STAFF.PREFERENCES,
      STAFF.CANRELOCATE,
      STAFF.CANCOMMUTE,
      STAFF.STAFF_ROLE_ID,
      STAFF_ROLE.ROLE_NAME,
      STAFF.STAFF_STATUS_ID,
      STAFF_STATUS.STATUS_NAME,
      STAFF.OFFICE_ID,
      OFFICE.OFFICE_NAME,
      STAFF.STAFF_GROUP_ID,
      STAFF_GROUP.GROUP_NAME    
    FROM 
      STAFF
    INNER JOIN STAFF_ROLE
      ON STAFF_ROLE.ROLE_ID = STAFF.STAFF_ROLE_ID
    INNER JOIN OFFICE
        ON OFFICE.OFFICE_ID = STAFF.OFFICE_ID
    INNER JOIN STAFF_STATUS
        ON STAFF_STATUS.STATUS_ID = STAFF.STAFF_STATUS_ID
    INNER JOIN STAFF_GROUP
        ON STAFF_GROUP.GROUP_ID = STAFF.STAFF_GROUP_ID
    WHERE STAFF_ID = ${STAFF_ID}  
    `
  ),
  staffSearch: (Condition, OrderBy = 'ORDER BY STAFF.FIRST_NAME') => (
    ` 
    SELECT
      STAFF.STAFF_ID,
      STAFF.FIRST_NAME,
      STAFF.MIDDLE_INITIAL,
      STAFF.LAST_NAME,
      STAFF.PREFERRED_NAME,
      STAFF.STAFF_PHOTO,
      STAFF_ROLE.ROLE_NAME,
      OFFICE.OFFICE_NAME
    FROM 
      STAFF 
    INNER JOIN
      STAFF_ROLE ON STAFF.STAFF_ROLE_ID = STAFF_ROLE.ROLE_ID
    INNER JOIN 
      OFFICE ON STAFF.OFFICE_ID = OFFICE.OFFICE_ID
    ${Condition} 
    ${OrderBy}
    `
  ),
  staffWithClient: (PROJECT_ID) => (
    `
  SELECT
    STAFF_ID
  FROM PROJECT_STAFF 
  WHERE PROJECT_ID IN 
    (SELECT PROJECT_ID FROM PROJECT 
      WHERE CUSTOMER_ID IN 
      (SELECT CUSTOMER_ID FROM PROJECT WHERE PROJECT_ID = ${PROJECT_ID}))`
  ),
  staffGap: (startDate, endDate) => (
    `
    SELECT STAFF.STAFF_ID 
    FROM STAFF LEFT JOIN PROJECT_STAFF ON PROJECT_STAFF.STAFF_ID = STAFF.STAFF_ID 
    WHERE PROJECT_STAFF.ID IS NULL || 
    PROJECT_STAFF.END_DATE < '${endDate}' || PROJECT_STAFF.START_DATE > '${startDate}'
    `
  ),
  staffListGap: () => (
    `
    SELECT
      CURRENT.STAFF_ID
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
    `
  ),
  staffAvailable: (startDate, endDate) => (
    `
    SELECT STAFF.STAFF_ID 
    FROM STAFF LEFT JOIN PROJECT_STAFF ON PROJECT_STAFF.STAFF_ID = STAFF.STAFF_ID 
    WHERE PROJECT_STAFF.ID IS NULL || 
    PROJECT_STAFF.END_DATE <= '${startDate}' || PROJECT_STAFF.START_DATE >= '${endDate}'
    `
  ),
  staffOnBench: () => (
    `SELECT STAFF_ID FROM 
      STAFF WHERE STAFF_ID NOT IN (
        SELECT STAFF_ID FROM PROJECT_STAFF WHERE START_DATE <= NOW() AND END_DATE >= NOW() GROUP BY STAFF_ID
      )`
  ),
  staffAlert: () => (
    ` 
    SELECT 
      PROJECT_STAFF.STAFF_ID
    FROM
      PROJECT_STAFF
    INNER JOIN
      PROJECT ON PROJECT.PROJECT_ID = PROJECT_STAFF.PROJECT_ID
    WHERE 
      PROJECT_STAFF.END_DATE > CURDATE()
      AND PROJECT_STAFF.START_DATE <= CURDATE()
      AND PROJECT_STAFF.END_DATE >  CURDATE()
    GROUP BY 
      STAFF_ID
    HAVING
      SUM(ALLOCATION) <> 100
    `
  ),
  getStaffProject: (id) => (
    `
    SELECT
        PROJECT_STAFF.ID,
        PROJECT.PROJECT_ID,
        PROJECT.PROJECT_NAME,
        PROJECT_STAFF.START_DATE,
        PROJECT_STAFF.END_DATE,
        PROJECT_STAFF.ALLOCATION       
      FROM 
        PROJECT_STAFF 
      INNER JOIN PROJECT
        ON PROJECT.PROJECT_ID=PROJECT_STAFF.PROJECT_ID
      WHERE
        PROJECT_STAFF.STAFF_ID = ${id}
    `
  ),

  staffAllocationList: (projectStaffId) => (
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
      CALENDAR.START_DATE >= PROJECT_STAFF.START_DATE
      AND PROJECT_STAFF.ID = ${projectStaffId}
    `
  ),
  getStaffPhoto: (staffId) => (
    `
      SELECT STAFF_PHOTO FROM STAFF WHERE STAFF_ID = ${staffId}
    `
  ),
  insertStaffPhoto: (staffId, photo) => (
    `
      UPDATE STAFF SET STAFF_PHOTO = '${photo}' WHERE STAFF_ID = ${staffId}
    `
  ),
  getQueryCount: (query) => (`SELECT COUNT(*) AS count FROM (${query}) AS Q`),
  getStaffAllocationNow: getStaffAllocationNow,
}
