module.exports = {
  fetchCompany: (environment, domain) => (
    `SELECT
        COMPANY.* 
    FROM COMPANY
    INNER JOIN COMPANY_ENVIRONMENT
      ON COMPANY.ID = COMPANY_ENVIRONMENT.COMPANY_ID
    INNER JOIN ENVIRONMENT_TYPE
      ON ENVIRONMENT_TYPE.ID = COMPANY_ENVIRONMENT.ENVIRONMENT_TYPE_ID
    WHERE
      ENVIRONMENT_TYPE.SUBDOMAIN = '${environment}'
    AND 
      COMPANY.DOMAIN = '${domain}'`
  ),
  fetchCompanyByDomain: (domain) => (
    `SELECT
        COMPANY.* 
    FROM COMPANY
    WHERE 
      COMPANY.DOMAIN = '${domain}'`
  ),
  validate: (username, password) => (
    `SELECT  USERS.*, ACCESS_ROLE.ROLE_NAME, ACCESS_ROLE.ROLE
      FROM USERS INNER JOIN ACCESS_ROLE ON USERS.ROLE_ID = ACCESS_ROLE.ACCESS_ROLE_ID 
      WHERE USERS.EMAIL = '${username}' AND USERS.PASSWORD = '${password}'`
  ),
  passwordReset: (userId, resetId) => (
    `INSERT INTO
      PASSWORD_RESET (USER_ID, REQUEST_DATE, RESET_ID) 
      VALUES (${userId}, SYSDATE(), '${resetId}')`
  ),
  clearPasswordReset: userId => (
    `UPDATE PASSWORD_RESET
      SET ACTIVE = 0 
      WHERE USER_ID = ${userId}`
  ),
  validateResetId: (userId, resetId, interval) => (
    `SELECT * FROM 
      PASSWORD_RESET 
    WHERE
      USER_ID = ${userId} AND ACTIVE = 1 AND 
      RESET_ID = '${resetId}' AND
      TIMESTAMPDIFF(HOUR, REQUEST_DATE, SYSDATE()) < ${interval}`
  ),
  updatePassword: (userId, password) => (
    `UPDATE USERS
      SET PASSWORD = '${password}'
      WHERE USER_ID = ${userId}`
  ),
  getuser: (username) => (
    `SELECT USERS.*  
      FROM USERS
      WHERE USERS.EMAIL = '${username}'`
  ),
  allOffice: () => (
    `SELECT OFFICE.OFFICE_ID, OFFICE.OFFICE_NAME FROM OFFICE ORDER BY OFFICE.OFFICE_NAME`
  ),
  office: (userId) => (
    `SELECT USER_ACCESS.OFFICE_ID, OFFICE.OFFICE_NAME FROM USER_ACCESS
      INNER JOIN OFFICE ON OFFICE.OFFICE_ID = USER_ACCESS.OFFICE_ID
      WHERE USER_ACCESS.USER_ID = ${userId}
      ORDER BY OFFICE.OFFICE_NAME
    `
  ),
  preference: (userId) => (
    `SELECT CONTENT FROM USER_PREFERENCE
      WHERE USER_ID = ${userId}`
  )
}
