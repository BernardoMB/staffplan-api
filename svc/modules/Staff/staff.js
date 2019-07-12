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
  staffList
}