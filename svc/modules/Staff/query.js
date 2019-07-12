module.exports = {
  staffAssignments: (Condition) => (
    `SELECT 
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
  )
}