const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");
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
    util.successResponse(res, { data });
  } catch(exception) {
    util.errorResponse(res, exception);
  }
}

const getOfficeList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const data = await db.execute(connection, SQL.Office());
    util.successResponse(res, { data });
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const getCustomLabel = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const label = await db.execute(connection, SQL.Label());
    const data = {};
    if (label) {
      label.forEach(item => data[item.FIELD_NAME] = item.CUSTOM_FIELD)
    }
    util.successResponse(res, { data });
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

module.exports = {
  getMasterList,
  getOfficeList,
  getCustomLabel
}