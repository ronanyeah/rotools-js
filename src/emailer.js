'use strict'

const { node }   = require('fluture')
const nodemailer = require('nodemailer')

/**
 * Uses Gmail email and password to create a mail transporter.
 * @alias emailer
 * @param {string} senderEmail Your Gmail address.
 * @param {string} password Your Gmail password, or app password if you have 2FA enabled (https://support.google.com/accounts/answer/185833).
 * @returns {emailer.sendEmail}
 * @example const sendEmail = emailer('mario@toad.com', 'hunter2')
 *
 * sendEmail('luigi@toad.com', 'Mario', 'RE: Koopas', 'Big Problem')
 * .fork( err, object )
 */
module.exports = (senderEmail, password) =>
  (
    transporter =>
      /**
       * Returned from `emailer`. Sends an email.
       * @alias emailer.sendEmail
       * @param {string} recipient The email address of intended recipient.
       * @param {string} fromLabel The label to show in the inbox.
       * @param {string} [subject=''] Subject line text.
       * @param {string} [content=''] Email body.
       * @returns Future< err, object >
       * @example sendEmail('luigi@toad.com', 'Mario', 'RE: Koopas', 'Big Problem')
       * .fork( err, object )
       */
      (recipient, fromLabel, subject = '', content = '') =>
        node(
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
  )(
    // https://nodemailer.com/2-0-0-beta/setup-smtp/
    nodemailer.createTransport(
      `smtps://${
        encodeURIComponent(senderEmail)
      }:${ password }@smtp.gmail.com`
    )
  )
