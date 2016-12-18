'use strict'

const test = require('tape')
const nock = require('nock')
const { fromPromise } = require('fluture')

const futch = require(`${ROOT}/src/futch.js`)

nock('https://test.com')
.put('/ok')
.reply(
  200,
  'ok'
)

test('futch', t => (
  t.plan(2),

  futch(
    'https://test.com/ok',
    { method: 'PUT' }
  )
  .chain(
    res =>
      fromPromise(
        () => res.text(),
        0
      )
  )
  .fork(
    t.fail,
    res =>
      t.equals(res, 'ok', 'fetch with options ok')
  ),

  futch('https://NOT_A_WEBSITE')
  .fork(
    err =>
      t.equals(err.name, 'FetchError', 'FetchError thrown ok'),
    t.fail
  )
) )
