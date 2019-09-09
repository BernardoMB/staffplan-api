const email = require('./email');

const passwordReset = (emailId, name, resetId, hostname, isNewUser = false) => {
  email.send(emailId, name, resetId, hostname, isNewUser);
}
module.exports = {
  passwordReset
}
