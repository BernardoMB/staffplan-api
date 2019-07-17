const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const staffAssignments = async (req, res) => {
  try {
    const connection = await db.connection(req);
    console.log(SQL.staffAssignments(filters(req)));
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
    console.log(SQL.staffList(filters(req)));
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
      STAFF_CERTIFICATION: 'N',
      STAFF_TRAINING: 'N',
      STAFF_ROLE_ID: null,
      STAFF_GROUP_ID: null,
      STAFF_STATUS_ID: null,
      OFFICE_ID: null,
      EMPLOYMENT_START_DATE: null
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

const customerList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const customerList = await db.execute(connection, SQL.customerList(customerFilters(req)));
    util.successResponse(res, customerList);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }  
}

const insertCustomer = async (req, res) => {  
  try {
    const customerDefault = {
      CUSTOMER_NAME: '',
      CUSTOMER_ADDRESS: '',
      CUSTOMER_CITY: '',
      CUSTOMER_STATE: '',
      CUSTOMER_ZIP: '',
      CUSTOMER_CONTACT: '',
      CONTACT_PHONE: null
    };
    const customerInfo = req.body.customer;
    const customerToCreate = Object.assign(customerDefault, customerInfo);
    const connection = await db.connection(req);
    const rowsAffected = await db.execute(connection, SQL.insertCustomer(customerToCreate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}

const updateCustomer = async (req, res) => {
  try {
    const customer = req.body.customer;    
    const connection = await db.connection(req);
    const result = await db.execute(connection, SQL.getCustomerInfo(req.params.id));
    let detailsToUpdate = {};
    if (result && result.length > 0) {
      detailsToUpdate = result[0];
    }
    const customerToUpdate = Object.assign(detailsToUpdate, customer);
    const rowsAffected = await db.execute(connection, SQL.updateCustomer(req.params.id, customerToUpdate));
    util.successResponse(res, rowsAffected);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
}

const addCustomerProject = async (req, res) => {
  try {      
      const CustomerProject = {
        CUSTOMER_ID: req.params.id, 
        PROJECT_ID: req.body.customerproject.projectID
      };
      const connection = await db.connection(req);    
      const rowsAffected = await db.execute(connection, SQL.addCustomerProject(CustomerProject));
      util.successResponse(res, rowsAffected);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
}

const removeCustomerProject = async (req, res) => {
  try {      
      const CustomerProject = {
        CUSTOMER_ID: req.params.id, 
        PROJECT_ID: req.body.customerproject.projectID
      };
      const connection = await db.connection(req);
      const rowsAffected = await db.execute(connection, SQL.removeCustomerProject(CustomerProject));
      util.successResponse(res, rowsAffected);
    } catch (exception) {
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

    if (filter.group) {
      filterCondition = `${filterCondition} AND STAFF_GROUP_ID IN (${filter.group.join(',')})`;
    }
    
    if (filter.staffId) {
      filterCondition = `${filterCondition} AND STAFF.STAFF_ID = ${filter.staffId}`;
    }
  }
  return (filterCondition); 
}

const customerFilters = req => {
  const customerFilters = req.body.filter;
  let filterCondition = " where 1 = 1 ";

  if (req.params.id) {
    filterCondition = `${filterCondition} AND CUSTOMER.CUSTOMER_ID = ${req.params.id}`;
  }
  if (customerFilters.name) { 
      filterCondition = `${filterCondition} AND CUSTOMER.CUSTOMER_NAME = '${customerFilters.name}'`;  
    }

    if (customerFilters.address) {
      filterCondition = `${filterCondition} AND CUSTOMER.CUSTOMER_ADDRESS = '${customerFilters.address}'`; 
    }

    if (customerFilters.city) { 
      filterCondition = `${filterCondition} AND CUSTOMER.CUSTOMER_CITY = '${customerFilters.city}'`;  
    }

    if (customerFilters.state) {
      filterCondition = `${filterCondition} AND CUSTOMER.CUSTOMER_STATE = '${customerFilters.state}'`; 
    }

    if (customerFilters.zip) {
      filterCondition = `${filterCondition} AND CUSTOMER.CUSTOMER_ZIP = '${customerFilters.zip}'`; 
    }

    if (customerFilters.contact) { 
      filterCondition = `${filterCondition} AND CUSTOMER.CUSTOMER_CONTACT = '${customerFilters.contact}'`;  
    }

    if (customerFilters.phone) {
      filterCondition = `${filterCondition} AND CUSTOMER.CONTACT_PHONE = '${customerFilters.phone}'`; 
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
  insertStaffCertification,
  deleteStaffCertification,
  insertStaffExperience,
  deleteStaffExperience,
  customerList,
  insertCustomer,
  updateCustomer,
  addCustomerProject,
  removeCustomerProject
}