const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const staffAssignments = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const staffAssignments = await db.execute(connection, SQL.staffAssignments(filters(req)));
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

const getMonthwiseAllocation = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const AllocationList = await db.execute(connection, SQL.getMonthwiseAllocation());
    util.successResponse(res, AllocationList);
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
    const staffInfo = req.body.staff;
    const staffToCreate = Object.assign(staffDefault, staffInfo);
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.insertStaff(staffToCreate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}

const updateStaff = async (req, res) => {
  try {
    const staff = req.body.staff;    
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
      const CertificateToCreate = {
      STAFF_ID: req.params.id, 
      CERTIFICATION_ID: req.body.staff.certificationID
      };
      const connection = await db.connection(req);
      const rowsAffected = await db.execute(connection, SQL.insertStaffCertification(CertificateToCreate));
      util.successResponse(res, rowsAffected);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
}

const deleteStaffCertification = async (req, res) => {
  try {      
      const CertificateToDelete = {
      STAFF_ID: req.params.id, 
      CERTIFICATION_ID: req.body.staff.certificationID
    };
      const connection = await db.connection(req);
      const rowsAffected = await db.execute(connection, SQL.deleteStaffCertification(CertificateToDelete));
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
      EXPERIENCE_ID: req.body.staff.experienceID,
      STAFF_ID: req.params.id, 
      PROJECT_ID: req.body.staff.projectID
      };
      const connection = await db.connection(req);    
      const rowsAffected = await db.execute(connection, SQL.insertStaffExperience(ExperienceToCreate));
      util.successResponse(res, rowsAffected);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
}

const deleteStaffExperience = async (req, res) => {
  try {      
      const ExperienceToDelete = {
      EXPERIENCE_ID: req.body.staff.experienceID,
      STAFF_ID: req.params.id, 
      PROJECT_ID: req.body.staff.projectID
      };
      const connection = await db.connection(req);
      const rowsAffected = await db.execute(connection, SQL.deleteStaffExperience(ExperienceToDelete));
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
      condition = ` WHERE FIRST_NAME LIKE '%${req.query.name}%'`;
    }
    const staffList = await db.execute(connection, SQL.staffSearch(condition));
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
    const staffList = await db.execute(connection, SQL.staffSearch(condition));
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
      condition = `${condition} AND STAFF_ID = ${filter.staffId}`
    } else {
      // check office
      if (filter.office) {
        condition = `${condition} AND OFFICE_ID = ${filter.office}`
      }
      // check same role
      if (!filter.showAllRole) {
        condition = `${condition} AND STAFF_ROLE_ID IN (SELECT PROJECT_ROLE_ID FROM 
          PLANNED_PROJECT_STAFF WHERE ID = ${filter.plannedProjectId})`;
      }
      // Check Same client
      if (!filter.showAllClient) {
        condition = `${condition} AND STAFF_ID IN ( ${SQL.staffWithClient(filter.projectId)} )`;
      }
      // Check Availability
      if (filter.availability !== 'All') {
        if (filter.availability === 'Available') {
          condition = `${condition} AND STAFF_ID IN ( ${SQL.staffAvailable(filter.startDate, filter.endDate)} )`;
        } else if (filter.availability === 'Gap') {
          condition = `${condition} AND STAFF_ID IN ( ${SQL.staffGap(filter.startDate, filter.endDate)} )`;
        }
      }
    }
  }
  return condition;
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

    if (filter.group) {
      filterCondition = `${filterCondition} AND STAFF_GROUP_ID IN (${filter.group.join(',')})`;
    }
    
    if (filter.staffId) {
      filterCondition = `${filterCondition} AND STAFF.STAFF_ID = ${filter.staffId}`;
    }
  }
  return (filterCondition); 
}

module.exports = {
  staffAssignments,
  getStaffProjectList,
  getMonthwiseAllocation,
  staffList,
  insertStaff,
  updateStaff,
  getStaffCertification,
  insertStaffCertification,
  deleteStaffCertification,
  getStaffExperience,
  insertStaffExperience,
  deleteStaffExperience,
  getStaffDetailsById,
  staffSearch,
  staffAdvanceSearch
}