'use strict'

const test = require('tape')
const nock = require('nock')

const getCurrentIp = require(`${ROOT}/src/getCurrentIp.js`)

nock('https://ipinfo.io')
.get('/json')
.reply(
  200,
  {
    ip: '2.220.220.220'
  }
)

nock('https://ipinfo.io')
.get('/json')
.reply(
  200,
  {
    ip: 'bad_ip'
  }
)

test('getCurrentIp', t => (
  t.plan(2),

  getCurrentIp
  .fork(
    t.fail,
    t.ok
  ),

  getCurrentIp
  .fork(
    t.ok,
    t.fail
  )
) )
