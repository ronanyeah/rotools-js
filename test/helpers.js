'use strict'

const test = require('tape')

const { ipValidator } = require(`${ROOT}/src/helpers.js`)

test('ip validation test', t => (
  t.plan(2),
  t.ok(ipValidator('192.168.0.1')),
  t.notOk(ipValidator('bad_ip_address'))
) )
