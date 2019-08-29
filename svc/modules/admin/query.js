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
      MIDDLE_INITIAL,
      LAST_NAME,
      EMAIL_ID,
      PASSWORD,
      VERIFIED,
      ADDRESS,
      CITY,
      COUNTRY,
      ZIP,
      ISACTIVE
    ) VALUES (
      ${user.ROLE_ID},
      '${user.FIRST_NAME}',
      '${user.MIDDLE_INITIAL}',
      '${user.LAST_NAME}',
      '${user.EMAIL_ID}',
      '${user.PASSWORD}',
      ${user.VERIFIED},
      '${user.ADDRESS}',
      '${user.CITY}',
      '${user.COUNTRY}',
      '${user.ZIP}',
      ${user.ISACTIVE}
    )  
    `
  ),
  getUserInfoByID: (id) => (
    `
    SELECT
      *
    FROM 
      USERS 
    WHERE
      USERS.USER_ID = ${id}
    `
  ),
  updateUser: (id, user) => (
    `
    UPDATE USERS SET
      ROLE_ID = ${user.ROLE_ID},
      FIRST_NAME = '${user.FIRST_NAME}',
      MIDDLE_INITIAL = '${user.MIDDLE_INITIAL}',
      LAST_NAME = '${user.LAST_NAME}',
      EMAIL_ID = '${user.EMAIL_ID}',
      PASSWORD = '${user.PASSWORD}',
      VERIFIED = ${user.VERIFIED},
      ADDRESS = '${user.ADDRESS}',
      CITY = '${user.CITY}',
      COUNTRY = '${user.COUNTRY}',
      ZIP = '${user.ZIP}',
      ISACTIVE = ${user.ISACTIVE}
    WHERE
      USERS.USER_ID = ${id}
    `
  )
};

