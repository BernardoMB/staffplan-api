const customer = require('./customer');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'customer';
module.exports = (app) => {  
  app.get(`/${CONST.API}/${MODULE}/`, authenticate.isAuthenticated, customer.customerList);
  app.put(`/${CONST.API}/${MODULE}/`, authenticate.isAuthenticated, customer.insertCustomer);
  app.post(`/${CONST.API}/${MODULE}/:id/`, authenticate.isAuthenticated, customer.updateCustomer);
  app.put(`/${CONST.API}/${MODULE}/:id/contact`, authenticate.isAuthenticated, customer.insertCustomerContact);
  app.get(`/${CONST.API}/${MODULE}/:id/contact`, authenticate.isAuthenticated, customer.getCustomerContact);
}
