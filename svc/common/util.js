module.exports = {
  errorResponse: (res, message = "Something went wrong", status = 500) => {
    res.status(status).json({ error: true, message });
  }, 
  successResponse: (res, data = {}) => {
    res.status(200).json(data);
  },
  failureResponse: (res, errorCode = 'EC_UNKNOWN') => {
    res.status(200).json({
      errorCode
    });
  }
};
