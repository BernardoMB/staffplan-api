const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");
const log = require('../../common/logger');
const CONST = require('../../common/const');
const config = require('../../common/config');

const staffAssignments = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const staffAssignments = await db.execute(connection, SQL.staffAssignments(req.params.id));
    if (staffAssignments && staffAssignments.length) {
      for (let i = 0; i < staffAssignments.length; i++) {
        const assignment = staffAssignments[i];
        if (assignment.STAFF_ID) {
          // Getting Staff Experience
          const experience = await db.execute(connection, SQL.getstaffProjectExperience(assignment.STAFF_ID, assignment.PROJECT_ID));
          staffAssignments[i].experience = experience;
        }
      }
    }
    util.successResponse(res, staffAssignments);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }  
}

const staffList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const staffList = await db.execute(connection, SQL.staffList(filters(req)));
    util.successResponse(res, staffList);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }  
}

const assignmentList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const staffAssignments = await db.execute(connection, SQL.assignmentList(filters(req)));
    util.successResponse(res, staffAssignments);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }  
}

const getStaffProjectList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const ProjectList = await db.execute(connection, SQL.getStaffProjectList(req.params.id));
    util.successResponse(res, ProjectList);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }  
}

const insertStaff = async (req, res) => {
  try {
    const staffDefault = {
      FIRST_NAME: '',
      MIDDLE_INITIAL: '',
      LAST_NAME: '',
      PREFERRED_NAME: '',
      EMAIL_ID: '',
      PHONE_1: '',
      PHONE_1_TYPE: '',
      PHONE_2: '',
      PHONE_2_TYPE: '',
      HOME_CITY: '',
      HOME_STATE: '',
      HOME_ZIP: '',
      STAFF_ROLE_ID: null,
      STAFF_GROUP_ID: null,
      STAFF_STATUS_ID: null,
      OFFICE_ID: null,
      EMPLOYMENT_START_DATE: null,
      PREFERENCES: '',
      CANRELOCATE: 0,
      CANCOMMUTE: 0
    };
    const staffInfo = req.body;
    const staffToCreate = Object.assign(staffDefault, util.cleanObject(staffInfo));
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.insertStaff(staffToCreate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}

const updateStaff = async (req, res) => {
  try {
    const staff = req.body;    
    const connection = await db.connection(req);
    const result = await db.execute(connection, SQL.getStaffInfoByID(req.params.id));
    let detailsToUpdate = {};
    if (result && result.length > 0) {
      detailsToUpdate = result[0];
    }
    const staffToUpdate = Object.assign(detailsToUpdate, staff);
    const rowsAffected = await db.execute(connection, SQL.updateStaff(req.params.id, staffToUpdate));
    util.successResponse(res, rowsAffected);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
}

const getStaffCertification = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const staffCertification = await db.execute(connection, SQL.getStaffCertificationById(req.params.id));
    util.successResponse(res, staffCertification);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }
}

const insertStaffCertification = async (req, res) => {
  try {      
      const STAFF_ID = req.params.id;
      const CERTIFICATION_ID = req.body.key;
      const connection = await db.connection(req);
      const rowsAffected = await db.execute(connection, SQL.insertStaffCertification(STAFF_ID, CERTIFICATION_ID));
      util.successResponse(res, rowsAffected);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
}

const deleteStaffCertification = async (req, res) => {
  try {      
      const STAFF_ID = req.params.id;
      const CERTIFICATION_ID = req.params.key;
      const connection = await db.connection(req);
      const rowsAffected = await db.execute(connection, SQL.deleteStaffCertification(STAFF_ID, CERTIFICATION_ID));
      util.successResponse(res, rowsAffected);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
}

const getStaffExperience = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const staffExperience = await db.execute(connection, SQL.getstaffExperienceById(req.params.id));
    util.successResponse(res, staffExperience);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }
}

const insertStaffExperience = async (req, res) => {
  try {      
      const ExperienceToCreate = {
      EXPERIENCE_ID: req.body.experienceId,
      STAFF_ID: req.params.id, 
      PROJECT_ID: req.body.projectId
      };
      const connection = await db.connection(req);    
      const rowsAffected = await db.execute(connection, SQL.insertStaffExperience(ExperienceToCreate));
      util.successResponse(res, rowsAffected);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
}

const removeStaffExperience = async (req, res) => {
  try {      
      const ExperienceToDelete = {
        EXPERIENCE_ID: req.body.experienceId,
        STAFF_ID: req.params.id, 
        PROJECT_ID: req.body.projectId
      };
      const connection = await db.connection(req);
      const rowsAffected = await db.execute(connection, SQL.removeStaffExperience(ExperienceToDelete));
      util.successResponse(res, rowsAffected);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
}

const getStaffDetailsById = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const result = await db.execute(connection, SQL.getStaffDetailsById(req.params.id));
    let staffDetails = {};
    if (result && result.length) {
      staffDetails = result[0];
      staffDetails.STAFF_PHOTO = util.getThumbnailUrl(staffDetails.STAFF_PHOTO);
    }
    util.successResponse(res, staffDetails);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }  
}

const staffSearch = async (req, res) => {
  try {
    const connection = await db.connection(req);
    let condition = '';
    if (req.query && req.query.name) {
      condition = ` WHERE FIRST_NAME LIKE '%${req.query.name}%' OR PREFERRED_NAME LIKE '%${req.query.name}%'`;
    }
    // List staff based on user office access
    if (util.officeAccessRestricted(req.payload.ROLE)) {
      condition = `${condition} AND STAFF.OFFICE_ID IN (SELECT OFFICE_ID FROM USER_ACCESS WHERE USER_ID = ${req.payload.ID})`;
    }
    const result = await db.execute(connection, SQL.staffSearch(condition));
    let staffList = [];
    if (result && result.length > 0) {
      staffList = result.map((item) => {
        return {
          ...item,
          STAFF_PHOTO: util.getThumbnailUrl(item.STAFF_PHOTO)
        }
      });
    }
    util.successResponse(res, staffList);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }  
}

const staffAdvanceSearch = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const condition = searchFilter(req);
    let orderBy = '';
    if (req.body.sortByRole) {
      orderBy = 'ORDER BY STAFF_ROLE.ROLE_NAME, STAFF.FIRST_NAME';
    } else {
      orderBy = 'ORDER BY STAFF.FIRST_NAME';
    }
    const result = await db.execute(connection, SQL.staffSearch(condition, orderBy));
    let staffList = [];
    if (result && result.length > 0) {
      staffList = result.map((item) => {
        return {
          ...item,
          STAFF_PHOTO: util.getThumbnailUrl(item.STAFF_PHOTO)
        }
      });
    }
    util.successResponse(res, staffList);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }
}

