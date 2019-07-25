const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const customerList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const customerList = await db.execute(connection, SQL.customerList(customerFilters(req)));
    util.successResponse(res, customerList);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }  
}

const insertCustomer = async (req, res) => {  
  try {
    const customerDefault = {
      CUSTOMER_NAME: '',
      CUSTOMER_ADDRESS: '',
      CUSTOMER_CITY: '',
      CUSTOMER_STATE: '',
      CUSTOMER_ZIP: ''
    };
    const customerInfo = req.body.customer;
    const customerToCreate = Object.assign(customerDefault, customerInfo);
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.insertCustomer(customerToCreate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}

const updateCustomer = async (req, res) => {
  try {
    const customer = req.body.customer;    
    const connection = await db.connection(req);
    const result = await db.execute(connection, SQL.getCustomerInfo(req.params.id));
    let detailsToUpdate = {};
    if (result && result.length > 0) {
      detailsToUpdate = result[0];
    }
    const customerToUpdate = Object.assign(detailsToUpdate, customer);
    const rowsAffected = await db.execute(connection, SQL.updateCustomer(req.params.id, customerToUpdate));
    util.successResponse(res, rowsAffected);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
}

const insertCustomerContact = async (req, res) => {  
  try {    
    const customerContactToCreate = req.body.customer;
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.insertCustomerContact(customerContactToCreate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}

const getCustomerContact = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const customerContact = await db.execute(connection, SQL.getCustomerContactsById(req.params.id));
    util.successResponse(res, customerContact);
  } catch (exception) {
      util.errorResponse(res,exception)
  }
}

const customerFilters = req => {
  const customerFilters = req.body.filter;
  let filterCondition = " where 1 = 1 ";

  if (req.params.id) {
    filterCondition = `${filterCondition} AND CUSTOMER.CUSTOMER_ID = ${req.params.id}`;
  }
  if (customerFilters.name) { 
      filterCondition = `${filterCondition} AND CUSTOMER.CUSTOMER_NAME = '${customerFilters.name}'`;  
    }

    if (customerFilters.address) {
      filterCondition = `${filterCondition} AND CUSTOMER.CUSTOMER_ADDRESS = '${customerFilters.address}'`; 
    }

    if (customerFilters.city) { 
      filterCondition = `${filterCondition} AND CUSTOMER.CUSTOMER_CITY = '${customerFilters.city}'`;  
    }

    if (customerFilters.state) {
      filterCondition = `${filterCondition} AND CUSTOMER.CUSTOMER_STATE = '${customerFilters.state}'`; 
    }

    if (customerFilters.zip) {
      filterCondition = `${filterCondition} AND CUSTOMER.CUSTOMER_ZIP = '${customerFilters.zip}'`; 
    }

  return (filterCondition); 
}

module.exports = {
  customerList,
  insertCustomer,
  updateCustomer,
  insertCustomerContact,
  getCustomerContact
}