const staff = require('./staff');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'staff';

const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  fileSize: 10 * 1024 * 1024
});

module.exports = (app) => {
  app.get(`/${CONST.API}/${MODULE}/:id/details`, authenticate.isAuthenticated, staff.getStaffDetailsById);
  app.get(`/${CONST.API}/${MODULE}/:id/projectlist`, authenticate.isAuthenticated, staff.getStaffProjectList);
  app.get(`/${CONST.API}/${MODULE}/:id/allocation`, authenticate.isAuthenticated, staff.getStaffAllocation);

  app.get(`/${CONST.API}/${MODULE}/search`, authenticate.isAuthenticated, staff.staffSearch);
  app.post(`/${CONST.API}/${MODULE}/availability`, authenticate.isAuthenticated, staff.staffAdvanceSearch);

  app.get(`/${CONST.API}/${MODULE}/:id/assignments`, authenticate.isAuthenticated, staff.staffAssignments);

  app.post(`/${CONST.API}/${MODULE}/stafflist`, authenticate.isAuthenticated, staff.staffList);
  app.post(`/${CONST.API}/${MODULE}/stafflist-count`, authenticate.isAuthenticated, staff.staffListCount);
  app.post(`/${CONST.API}/${MODULE}/availability-list`, authenticate.isAuthenticated, staff.availabilityByDate);
  app.post(`/${CONST.API}/${MODULE}/assignmentlist`, authenticate.isAuthenticated, staff.assignmentList);
  app.post(`/${CONST.API}/${MODULE}/assignmentlist-count`, authenticate.isAuthenticated, staff.assignmentListCount);
  app.post(`/${CONST.API}/${MODULE}/workload`, authenticate.isAuthenticated, staff.getStaffWorkloadList);

  app.put(`/${CONST.API}/${MODULE}/info`, authenticate.isAuthenticated, staff.insertStaff);
  app.post(`/${CONST.API}/${MODULE}/:id/info`, authenticate.isAuthenticated, staff.updateStaff);

  app.get(`/${CONST.API}/${MODULE}/:id/certification`, authenticate.isAuthenticated, staff.getStaffCertification);
  app.put(`/${CONST.API}/${MODULE}/:id/certification`, authenticate.isAuthenticated, staff.insertStaffCertification);
  app.delete(`/${CONST.API}/${MODULE}/:id/certification/:key`, authenticate.isAuthenticated, staff.deleteStaffCertification
  );
  app.get(`/${CONST.API}/${MODULE}/:id/experience`, authenticate.isAuthenticated, staff.getStaffExperience);
  app.put(`/${CONST.API}/${MODULE}/:id/experience`, authenticate.isAuthenticated, staff.insertStaffExperience);
  app.post(`/${CONST.API}/${MODULE}/:id/experience`, authenticate.isAuthenticated, staff.removeStaffExperience);

  app.get(`/${CONST.API}/${MODULE}/:id/photo`, authenticate.isAuthenticated, staff.getStaffPhoto);
  app.put(`/${CONST.API}/${MODULE}/:id/photo`, authenticate.isAuthenticated, upload.single('photo'), staff.insertStaffPhoto);
}
