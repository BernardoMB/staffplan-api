const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const customerList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const customerList = await db.execute(connection, SQL.customerList());
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

const insertCustomer = async (req, res) => {
  try {
    const customer = req.body;
    const connection = await db.connection(req);
    const customerDefault = {
      CUSTOMER_NAME: '',
      CUSTOMER_ADDRESS: '',
      CUSTOMER_CITY: '',
      CUSTOMER_STATE: '',
      CUSTOMER_ZIP: ''
    }
    const customerToCreate = Object.assign(customerDefault, customer);
    const result = await db.execute(connection, SQL.insertCustomer(customerToCreate));
    const clientId = result.insertId;
    util.successResponse(res, { clientId });
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }  
}

const insertContact = async (req, res) => {
  try {
    const contact = req.body;

    const connection = await db.connection(req);
    const contactDefault = {
      NAME: '',
      EMAIL: '',
      PHONE: ''
    }
    const contactToCreate = Object.assign(contactDefault, contact);
    const result = await db.execute(connection, SQL.insertContact(contactToCreate));
    const contactId = result.insertId;
    const clientId = req.body.clientId;
    await db.execute(connection, SQL.insertCustomerContact(clientId, contactId));
    util.successResponse(res,  { clientId, contactId });
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }  
}

module.exports = {
  customerList,
  getCustomerContact,
  insertCustomer,
  insertContact
}