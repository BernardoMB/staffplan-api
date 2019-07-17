const staff = require('./staff');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'staff';
module.exports = (app) => {
  app.post(`/${CONST.API}/${MODULE}/staffassignments`, authenticate.isAuthenticated, staff.staffAssignments);
  app.post(`/${CONST.API}/${MODULE}/stafflist`, authenticate.isAuthenticated, staff.staffList);
  app.get(`/${CONST.API}/${MODULE}/:id/projectlist`, authenticate.isAuthenticated, staff.getStaffProjectList); 
  app.get(`/${CONST.API}/${MODULE}/allocation`, authenticate.isAuthenticated, staff.getMonthwiseAllocation);
  app.put(`/${CONST.API}/${MODULE}/staffinfo`, authenticate.isAuthenticated, staff.insertStaff);
  app.post(`/${CONST.API}/${MODULE}/:id/staffinfo`, authenticate.isAuthenticated, staff.updateStaff);
  app.put(`/${CONST.API}/${MODULE}/:id/staffcertification`, authenticate.isAuthenticated, staff.insertStaffCertification);
  app.delete(`/${CONST.API}/${MODULE}/:id/deletestaffcertification`, authenticate.isAuthenticated, staff.deleteStaffCertification);
  app.put(`/${CONST.API}/${MODULE}/:id/staffexperience`, authenticate.isAuthenticated, staff.insertStaffExperience);
  app.delete(`/${CONST.API}/${MODULE}/:id/deletestaffexperience`, authenticate.isAuthenticated, staff.deleteStaffExperience);
  app.post(`/${CONST.API}/${MODULE}/customerlist`, authenticate.isAuthenticated, staff.customerList);
  app.put(`/${CONST.API}/${MODULE}/customer`, authenticate.isAuthenticated, staff.insertCustomer);
  app.post(`/${CONST.API}/${MODULE}/:id/customer`, authenticate.isAuthenticated, staff.updateCustomer);
  app.put(`/${CONST.API}/${MODULE}/:id/customerproject`, authenticate.isAuthenticated, staff.addCustomerProject);
  app.delete(`/${CONST.API}/${MODULE}/:id/removecustomerproject`, authenticate.isAuthenticated, staff.removeCustomerProject);
}