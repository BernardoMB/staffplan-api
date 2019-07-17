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
        PROJECT_STAFF.RESUME_SUBMITTED        
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
        STAFF.STAFF_ID,
        STAFF.FIRST_NAME,
        STAFF.MIDDLE_INITIAL,
        STAFF.LAST_NAME,
        STAFF.PREFERRED_NAME,
        STAFF_ROLE.ROLE_NAME,
        PROJECT_STAFF.PROJECT_ID,
        PROJECT.PROJECT_NAME,
        PROJECT_STAFF.START_DATE,
        PROJECT_STAFF.END_DATE,
        PROJECT_STAFF.ALLOCATION        
      FROM 
        PROJECT_STAFF  
      INNER JOIN STAFF  
        ON PROJECT_STAFF.STAFF_ID = STAFF.STAFF_ID
      INNER JOIN STAFF_ROLE
        ON STAFF_ROLE.ROLE_ID = PROJECT_STAFF.PROJECT_ROLE_ID
      INNER JOIN 	PROJECT
        ON PROJECT.PROJECT_ID=PROJECT_STAFF.PROJECT_ID
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
      STAFF_CERTIFICATION,
      STAFF_TRAINING,
      STAFF_ROLE_ID,
      STAFF_GROUP_ID,
      STAFF_STATUS_ID,
      OFFICE_ID,
      EMPLOYMENT_START_DATE
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
      '${staff.STAFF_CERTIFICATION}',
      '${staff.STAFF_TRAINING}',
      ${staff.STAFF_ROLE_ID},
      ${staff.STAFF_GROUP_ID},
      ${staff.STAFF_STATUS_ID},
      ${staff.OFFICE_ID},
      '${staff.EMPLOYMENT_START_DATE}'
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
      STAFF_CERTIFICATION = '${staff.STAFF_CERTIFICATION}',
      STAFF_TRAINING = '${staff.STAFF_TRAINING}',
      STAFF_ROLE_ID = ${staff.STAFF_ROLE_ID},
      STAFF_GROUP_ID = ${staff.STAFF_GROUP_ID},
      STAFF_STATUS_ID = ${staff.STAFF_STATUS_ID},
      OFFICE_ID = ${staff.OFFICE_ID},
      EMPLOYMENT_START_DATE = '${staff.EMPLOYMENT_START_DATE}'      
    WHERE
      STAFF.STAFF_ID = ${id}
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

  customerList: (Condition) => (
    ` 
    SELECT
      CUSTOMER_ID,
      CUSTOMER_NAME,
      CUSTOMER_ADDRESS,
      CUSTOMER_CITY,
      CUSTOMER_STATE,
      CUSTOMER_ZIP,
      CUSTOMER_CONTACT,
      CONTACT_PHONE      
    FROM 
      CUSTOMER          
    ${Condition} 
    `   
  ),

  insertCustomer: (customer) => (
    `
    INSERT INTO CUSTOMER (
      CUSTOMER_NAME,
      CUSTOMER_ADDRESS,
      CUSTOMER_CITY,
      CUSTOMER_STATE,
      CUSTOMER_ZIP,
      CUSTOMER_CONTACT,
      CONTACT_PHONE
    ) VALUES (
      '${customer.CUSTOMER_NAME}',
      '${customer.CUSTOMER_ADDRESS}',
      '${customer.CUSTOMER_CITY}',
      '${customer.CUSTOMER_STATE}',
      '${customer.CUSTOMER_ZIP}',
      '${customer.CUSTOMER_CONTACT}',
      '${customer.CONTACT_PHONE}'
    )
    `
  ),

  getCustomerInfo: (id) => (
    `
    SELECT
      *
    FROM 
      CUSTOMER 
    WHERE
    CUSTOMER.CUSTOMER_ID = ${id}
    `
  ),

  updateCustomer: (id, customer) => (
    `
    UPDATE CUSTOMER SET 
      CUSTOMER_NAME = '${customer.CUSTOMER_NAME}',
      CUSTOMER_ADDRESS = '${customer.CUSTOMER_ADDRESS}',
      CUSTOMER_CITY = '${customer.CUSTOMER_CITY}',
      CUSTOMER_STATE = '${customer.CUSTOMER_STATE}',
      CUSTOMER_ZIP = '${customer.CUSTOMER_ZIP}',
      CUSTOMER_CONTACT = '${customer.CUSTOMER_CONTACT}',
      CONTACT_PHONE = '${customer.CONTACT_PHONE}'     
    WHERE
    CUSTOMER.CUSTOMER_ID = ${id}
    `
  ),

  addCustomerProject: (customerproject) => (
    `
    INSERT INTO CUSTOMER_PROJECTS (
      CUSTOMER_ID,
      PROJECT_ID
    ) VALUES (
      ${customerproject.CUSTOMER_ID},
      ${customerproject.PROJECT_ID}
    )
    `
  ),

  removeCustomerProject: (customerproject) => (
    `
    DELETE FROM CUSTOMER_PROJECTS 
      WHERE 
      CUSTOMER_ID = ${customerproject.CUSTOMER_ID}
      AND
      PROJECT_ID = ${customerproject.PROJECT_ID}    
    `
  )
}