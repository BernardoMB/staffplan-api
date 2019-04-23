module.exports = {
  fetchCompany: (domainId) => (
    `SELECT * FROM COMPANY WHERE NAME = '${domainId}'`
  ),
  auth: (domainId) => (
    `SELECT * FROM SUBSCRIBER
      INNER JOIN COMPANY ON COMPANY.COMPANY_ID = SUBSCRIBER.COMPANY_ID 
      WHERE DOMAIN_ID = '${domainId}'`
  ),
  validate: (username, password) => (
    `SELECT  USERS.*, ROLE.ROLE_NAME, ROLE.COMBINATION_ID 
      FROM USERS INNER JOIN ROLE ON USERS.ROLE_ID = ROLE.ID 
      WHERE EMAIL = '${username}' AND PASSWORD = '${password}'`
  ),
  office: (userId) => (
    `SELECT USER_ACCESS.OFFICE_ID, OFFICE.OFFICE_NAME FROM USER_ACCESS
      INNER JOIN OFFICE ON OFFICE.OFFICE_ID = USER_ACCESS.OFFICE_ID
      WHERE USER_ACCESS.USER_ID = ${userId}`
  )
}
