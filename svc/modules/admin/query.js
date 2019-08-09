module.exports = {
  InsertCalendar: (values) => (
    `INSERT INTO CALENDAR (YEAR, WEEK, START_DATE, END_DATE) VALUES
      ${values}
    `
  )
};