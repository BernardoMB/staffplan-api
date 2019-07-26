module.exports = {
  Master: (condition) => (
    `SELECT * FROM ${condition}`
  ),
  Office: () => (
    `SELECT
      OFFICE_ID,
      OFFICE_NAME
    FROM 
      OFFICE`
  ),
  Label: () => (
    `SELECT MODULE_NAME, FIELD_NAME, FIELD_VALUE FROM CUSTOM_LABEL ORDER BY MODULE_NAME, FIELD_NAME`
  ),
  RemovePreference: (userId) => (
    `DELETE FROM USER_PREFERENCE WHERE USER_ID = ${userId}`
  ),
  AddPreference: (userId, preference) => (
    `INSERT INTO USER_PREFERENCE (USER_ID, CONTENT) VALUES (${userId}, '${preference}')`
  )
}