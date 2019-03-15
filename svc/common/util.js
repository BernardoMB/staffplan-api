module.exports = {
  errorResponse: (res, message = "Something went wrong") => {
    console.log('error Response');
    res.send({
      error: true,
      status: "failed",
      message: message
    });
  }, 
  successResponse: (res, data) => {
    res.send({
      error: false,
      status: 'Success',
      data
    });
  }
}