'use strict'

const test = require('tape')
const input = require(`${ROOT}/src/input.js`)
const stdin  = require('mock-stdin').stdin()

const isEven = x => Number(x) % 2 === 0

test('input', t => (
  t.plan(1),

  input( isEven )
  .fork(
    t.fail,
    res =>
      t.equals(res, '2')
  ),

  stdin.send('3\n'),
  stdin.send('5\n'),
  stdin.send('2\n')

) )
