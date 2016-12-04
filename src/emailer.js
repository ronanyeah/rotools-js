'use strict'

const Future     = require('fluture')
const nodemailer = require('nodemailer')

/*
 * Creates email transporter.
 * @param {string} senderEmail gmail address the email is being 'sent' from
 * @param {string} password
 *    google password, or app password if you have 2FA enabled
 *    (https://support.google.com/accounts/answer/185833)
 */
// String -> String -> Function
module.exports = (senderEmail, password) =>
  (
    transporter =>
      /*
       * Sends an email.
       * @param {string} recipient email address of recipient
       * @param {string} fromLabel name to show in the inbox
       * @param {string} subject subject line
       * @param {string} content email text
       */
      // String * 4 -> Future Err Res
      (recipient, fromLabel, subject, content) =>
        Future.node(
          done =>
            transporter.sendMail(
              {
                from: `"${ fromLabel }" <${ senderEmail }>`,
                to: recipient,
                subject: subject,
                text: content
              },
              done
          )
        )
  )
  (
    // https://nodemailer.com/2-0-0-beta/setup-smtp/
    nodemailer.createTransport(
      `smtps://${
        encodeURIComponent(senderEmail)
      }:${ password }@smtp.gmail.com`
    )
  )
