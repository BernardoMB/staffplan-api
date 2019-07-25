const customer = require('./customer');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'customer';
module.exports = (app) => {  
  app.post(`/${CONST.API}/${MODULE}/customerlist`, authenticate.isAuthenticated, customer.customerList);
  app.put(`/${CONST.API}/${MODULE}/customer`, authenticate.isAuthenticated, customer.insertCustomer);
  app.post(`/${CONST.API}/${MODULE}/:id/customer`, authenticate.isAuthenticated, customer.updateCustomer);
  app.put(`/${CONST.API}/${MODULE}/contact`, authenticate.isAuthenticated, customer.insertCustomerContact);
  app.get(`/${CONST.API}/${MODULE}/:id/contact`, authenticate.isAuthenticated, customer.getCustomerContact);
}