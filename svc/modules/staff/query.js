module.exports = {
  staffAssignments: (Condition) => (
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
    LEFT JOIN EXPERIENCE
        ON PROJECT_STAFF.EXPERIENCE_ID = EXPERIENCE.EXPERIENCE_ID
    INNER JOIN PROJECT
        ON PROJECT.PROJECT_ID=PROJECT_STAFF.PROJECT_ID
    INNER JOIN OFFICE
        ON OFFICE.OFFICE_ID=PROJECT.OFFICE_ID
    INNER JOIN PROJECT_STATUS
        ON PROJECT.PROJECT_STATUS_ID=PROJECT_STATUS.STATUS_ID
      ${Condition}
    `   
  ),
  staffList: (Condition) => (
    ` 
    SELECT
      STAFF.STAFF_ID,
      STAFF.FIRST_NAME,
      STAFF.MIDDLE_INITIAL,
      STAFF.LAST_NAME,
      STAFF.PREFERRED_NAME,
      STAFF.EMAIL_ID,
      STAFF.PHONE_1,
      STAFF.PHONE_1_TYPE,
      STAFF.PHONE_2,
      STAFF.PHONE_2_TYPE,
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
      ${Condition} 
    `   
  ),
  getStaffProjectList: (id) => (
    `
    SELECT
        PROJECT.PROJECT_NAME,
        STAFF_ROLE.ROLE_NAME,
        PROJECT_STAFF.START_DATE,
        PROJECT_STAFF.END_DATE,
        CUSTOMER.CUSTOMER_NAME        
      FROM 
        PROJECT_STAFF  
      INNER JOIN STAFF  
        ON PROJECT_STAFF.STAFF_ID = STAFF.STAFF_ID
      INNER JOIN STAFF_ROLE
        ON STAFF_ROLE.ROLE_ID = PROJECT_STAFF.PROJECT_ROLE_ID
      INNER JOIN PROJECT
        ON PROJECT.PROJECT_ID=PROJECT_STAFF.PROJECT_ID
      LEFT JOIN CUSTOMER
        ON PROJECT.CUSTOMER_ID = CUSTOMER.CUSTOMER_ID
      WHERE
        PROJECT_STAFF.STAFF_ID = ${id}
    `
  ),
  getMonthwiseAllocation: () => (
    `
    SELECT Staff_ID, PROJECT_ID,START_DATE,END_DATE,SUM(allocation),
      CASE 
        WHEN end_date >= DATE_ADD(NOW(), INTERVAL 1 YEAR) AND SUM(allocation) >= 100 
          THEN "RED"
        WHEN end_date <= NOW()
          THEN "GREEN"
        WHEN end_date >= DATE_ADD(NOW(), INTERVAL 1 YEAR) AND SUM(allocation) < 100 OR end_date <= DATE_ADD(NOW(), INTERVAL 1 YEAR) 
          THEN "AMBER"		
        ELSE "PARTIAL GREEN"
      END AS Availabilty
    FROM project_staff
    GROUP BY staff_id;
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
      STAFF_CERTIFICATION.STAFF_CERTIFICATION_ID,
      CERTIFICATION_SKILLS.CERTIFICATION_NAME
    FROM
      STAFF_CERTIFICATION
    INNER JOIN CERTIFICATION_SKILLS
      on CERTIFICATION_SKILLS.CERTIFICATION_ID = STAFF_CERTIFICATION.CERTIFICATION_ID
    WHERE
    STAFF_CERTIFICATION.STAFF_ID = ${id}
    `
  ),
  insertStaffCertification: (certificate) => (
    `
    INSERT INTO STAFF_CERTIFICATION (
      STAFF_ID,
      CERTIFICATION_ID
    ) VALUES (
      ${certificate.STAFF_ID},
      ${certificate.CERTIFICATION_ID}
    )
    `
  ),
  deleteStaffCertification: (certificate) => (
    `
    DELETE FROM STAFF_CERTIFICATION 
      WHERE 
      STAFF_ID = ${certificate.STAFF_ID}
      AND
      CERTIFICATION_ID = ${certificate.CERTIFICATION_ID}    
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
  deleteStaffExperience: (experience) => (
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
      STAFF.EMAIL_ID,
      STAFF.PHONE_1,
      STAFF.PHONE_2,
      STAFF.PREFERENCES,
      STAFF.CANRELOCATE,
      STAFF.CANCOMMUTE,
      STAFF.STAFF_ROLE_ID,
      STAFF_ROLE.ROLE_NAME     
    FROM 
      STAFF
    INNER JOIN STAFF_ROLE
      ON STAFF_ROLE.ROLE_ID = STAFF.STAFF_ROLE_ID
    WHERE STAFF_ID = ${STAFF_ID}  
    `   
  ),
  staffSearch: (Condition) => (
    ` 
    SELECT
      STAFF.STAFF_ID,
      STAFF.FIRST_NAME,
      STAFF.MIDDLE_INITIAL,
      STAFF.LAST_NAME,
      STAFF.PREFERRED_NAME     
    FROM 
      STAFF
    ${Condition} 
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
    PROJECT_STAFF.END_DATE <= '${endDate}' || PROJECT_STAFF.START_DATE >= '${startDate}'
    `
  ),
  staffAvailable: (startDate, endDate) => (
    `
    SELECT STAFF.STAFF_ID 
    FROM STAFF LEFT JOIN PROJECT_STAFF ON PROJECT_STAFF.STAFF_ID = STAFF.STAFF_ID 
    WHERE PROJECT_STAFF.ID IS NULL || 
    PROJECT_STAFF.END_DATE <= '${startDate}' || PROJECT_STAFF.START_DATE >= '${endDate}'
    `
  )
}