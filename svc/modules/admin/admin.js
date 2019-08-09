var moment = require('moment');
const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");
const log = require("../../common/logger");

const getWeekDates = (year) => {
  const firstDay = moment([year]).startOf('year');
  const lastDay = moment([year]).endOf('year');
  let date = firstDay;
  let week = 0;
  const dates = [];
  while (date < lastDay && week !== 52) {
    week = date.week();
    const startDate = date.startOf('week').format('YYYY-MM-DD');
    const endDate = date.endOf('week').format('YYYY-MM-DD');
    dates.push({
      year, week, startDate, endDate
    });
    date = date.add(7);
  }
  return dates;
}

const insertCalendar = async (req, res) => {
  try {
    const year = req.params.year;
    const dates = getWeekDates(year);
    let values = '';
    dates.forEach(item => {
      values = `${values} (${item.year}, ${item.week}, '${item.startDate}', '${item.endDate}'),`
    });
    const connection = await db.connection(req);
    const data = await db.execute(connection, SQL.InsertCalendar(
      values.substring(0, values.length - 1)
    ));
    util.successResponse(res, data);
  } catch(exception) {
    log.error(exception);
    util.errorResponse(res, exception);
  }
}

module.exports = {
  insertCalendar
}