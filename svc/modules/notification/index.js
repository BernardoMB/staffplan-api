const email = require('./email');
const config = require('../../common/config');

const passwordReset = (userName, resetId, hostname) => {
  const msg = {
    to: userName,
    from: config.FROM_EMAIL,
    subject: 'Please reset your password',
    html: `
    <h4>
      Hey, we heard you lost your StaffPlan password.
      Use the following link within the next ${config.RESET_EXPIRY_IN_HOUR} hours to reset your password:
    </h4>
    <a href='http://${hostname}/resetpassword?${resetId}'> Reset your password </a>
    `
  };
  email.send(config.SENDGRID_API_KEY, msg);
}
module.exports = {
  passwordReset
}
