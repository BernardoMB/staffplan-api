const db = require('../../common/connection');
const SQL = require('./query');
const util = require('../../common/util');

const getOfficeList = async (req, res) => {
    try {
        const connection = await db.connection(req);
        const projectList = await db.execute(
            connection,
            SQL.OfficeList(filters(req))
        );
        util.successResponse(res, projectList);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
};

const getOfficeListCount = async (req, res) => {
    try {
        const connection = await db.connection(req);
        const projectList = await db.execute(
            connection,
            SQL.getQueryCount(SQL.OfficeList(filters(req)))
        );
        util.successResponse(res, projectList[0]);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
};

const getOfficeDetailById = async (req, res) => {
    try {
        const connection = await db.connection(req);
        const officeDetail = await db.execute(
            connection,
            SQL.getOfficeDetailById(req.params.id)
        );
        util.successResponse(res, officeDetail);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
};

const insertOfficeDetail = async (req, res) => {
    try {
        const officeDefault = {
            OFFICE_NAME: '',
            OFFICE_ADDRESS: '',
            OFFICE_CITY: '',
            OFFICE_STATE: '',
            OFFICE_ZIP: '',
            OFFICE_TYPE: null,
            REGION_ID: 1
        };
        const officeDetails = req.body;
        const connection = await db.connection(req);
        const officeToCreate = Object.assign(
            officeDefault,
            util.cleanObject(officeDetails)
        );
        const rowsAffected = await db.execute(
            connection,
            SQL.insertOfficeDetail(officeToCreate)
        );
        util.successResponse(res, rowsAffected);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
};

const updateOfficeDetail = async (req, res) => {
    try {
        const officeDetails = req.body;
        const connection = await db.connection(req);
        const result = await db.execute(
            connection,
            SQL.officeDetailsById(req.params.id)
        );
        let detailsToUpdate = {};
        if (result && result.length > 0) {
            detailsToUpdate = result[0];
        }
        const officeToUpdate = Object.assign(
            detailsToUpdate,
            util.cleanObject(officeDetails)
        );
        const rowsAffected = await db.execute(
            connection,
            SQL.updateOfficeDetail(officeToUpdate, req.params.id)
        );
        util.successResponse(res, rowsAffected);
    } catch (exception) {
        util.errorResponse(res, exception);
    }
};

const filters = (req) => {
    const filter = req.body.filter;
    let filterCondition = ' where 1 = 1 ';
    if (req.params.id) {
        filterCondition = `${filterCondition} AND OFFICE.OFFICE_ID = ${req.params.id}`;
    }
    if (filter) {
        // TODO: Implement office filters
        console.log(filter);
    }
    return filterCondition;
};

module.exports = {
    getOfficeList,
    getOfficeListCount,
    getOfficeDetailById,
    insertOfficeDetail,
    updateOfficeDetail
};
