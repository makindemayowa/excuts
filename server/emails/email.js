const ejs = require('ejs');

const Mailgun = require('machinepack-mailgun');

const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN_NAME;
const senderMail = process.env.MAILGUN_SENDERS_EMAIL;
const senderName = process.env.MAILGUN_SENDERS_NAME;

const verifyAccountHtml = require('./templates/verify_account').content;
const resetPasswordHtml = require('./templates/reset_password').content;
const newInterestHtml = require('./templates/new_interest').content;
const newDateRequestHtml = require('./templates/new_date_request').content;
const dateRequestStatusHtml = require(
  './templates/date_request_status').content;

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
  sendNewInterestMail(email, eventName) {
    const interestHtml = ejs.render(newInterestHtml, {
      eventName
    });
    const subject = 'eXcuts interest notifications';
    sendMail(email, subject, interestHtml);
  },
  sendNewDateRequestMail(email, venue) {
    const newDateHtml = ejs.render(newDateRequestHtml, {
      venue
    });
    const subject = 'eXcuts date notification';
    sendMail(email, subject, newDateHtml);
  },
  sendNewDateStatusMail(email, venue, status) {
    const dateStatusHtml = ejs.render(dateRequestStatusHtml, {
      venue, status
    });
    const subject = 'eXcuts date status';
    sendMail(email, subject, dateStatusHtml);
  },
};
