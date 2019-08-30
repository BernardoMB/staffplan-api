const error = require('./error');
const log = require('./logger');

module.exports = {
  errorResponse: (res, message = "Something went wrong", status = 500) => {
    log.error(message);
    res.status(status).json({ error: true, message });
  }, 
  successResponse: (res, data = {}) => {
    res.status(200).json(data);
  },
  failureResponse: (res, errorCode = error.EC_UNKNOWN) => {
    res.status(200).json({
      errorCode
    });
  },
  officeAccessRestricted : (role) => (role && role === 'REGIONAL')
};
