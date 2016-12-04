'use strict'

const test = require('tape')
const Future = require('fluture')

const {
  senderEmail,
  password
} = require(`${ROOT}/private/mailConfig.json`)

const sendEmail = require(`${ROOT}/src/emailer.js`)(senderEmail, password)

test('emailer test', t => (
  t.plan(1),

  //sendEmail(
    //senderEmail,
    //'',
    //'',
    //''
  //)
  //.map( prop('response') )
  Future.of('250 2.0.0 OK 1480845678 w79sm6585389wmw.0 - gsmtp')
  .map(
    response =>
      t.equals( '250', response.substring(0, 3) )
  )
  .fork(
    t.fail,
    console.log
  )
) )
