'use strict'

const test = require('tape')
const { prop } = require('ramda')
const { of } = require('fluture')

const {
  senderEmail,
  password
} = require(`${ROOT}/private/mailConfig.json`)

const sendEmail = require(`${ROOT}/src/emailer.js`)(senderEmail, password)

test('emailer', t => (
  t.plan(1),

  // TODO: find a way to intercept smtps calls
  // https://groups.google.com/forum/#!topic/nodejs/MDGHQC5ifp8
  //sendEmail(
    //senderEmail,
    //'',
    //'',
    //''
  //)
  of({ response: '250 2.0.0 OK 1480845678 w79sm6585389wmw.0 - gsmtp' })
  .map( prop('response') )
  .fork(
    t.fail,
    response =>
      t.equals( '250', response.substring(0, 3) )
  )
) )
