'use strict'

const test = require('tape')
const nock = require('nock')

const futchJson = require(`${ROOT}/src/futchJson.js`)

nock('https://test.com')
.get('/json')
.reply(
  200,
  {
    yeah: 'ok'
  }
)

nock('https://test.com')
.get('/bad_json')
.reply(
  200,
  ']['
)

test('futchJson', t => (
  t.plan(2),

  futchJson('https://test.com/json')
  .fork(
    t.fail,
    res =>
      t.equals(res.yeah, 'ok', 'json fetch and parse ok')
  ),

  futchJson('https://test.com/bad_json')
  .fork(
    err =>
      t.equals(err.name, 'SyntaxError', 'json parse error thrown ok'),
    t.fail
  )

) )
