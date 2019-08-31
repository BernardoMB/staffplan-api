var moment = require('moment');
const db = require('../../common/connection');
const SQL = require('./query');
const AuthSQL = require('../auth/query');
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
      MIDDLE_NAME: '',
      LAST_NAME: '',
      EMAIL: '',
      ADDRESS: '',
      CITY: '',
      STATE: '',
      COUNTRY: '',
      ZIP: ''
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

const getUser = async (req, res) => {
  try {
    if (util.isAdmin(req.payload.ROLE)) {
      const connection = await db.connection(req);
      const result = await db.execute(connection, SQL.getUsers());
      util.successResponse(res, result);  
    } else {
      util.errorResponse(res, 'User Access Restricted');
    }
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const activeUser = async (req, res) => {
  try {
    if (util.isAdmin(req.payload.ROLE)) {
      const connection = await db.connection(req);
      const userId = req.params.id;
      const user = await db.execute(connection, SQL.getUserInfoByID(userId));
      if (user && user.length > 0) {
        const ACTIVE = user[0].ACTIVE;
        if (ACTIVE) {
          await db.execute(connection, SQL.activateUser(userId, 0));
        } else {
          await db.execute(connection, SQL.activateUser(userId, 1));
        }
        util.successResponse(res, {
          activated: (ACTIVE === 0)
        });    
      } else {
        util.errorResponse(res, 'Activation failed');
      }
      
    } else {
      util.errorResponse(res, 'User Access Restricted');
    }
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const resetPassword = async (req, res) => {
  try {
    if (util.isAdmin(req.payload.ROLE)) {
      const connection = await db.connection(req);
      const userId = req.params.id;
      const hostname = req.body.hostname;
      const user = await db.execute(connection, SQL.getUserInfoByID(userId));
      if (user && user.length > 0) {
        const userName = user[0].EMAIL;
        const uuidv4 = require('uuid/v4');
        const resetId = uuidv4();
        log.info(`${userName} requested password reset`);
        await db.execute(connection, AuthSQL.clearPasswordReset(userId));
        const result = await db.execute(connection, AuthSQL.passwordReset(userId, resetId));
        if (result) {
          const tokenizer = require('../auth/tokenization');
          const resetToken = tokenizer.generateResetToken(userName, resetId);
          log.debug(`Reset Token - ${resetToken}`);
          const notification = require('../notification');
          notification.passwordReset(userName, user[0].FIRST_NAME, resetToken, hostname);
          util.successResponse(res)
        } else {
          util.errorResponse(res, 'Password reset failed');
        }
      } else {
        util.errorResponse(res, 'Password reset failed');
      }
    } else {
      util.errorResponse(res, 'User Access Restricted');
    }
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const getOfficeAccess = async (req, res) => {
 try {
    const userId = req.params.id;
    const connection = await db.connection(req);
    const result = await db.execute(connection, SQL.getOfficeAccess(userId));
    util.successResponse(res, result);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const addOfficeAccess = async (req, res) => {
 try {
    const userId = req.params.id;
    const officeId = req.params.officeId;
    const connection = await db.connection(req);
    const result = await db.execute(connection, SQL.addOfficeAccess(userId, officeId));
    util.successResponse(res, result);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const removeOfficeAccess = async (req, res) => {
  try {
    const userId = req.params.id;
    const officeId = req.params.officeId;
    const connection = await db.connection(req);
    const result = await db.execute(connection, SQL.removeOfficeAccess(userId, officeId));
    util.successResponse(res, result);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

module.exports = {
  insertCalendar,
  getUser,
  insertUser,
  activeUser,
  resetPassword,
  getOfficeAccess,
  addOfficeAccess,
  removeOfficeAccess,
  updateUser
}


