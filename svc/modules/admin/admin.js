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

const insertUser = async (req, res) => {
  try {
    const userDefault = {
      ROLE_ID: null,
      FIRST_NAME: '',
      MIDDLE_INITIAL: '',
      LAST_NAME: '',
      EMAIL_ID: '',
      PASSWORD: '',
      VERIFIED: 0,
      ADDRESS: '',
      CITY: '',
      COUNTRY: '',
      ZIP: '',
      ISACTIVE: 0
    };
    const userInfo = req.body;
    const userToCreate = Object.assign(userDefault, userInfo);
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.insertUser(userToCreate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}

const updateUser = async (req, res) => {
  try {
    const user = req.body;    
    const connection = await db.connection(req);
    const result = await db.execute(connection, SQL.getUserInfoByID(req.params.id));
    let detailsToUpdate = {};
    if (result && result.length > 0) {
      detailsToUpdate = result[0];
    }
    const userToUpdate = Object.assign(detailsToUpdate, user);
    const rowsAffected = await db.execute(connection, SQL.updateUser(req.params.id, userToUpdate));
    util.successResponse(res, rowsAffected);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
}

module.exports = {
  insertCalendar,
  insertUser,
  updateUser
}


