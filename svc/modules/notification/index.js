const email = require('./email');

const passwordReset = (emailId, name, resetId, hostname) => {
  email.send(emailId, name, resetId, hostname);
}
module.exports = {
  passwordReset
}
