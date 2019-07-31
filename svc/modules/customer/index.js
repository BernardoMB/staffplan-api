const customer = require('./customer');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'customer';
module.exports = (app) => {  
  app.get(`/${CONST.API}/${MODULE}/`, authenticate.isAuthenticated, customer.customerList);
  app.get(`/${CONST.API}/${MODULE}/:id/contact`, authenticate.isAuthenticated, customer.getCustomerContact);
}
