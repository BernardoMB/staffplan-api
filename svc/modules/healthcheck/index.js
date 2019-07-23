const util = require('../../common/util');
const config = require('../../common/config');
const CONST = require('../../common/const');

const MODULE = 'healthcheck';

module.exports = (app) => {
  app.get(`/${CONST.API}/${MODULE}/`, async (req, res) => {
    try {
      const status = {
        status: "OK",
        company: config.COMPANY_NAME,
        env: config.ENVIRONMENT_NAME,
        version: app.version,
        uptime: process.uptime(),
        domain_check: config.DOMAINCHECK
      };
      util.successResponse(res, status);
    } catch (exception) {
      util.errorResponse(res, exception);
    }
  });
}
