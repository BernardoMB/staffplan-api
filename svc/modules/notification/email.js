const sgMail = require('@sendgrid/mail');

const send = (API_KEY, message) => {
  sgMail.setApiKey(API_KEY);
  sgMail.send(message);
}

module.exports = {
  send
}


