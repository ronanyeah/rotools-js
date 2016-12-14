'use strict'

const futch = require(`${ROOT}/src/futch.js`)

const test            = require('tape')
const { fromPromise } = require('fluture')

const toJson = res =>
  fromPromise( () => res.json(), 0 )

test('futch test', t => (
  t.plan(1),

  futch('https://jsonplaceholder.typicode.com/posts/1')
  .chain( toJson )
  .fork(
    t.fail,
    res =>
      t.ok(res, 'json fetch and parse success')
  )
) )

test('futch errors', t => (
  t.plan(2),

  futch('https://www.google.com')
  .chain( toJson )
  .fork(
    err =>
      t.equals(err.name, 'SyntaxError', 'json parse error thrown correctly'),
    t.fail
  ),

  futch('https://not.a.website')
  .fork(
    err =>
      t.equals(err.name, 'FetchError', 'incorrect url error thrown'),
    t.fail
  )
) )
