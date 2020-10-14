const office = require('./office');
const authenticate = require('../auth/authenticate');
const CONST = require('../../common/const');
const MODULE = 'office';

module.exports = (app) => {
    app.put(
        `/${CONST.API}/${MODULE}/details`,
        authenticate.isAuthenticated,
        office.insertOfficeDetail
    );
    app.post(
        `/${CONST.API}/${MODULE}/list`,
        authenticate.isAuthenticated,
        office.getOfficeList
    );
    app.post(
        `/${CONST.API}/${MODULE}/list-count`,
        authenticate.isAuthenticated,
        office.getOfficeListCount
    );
    app.get(
        `/${CONST.API}/${MODULE}/:id/details`,
        authenticate.isAuthenticated,
        office.getOfficeDetailById
    );
    app.post(
        `/${CONST.API}/${MODULE}/:id/details`,
        authenticate.isAuthenticated,
        office.updateOfficeDetail
    );
    app.delete(
        `/${CONST.API}/${MODULE}/:id`,
        authenticate.isAuthenticated,
        office.deleteOfficeById
    );
};
