module.exports = {
  auth: (domainId) => (
    `SELECT * FROM SUBSCRIBER
      INNER JOIN COMPANY ON COMPANY.COMPANY_ID = SUBSCRIBER.COMPANY_ID 
      WHERE DOMAIN_ID = '${domainId}'`
  ),
  validate: (username, password) => (
    `SELECT  USERS.*, ROLE.ROLE_NAME, ROLE.COMBINATION_ID 
      FROM USERS INNER JOIN ROLE ON USERS.ROLE_ID = ROLE.ID 
      WHERE EMAIL = '${username}' AND PASSWORD = '${password}'`
  )
}
