'use strict'

const test = require('tape')
const { node } = require('fluture')
const { unlinkSync, writeFile } = require('fs')

const { write, read } = require(`${ROOT}/src/json.js`)

const testFile = `${ROOT}/test/scrap/test.json`
const invalidFile = `${ROOT}/test/scrap/invalid.json`

test('json', t => (
  t.plan(3),

  write( testFile, { yeah: 'ok' } )
  .chain( () => read(testFile) )
  .fork(
    t.fail,
    json => (
      t.equals( json.yeah, 'ok', 'write/read json ok' ),
      unlinkSync(testFile)
    )
  ),

  node(
    done =>
      writeFile( invalidFile, '][', done )
  )
  .chain( () => read(invalidFile) )
  .fork(
    err => (
      t.equals(err.name, 'SyntaxError', 'json parse error ok'),
      unlinkSync(invalidFile)
    ),
    t.fail
  ),

  write( '/BAD/PATH', {} )
  .fork(
    err =>
      t.equals(err.name, 'Error', 'bad path error ok'),
    t.fail
  )
) )
