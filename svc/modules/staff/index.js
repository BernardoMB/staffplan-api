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
  app.post(`/${CONST.API}/${MODULE}/workload`, authenticate.isAuthenticated, staff.getStaffWorkload);
  app.post(`/${CONST.API}/${MODULE}/workload-list`, authenticate.isAuthenticated, staff.getStaffWorkloadList);
  app.post(`/${CONST.API}/${MODULE}/workload-count`, authenticate.isAuthenticated, staff.getStaffWorkloadListCount);

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

  // Staff group crud
  app.put(
    `/${CONST.API}/${MODULE}/group/details`,
    authenticate.isAuthenticated,
    staff.insertStaffGroupDetail
  );
  app.post(
    `/${CONST.API}/${MODULE}/group/list`,
    authenticate.isAuthenticated,
    staff.getStaffGroupList
  );
  app.post(
    `/${CONST.API}/${MODULE}/group/list-count`,
    authenticate.isAuthenticated,
    staff.getStaffGroupListCount
  );
  app.get(
    `/${CONST.API}/${MODULE}/group/:id/details`,
    authenticate.isAuthenticated,
    staff.getStaffGroupDetailById
  );
  app.patch(
    `/${CONST.API}/${MODULE}/group/:id/details`,
    authenticate.isAuthenticated,
    staff.updateStaffGroupDetail
  );
  app.delete(
    `/${CONST.API}/${MODULE}/group/:id`,
    authenticate.isAuthenticated,
    staff.deleteStaffGroupById
  );

  // Staff role crud
  app.put(
    `/${CONST.API}/${MODULE}/role/details`,
    authenticate.isAuthenticated,
    staff.insertStaffRoleDetail
  );
  app.post(
    `/${CONST.API}/${MODULE}/role/list`,
    authenticate.isAuthenticated,
    staff.getStaffRoleList
  );
  app.post(
    `/${CONST.API}/${MODULE}/role/list-count`,
    authenticate.isAuthenticated,
    staff.getStaffRoleListCount
  );
  app.get(
    `/${CONST.API}/${MODULE}/role/:id/details`,
    authenticate.isAuthenticated,
    staff.getStaffRoleDetailById
  );
  app.patch(
    `/${CONST.API}/${MODULE}/role/:id/details`,
    authenticate.isAuthenticated,
    staff.updateStaffRoleDetail
  );
  app.delete(
    `/${CONST.API}/${MODULE}/role/:id`,
    authenticate.isAuthenticated,
    staff.deleteStaffRoleById
  );
  
  // Staff certification crud
  app.put(
    `/${CONST.API}/${MODULE}/certification/details`,
    authenticate.isAuthenticated,
    staff.insertStaffCertificationDetail
  );
  app.post(
    `/${CONST.API}/${MODULE}/certification/list`,
    authenticate.isAuthenticated,
    staff.getStaffCertificationList
  );
  app.post(
    `/${CONST.API}/${MODULE}/certification/list-count`,
    authenticate.isAuthenticated,
    staff.getStaffCertificationListCount
  );
  app.get(
    `/${CONST.API}/${MODULE}/certification/:id/details`,
    authenticate.isAuthenticated,
    staff.getStaffCertificationDetailById
  );
  app.patch(
    `/${CONST.API}/${MODULE}/certification/:id/details`,
    authenticate.isAuthenticated,
    staff.updateStaffCertificationDetail
  );
  app.delete(
    `/${CONST.API}/${MODULE}/certification/:id`,
    authenticate.isAuthenticated,
    staff.deleteStaffCertificationById
  );
  
  // Staff experience crud
  app.put(
    `/${CONST.API}/${MODULE}/experience/details`,
    authenticate.isAuthenticated,
    staff.insertStaffExperienceDetail
  );
  app.post(
    `/${CONST.API}/${MODULE}/experience/list`,
    authenticate.isAuthenticated,
    staff.getStaffExperienceList
  );
  app.post(
    `/${CONST.API}/${MODULE}/experience/list-count`,
    authenticate.isAuthenticated,
    staff.getStaffExperienceListCount
  );
  app.get(
    `/${CONST.API}/${MODULE}/experience/:id/details`,
    authenticate.isAuthenticated,
    staff.getStaffExperienceDetailById
  );
  app.patch(
    `/${CONST.API}/${MODULE}/experience/:id/details`,
    authenticate.isAuthenticated,
    staff.updateStaffExperienceDetail
  );
  app.delete(
    `/${CONST.API}/${MODULE}/experience/:id`,
    authenticate.isAuthenticated,
    staff.deleteStaffExperienceById
  );

}
