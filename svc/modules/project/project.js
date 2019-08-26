const db = require('../../common/connection');
const SQL = require('./query');
const util = require("../../common/util");

const getProjectList = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const projectList = await db.execute(connection, SQL.ProjectList(filters(req)));
    util.successResponse(res, projectList);
  }
  catch (exception) {
    util.errorResponse(res, exception);
  }  
}

const getOpenRoles = async (req, res) => {
  try { 
    const connection = await db.connection(req);
    const openRoles = await db.execute(connection, SQL.getOpenRoles(filters(req)));
    util.successResponse(res, openRoles);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}

const getProjectTeams = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const projectTeams = await db.execute(connection, SQL.getProjectTeams(filters(req)));
    util.successResponse(res, projectTeams);
  } catch (exception) {
    util.errorResponse(res,exception);
  }
}

const getProjectDetailById = async (req, res) => {
  try {
    const connection = await db.connection(req);
    const projectDetail = await db.execute(connection, SQL.getProjectDetailById(req.params.id));
    util.successResponse(res, projectDetail);
  } catch (exception) {
    util.errorResponse(res,exception);
  }
}

const insertProjectDetail = async (req, res) => {
  try {
    const projectDefault = {
      PROJECT_NAME: '',
      PROJECT_NO: null,
      PROJECT_ROM: 0,
      PROJECT_ADDRESS: '',
      PROJECT_COUNTRY: '',
      PROJECT_CITY: '',
      PROJECT_STATE: '',
      PROJECT_ZIP: '',
      CUSTOMER_ID: null,
      START_DATE: new Date().toISOString(),
      END_DATE: new Date().toISOString(),
      PROJECT_STATUS_ID: null,
      PROJECT_TYPE_ID: null,
      OFFICE_ID: null,
      CATEGORY_ID: null,
      PROJECT_DESCRIPTION: '',
      GROUP_ID: null,
      TIMELINE_TYPE_ID: null
    };
    const projectDetails = req.body;
    const connection = await db.connection(req);
    const CustomerContact = await processCustomerContact(projectDetails, connection);
    const projectToCreate = Object.assign(projectDefault, projectDetails, CustomerContact);
    const rowsAffected = await db.execute(connection, SQL.insertProjectDetail(projectToCreate));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
    util.errorResponse(res, exception);
  }
}

const createCusomerContact = async (projectDetails, CUSTOMER_ID, connection) => {
  let CONTACT_ID = null;
  if (projectDetails.CONTACT_NAME !== '') {
    const rowsAffected = await db.execute(connection, SQL.insertContact(projectDetails.CONTACT_NAME));
    CONTACT_ID = rowsAffected.insertId;
    await db.execute(connection, SQL.insertCustomerContact(CUSTOMER_ID, CONTACT_ID));
  }
  return CONTACT_ID;
}

const processCustomerContact = async (projectDetails, connection) => {
  let CUSTOMER_ID = null;
  let CONTACT_ID = null;
  if (projectDetails.CUSTOMER_ID !== null) {
    CUSTOMER_ID = projectDetails.CUSTOMER_ID;
    if (projectDetails.CONTACT_ID !== null) {
      CONTACT_ID = projectDetails.CONTACT_ID;
    } else {
      CONTACT_ID = await createCusomerContact(projectDetails, CUSTOMER_ID, connection);
    }
  } else if (projectDetails.CUSTOMER_NAME !== '') {
    const rowsAffected = await db.execute(connection, SQL.insertCustomer(projectDetails.CUSTOMER_NAME));
    CUSTOMER_ID = rowsAffected.insertId;
    CONTACT_ID = await createCusomerContact(projectDetails, CUSTOMER_ID, connection);
  }
  return { CUSTOMER_ID, CONTACT_ID }
};

const updateProjectDetail = async (req, res) => {
  try {
    const projectDetails = req.body;    
    const connection = await db.connection(req);
    const result = await db.execute(connection, SQL.projectDetailsById(req.params.id));
    let detailsToUpdate = {};
    if (result && result.length > 0) {
      detailsToUpdate = result[0];
    }
    // const CustomerContact = await processCustomerContact(projectDetails, connection);
    const projectToUpdate = Object.assign(detailsToUpdate, projectDetails);
    const rowsAffected = await db.execute(connection, SQL.updateProjectDetail(projectToUpdate, req.params.id));
    util.successResponse(res, rowsAffected);
  } catch (exception) {
      util.errorResponse(res, exception);
  }
}

const filters = req => {
  const filter = req.body.filter;
  let filterCondition = " where 1 = 1 ";
  if (req.params.id) {
    filterCondition = `${filterCondition} AND PROJECT.PROJECT_ID = ${req.params.id}`;
  }
  if (filter) {
    if (filter.status) {
      filterCondition = `${filterCondition} AND PROJECT_STATUS.STATUS_ID IN (${filter.status.join(',')})`;
    }    
    
    if (filter.startBetween && filter.endBetween) {
      filterCondition = `${filterCondition} AND PROJECT.START_DATE BETWEEN '${filter.startBetween}' AND '${filter.endBetween}'`;
    }

    if (filter.StartIn) {
      filterCondition = `${filterCondition} AND PROJECT.START_DATE >= NOW() and PROJECT.START_DATE <=  DATE_ADD(NOW(), INTERVAL 90 DAY)`
    }

    if (filter.EndIn) {
      filterCondition = `${filterCondition} AND PROJECT.END_DATE >= NOW() and PROJECT.END_DATE <=  DATE_ADD(NOW(), INTERVAL 90 DAY)`
    }

    if (filter.startDate) {
      filterCondition = `${filterCondition} AND PROJECT.START_DATE >= '${filter.startDate}'`;  
    }
  
    if (filter.endDate) {
      filterCondition = `${filterCondition} AND PROJECT.END_DATE <= '${filter.endDate}'`;
    }    
  
    if (filter.office) {
      filterCondition = `${filterCondition} AND PROJECT.OFFICE_ID = ${filter.office}`;
    }

    if (filter.projectId) {
      filterCondition = `${filterCondition} AND PROJECT.PROJECT_ID = ${filter.projectId}`;
    }
  }
  return (filterCondition); 
}

module.exports = {
  getProjectList,
  getOpenRoles,
  getProjectTeams,
  getProjectDetailById,
  insertProjectDetail,
  updateProjectDetail
}