module.exports = {
  InsertCalendar: (values) => (
    `INSERT INTO CALENDAR (YEAR, WEEK, START_DATE, END_DATE) VALUES
      ${values}
    `
  ),
  insertUser: (user) => (
    `
    INSERT INTO USERS (
      ROLE_ID,
      FIRST_NAME,
      MIDDLE_NAME,
      LAST_NAME,
      EMAIL,
      ADDRESS,
      CITY,
      STATE,
      COUNTRY,
      ZIP,
      COMPANY
    ) VALUES (
      ${user.ROLE_ID},
      '${user.FIRST_NAME}',
      '${user.MIDDLE_NAME}',
      '${user.LAST_NAME}',
      '${user.EMAIL}',
      '${user.ADDRESS}',
      '${user.CITY}',
      '${user.STATE}',
      '${user.COUNTRY}',
      '${user.ZIP}',
      '${user.COMPANY}'
    )  
    `
  ),
  getUserInfoByID: (id) => (
    `
    SELECT
      ROLE_ID,
      FIRST_NAME,
      MIDDLE_NAME,
      LAST_NAME,
      EMAIL,
      ADDRESS,
      CITY,
      STATE,
      ZIP,
      ACTIVE,
      COMPANY
    FROM 
      USERS 
    WHERE
      USERS.USER_ID = ${id}
    `
  ),
  getUsers: () => (
    `
    SELECT
      USER_ID,
      USERS.ROLE_ID,
      ACCESS_ROLE.ROLE_NAME,
      ACCESS_ROLE.ROLE,
      FIRST_NAME,
      MIDDLE_NAME,
      LAST_NAME,
      EMAIL,
      ADDRESS,
      CITY,
      STATE,
      ZIP,
      COMPANY,
      if(ACTIVE, 'Yes', 'No') AS 'ACTIVE'
    FROM
      USERS
    INNER JOIN
      ACCESS_ROLE
      ON ACCESS_ROLE.ACCESS_ROLE_ID = USERS.ROLE_ID
    `
  ),
  updateUser: (id, user) => (
    `
    UPDATE USERS SET
      ROLE_ID = ${user.ROLE_ID},
      FIRST_NAME = '${user.FIRST_NAME}',
      MIDDLE_NAME = '${user.MIDDLE_NAME}',
      LAST_NAME = '${user.LAST_NAME}',
      EMAIL = '${user.EMAIL}',
      ADDRESS = '${user.ADDRESS}',
      CITY = '${user.CITY}',
      STATE = '${user.STATE}',
      ZIP = '${user.ZIP}',
      COMPANY = '${user.COMPANY}'
    WHERE
      USERS.USER_ID = ${id}
    `
  ),
  activateUser: (id, activate) => (
    `
    UPDATE USERS SET
      ACTIVE = ${activate}
    WHERE
      USERS.USER_ID = ${id}
    `
  ),
  getOfficeAccess: (userId) => (
    `
     SELECT OFFICE.OFFICE_ID AS 'key', OFFICE.OFFICE_NAME AS 'value' FROM 
      USER_ACCESS INNER JOIN OFFICE ON OFFICE.OFFICE_ID = USER_ACCESS.OFFICE_ID 
      WHERE USER_ACCESS.USER_ID = ${userId}
    `
  ),
  addOfficeAccess: (userId, officeId) => (
    `
     INSERT INTO USER_ACCESS (USER_ID, OFFICE_ID, REGION_ID)
      SELECT ${userId}, OFFICE_ID, REGION_ID FROM OFFICE WHERE OFFICE_ID = ${officeId}
    `
  ),
  removeOfficeAccess: (userId, officeId) => (
    `
     DELETE FROM USER_ACCESS WHERE USER_ID = ${userId} AND OFFICE_ID = ${officeId}
    `
  ),
  getUserPhoto: (userId) => (
    `
      SELECT PHOTO_URL FROM USERS WHERE USER_ID = ${userId}
    `
  ),
  insertUserPhoto: (userId, photo) => (
    `
      UPDATE USERS SET PHOTO_URL = '${photo}' WHERE USER_ID = ${userId}
    `
  ),
};

