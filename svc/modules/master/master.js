const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");
const log = require("../../common/logger");
const cache = require("../../common/cache");

const getMasterList = async (req, res) => {
  try {
    const tableName = req.params.modelName;
    let data = cache.get(tableName);
    if (!data) {
      const connection = await db.connection(req);
      data = await db.execute(connection, SQL.Master(tableName));
      cache.set(tableName, data);
    }
    util.successResponse(res, data);
  } catch(exception) {
    log.error(exception);
    util.errorResponse(res, exception);
  }
}

const getOfficeList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const data = await db.execute(connection, SQL.Office());
    util.successResponse(res, data);
  } catch (exception) {
    log.error(exception);
    util.errorResponse(res, exception);
  }
}

const getCustomLabel = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const label = await db.execute(connection, SQL.Label());
    const data = {};
    if (label) {
      label.forEach(item => {
        if (!data[item.MODULE_NAME]) {
          data[item.MODULE_NAME] = {};
        }
        data[item.MODULE_NAME][item.FIELD_NAME] = item.FIELD_VALUE;
      });
    }
    util.successResponse(res, data);
  } catch (exception) {
    log.error(exception);
    util.errorResponse(res, exception);
  }
}

const updatePreference = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const preference = req.body.preference;
    const userId = req.payload.ID;
    // Delete previous preference value
    await db.execute(connection, SQL.RemovePreference(userId));
    // Update new preference value
    if (preference) {
      await db.execute(connection, SQL.AddPreference(userId, JSON.stringify(preference)));
    }
    util.successResponse(res);
  } catch(exception) {
    log.error(exception);
    util.errorResponse(res, exception);
  }
}
module.exports = {
  getMasterList,
  getOfficeList,
  getCustomLabel,
  updatePreference
}