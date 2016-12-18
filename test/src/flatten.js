'use strict'

const test = require('tape')

const flatten = require(`${ROOT}/src/flatten.js`)

test('flatten', t => (
  t.plan(1),

  t.deepEquals(
    flatten(['one', ['two', ['three']]]),
    ['one', 'two', 'three']
  )
) )
