'use strict'

const test = require('tape')
const exec = require(`${ROOT}/src/exec.js`)

test('exec', t => (
  t.plan(2),

  exec('ls')
  .fork(
    t.fail,
    output =>
      t.equals(typeof output, 'string', 'exec ls ok')
  ),

  exec('---------')
  .fork(
    err =>
      t.ok(err, 'exec fail ok'),
    t.fail
  )

) )

