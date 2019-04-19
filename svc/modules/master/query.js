module.exports = {
  Master: (condition) => (
    `SELECT * FROM ${condition}`
  ),
  Office: () => (
    `SELECT
      OFFICE.*,
      REGION.REGION_NAME
    FROM 
      OFFICE 
    INNER JOIN 
      REGION 
    ON OFFICE.REGION_ID = REGION.REGION_ID`
  ),
  Label: () => (
    `SELECT * FROM CUSTOM_LABEL`
  )
}