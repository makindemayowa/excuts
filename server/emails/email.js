const ejs = require('ejs');

const Mailgun = require('machinepack-mailgun');

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN_NAME;
const senderMail = process.env.MAILGUN_SENDERS_EMAIL;
const senderName = process.env.MAILGUN_SENDERS_NAME;

const verifyAccountHtml = require('./templates/verify_account').content;
const resetPasswordHtml = require('./templates/reset_password').content;

const sendMail = (toEmail, subject, htmlContent) => {
  Mailgun.sendHtmlEmail({
    apiKey,
    domain,
    toEmail,
    subject,
    htmlMessage: htmlContent,
    fromEmail: senderMail,
    fromName: senderName
  }).exec({
    // An unexpected error occurred.
    error(err) {
      return err;
    },
    // OK.
    success() {
      return 'success';
    }
  });
};

module.exports = {
  sendVerificationMail: (email, link) => {
    const verficationHtml = ejs.render(verifyAccountHtml, {
      link
    });
    const subject = 'eXcuts Email Verification';
    sendMail(email, subject, verficationHtml);
  },
  sendPasswordRecoveryMail(email, link) {
    const resetHtml = ejs.render(resetPasswordHtml, {
      link
    });
    const subject = 'eXcuts password reset instructions';
    sendMail(email, subject, resetHtml);
  },
};

