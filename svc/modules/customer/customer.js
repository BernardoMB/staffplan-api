const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const customerList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const customerList = await db.execute(connection, SQL.customerList(req));
    util.successResponse(res, customerList);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }  
}
const getCustomerContact = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const customerContact = await db.execute(connection, SQL.getCustomerContactsById(req.params.id));
    util.successResponse(res, customerContact);
  } catch (exception) {
    util.errorResponse(res,exception);
  }
}

module.exports = {
  customerList,
  getCustomerContact
}