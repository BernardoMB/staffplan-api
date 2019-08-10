const staff = require('./staff');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'staff';
module.exports = (app) => {
  app.get(`/${CONST.API}/${MODULE}/:id/details`, authenticate.isAuthenticated, staff.getStaffDetailsById);
  app.get(`/${CONST.API}/${MODULE}/:id/projectlist`, authenticate.isAuthenticated, staff.getStaffProjectList);
  
  app.get(`/${CONST.API}/${MODULE}/search`, authenticate.isAuthenticated, staff.staffSearch);
  app.post(`/${CONST.API}/${MODULE}/availability`, authenticate.isAuthenticated, staff.staffAdvanceSearch); 

  app.post(`/${CONST.API}/${MODULE}/staffassignments`, authenticate.isAuthenticated, staff.staffAssignments);
  app.post(`/${CONST.API}/${MODULE}/stafflist`, authenticate.isAuthenticated, staff.staffList); 
  app.get(`/${CONST.API}/${MODULE}/allocation`, authenticate.isAuthenticated, staff.getMonthwiseAllocation);
  app.put(`/${CONST.API}/${MODULE}/staffinfo`, authenticate.isAuthenticated, staff.insertStaff);
  app.post(`/${CONST.API}/${MODULE}/:id/staffinfo`, authenticate.isAuthenticated, staff.updateStaff);
  
  app.get(`/${CONST.API}/${MODULE}/:id/certification`, authenticate.isAuthenticated, staff.getStaffCertification);
  app.put(`/${CONST.API}/${MODULE}/:id/certification`, authenticate.isAuthenticated, staff.insertStaffCertification);
  app.delete(`/${CONST.API}/${MODULE}/:id/certification`, authenticate.isAuthenticated, staff.deleteStaffCertification
  );
  app.get(`/${CONST.API}/${MODULE}/:id/experience`, authenticate.isAuthenticated, staff.getStaffExperience);
  app.put(`/${CONST.API}/${MODULE}/:id/experience`, authenticate.isAuthenticated, staff.insertStaffExperience);
  app.delete(`/${CONST.API}/${MODULE}/:id/experience`, authenticate.isAuthenticated, staff.deleteStaffExperience);
}