const config = require('../../common/config');
const log = require('../../common/logger');

const send = (emailId, name, resetId, hostname) => {
  var fs = require('fs');
  fs.readFile(`${__dirname}/resetTemplate.txt`, 'utf8', (err, contents) => {
    if (!err) {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(config.SENDGRID_API_KEY);
      const msg = {
        to: emailId,
        from: 'automated@staffplan.io',
        subject: 'StaffPlan Password Reset',
        Body: 'html',
        html: contents.replace('{FirstName}', name).replace('{ExpirationTime}', `${config.RESET_EXPIRY_IN_HOUR} hrs`).replace(/{ResetPasswordUrl}/g, `${hostname}/reset/${resetId}`)
      };
      sgMail.send(msg);
      log.info('password reset email send');
    } else {
      log.error(err);
    }
  });
};

module.exports = {
  send
};




