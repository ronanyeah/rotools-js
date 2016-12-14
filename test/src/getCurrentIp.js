'use strict'

const test = require('tape')

const getCurrentIp = require(`${ROOT}/src/getCurrentIp.js`)

test('getCurrentIp', t => (
  t.plan(1),
  getCurrentIp
  .fork(
    t.fail,
    t.ok
  )
) )