const searchFilter = req => {
  const filter = req.body.filter;
  let condition = ' where 1 = 1 ';
  if (filter) {
    if (filter.staffId) {
      condition = `${condition} AND STAFF.STAFF_ID = ${filter.staffId}`
    } else {
      // check office
      if (filter.office) {
        condition = `${condition} AND STAFF.OFFICE_ID = ${filter.office}`
      }
      // check Role
      if (filter.roleId) {
        condition = `${condition} AND STAFF.STAFF_ROLE_ID = ${filter.roleId}`
      }
      // check same role
      if (filter.showAllRole !== null && filter.showAllRole !== undefined && !filter.showAllRole) {
        condition = `${condition} AND STAFF_ROLE_ID IN (SELECT PROJECT_ROLE_ID FROM 
          PLANNED_PROJECT_STAFF WHERE ID = ${filter.plannedProjectId})`;
      }
      // Check Same client
      if (filter.showAllClient !== null && filter.showAllClient !== undefined && !filter.showAllClient) {
        condition = `${condition} AND STAFF.STAFF_ID IN ( ${SQL.staffWithClient(filter.projectId)} )`;
      }
      // Check Availability
      if (filter.availability && filter.availability !== 'All') {
        if (filter.availability === 'Available') {
          condition = `${condition} AND STAFF.STAFF_ID IN ( ${SQL.staffAvailable(filter.startDate, filter.endDate)} )`;
        } else if (filter.availability === 'Gap') {
          condition = `${condition} AND STAFF.STAFF_ID IN ( ${SQL.staffGap(filter.startDate, filter.endDate)} )`;
        }      
      }
    }
  }
  // List staff based on user office access
  if (util.officeAccessRestricted(req.payload.ROLE)) {
    condition = `${condition} AND STAFF.OFFICE_ID IN (SELECT OFFICE_ID FROM USER_ACCESS WHERE USER_ID = ${req.payload.ID})`;
  }
  return condition;
}

const getStaffAllocation = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const staffProject = await db.execute(connection, SQL.getStaffProject(req.params.id));
    if (staffProject && staffProject.length) {
      for (let i = 0; i < staffProject.length; i++) {
        const project = staffProject[i];
        const calendar = await db.execute(connection,SQL.staffAllocationList(project.ID)); 
        staffProject[i].calendar = calendar;        
      }
    }
    util.successResponse(res, staffProject);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }  
}

const uploadImage = async (buffer, fileName) => {
  const aws = require('aws-sdk');
  aws.config.update({
    accessKeyId: config.AWS.accessKeyId,
    secretAccessKey: config.AWS.secretAccessKey,
    region: config.AWS.region
  });
  const s3 = new aws.S3();
  return s3.upload({
    Bucket: config.AWS.bucket,
    Key: fileName,
    Body: buffer,
    ACL: 'public-read'
   }).promise();
}

