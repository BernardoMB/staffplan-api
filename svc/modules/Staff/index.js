const staff = require('./staff');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'staff';
module.exports = (app) => {
  app.post(`/${CONST.API}/${MODULE}/staffassignments`, authenticate.isAuthenticated, staff.staffAssignments);
  app.post(`/${CONST.API}/${MODULE}/stafflist`, authenticate.isAuthenticated, staff.staffList);
  app.get(`/${CONST.API}/${MODULE}/:id/projectlist`, authenticate.isAuthenticated, staff.getStaffProjectList); 
  app.get(`/${CONST.API}/${MODULE}/allocation`, authenticate.isAuthenticated, staff.getMonthwiseAllocation);

}