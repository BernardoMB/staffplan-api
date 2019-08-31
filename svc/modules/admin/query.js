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
      ZIP
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
      '${user.ZIP}'
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
      ACTIVE
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
      FIRST_NAME,
      MIDDLE_NAME,
      LAST_NAME,
      EMAIL,
      ADDRESS,
      CITY,
      STATE,
      ZIP,
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
      ZIP = '${user.ZIP}'
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
  )
};