const insertStaffPhoto = async (req, res) => {
  try {
    const connection = await db.connection(req);
    // Get Staff ID and check is staff already have photo key
    const staffId = req.params.id;
    let key = '';
    const result = await db.execute(connection, SQL.getStaffPhoto(staffId));
    if (result && result.length > 0 && result[0].STAFF_PHOTO.length > 3) {
      key = result[0].STAFF_PHOTO;
    } else {
      // Generate new key if staff doesn't have
      const uuidv4 = require('uuid/v4');
      key = uuidv4();
      await db.execute(connection, SQL.insertStaffPhoto(staffId, key));
    }

    // Use sharp to get meta data and set file info
    const sharp = require('sharp');
    const orginalUrl = await uploadImage(req.file.buffer, `${key}/${CONST.ORGINAL}.${CONST.IMGEXTN}`);
    const buffer = await sharp(req.file.buffer).resize(80, 80).toBuffer();
    const thumbnailUrl = await uploadImage(buffer, `${key}/${CONST.THUMBNAIL}.${CONST.IMGEXTN}`);
    util.successResponse(res, { orginalUrl, thumbnailUrl, key });
  }
  catch (exception) {
    log.error(exception);
    util.errorResponse(res, exception);
  }
}

const getStaffPhoto = async (req, res) => {
  try {
    const connection = await db.connection(req);
    // Get Staff ID and check is staff already have photo key
    const staffId = req.params.id;
    let key = '';
    const result = await db.execute(connection, SQL.getStaffPhoto(staffId));
    if (result && result.length > 0 && result[0].STAFF_PHOTO.length > 3) {
      key = result[0].STAFF_PHOTO;
      util.successResponse(res, util.getThumbnailUrl(key));
    } else {
      util.errorResponse(res, "Photo doesnot exists");  
    }
  }
  catch (exception) {
    log.error(exception);
    util.errorResponse(res, exception);
  }
}


const filters = req => {
  const filter = req.body.filter;
  let filterCondition = " where 1 = 1 ";
  if (req.params.id) {
    filterCondition = `${filterCondition} AND STAFF.STAFF_ID = ${req.params.id}`;
  }
  if (filter) {    

    if (filter.office) {
      filterCondition = `${filterCondition} AND STAFF.OFFICE_ID IN (${filter.office.join(',')})`;
    }

    if (filter.role) {
      filterCondition = `${filterCondition} AND STAFF.STAFF_ROLE_ID IN (${filter.role.join(',')})`;
    }

    if (filter.status) {
      filterCondition = `${filterCondition} AND STAFF.STAFF_STATUS_ID IN (${filter.status.join(',')})`;
    }

    if (filter.staffStatus) {
      filterCondition = `${filterCondition} AND STAFF.STAFF_STATUS_ID IN (${filter.staffStatus.join(',')})`;
    }

    if (filter.group) {
      filterCondition = `${filterCondition} AND STAFF_GROUP_ID IN (${filter.group.join(',')})`;
    }
    
    if (filter.staffId) {
      filterCondition = `${filterCondition} AND STAFF.STAFF_ID = ${filter.staffId}`;
    }
  
    if (filter.alert) {
      if (filter.alert === 'Gap') {
        filterCondition = `${filterCondition} AND STAFF.STAFF_ID in (${SQL.staffListGap()})`;
      } else if (filter.alert === 'Alert') {
        filterCondition = `${filterCondition} AND STAFF.STAFF_ID in (${SQL.staffAlert()})`;
      } else if (filter.alert === 'Bench') {
        filterCondition = `${filterCondition} AND STAFF.STAFF_ID in (${SQL.staffOnBench()})`;
      }
    }
  }
  // List staff based on user office access
  if (util.officeAccessRestricted(req.payload.ROLE)) {
    filterCondition = `${filterCondition} AND STAFF.OFFICE_ID IN (SELECT OFFICE_ID FROM USER_ACCESS WHERE USER_ID = ${req.payload.ID})`;
  }
  return (filterCondition); 
}

module.exports = {
  staffAssignments,
  getStaffProjectList,
  staffList,
  assignmentList,
  insertStaff,
  updateStaff,
  getStaffCertification,
  insertStaffCertification,
  deleteStaffCertification,
  getStaffExperience,
  insertStaffExperience,
  removeStaffExperience,
  getStaffDetailsById,
  staffSearch,
  staffAdvanceSearch,
  getStaffAllocation,
  insertStaffPhoto,
  getStaffPhoto
}