'use strict'

const test                  = require('tape')
const { node }              = require('fluture')
const { unlinkSync, writeFile } = require('fs')

const { write, read } = require(`${ROOT}/src/json.js`)

const testFile = `${ROOT}/test/scrap/test.json`
const invalidFile = `${ROOT}/test/scrap/invalid.json`

test('json write/read', t => (
  t.plan(1),

  write( testFile, { prop: 1 } )
  .chain( () => read(testFile) )
  .map( json => t.equals( json.prop, 1, 'write/read json success' ) )
  .fork( () => unlinkSync(testFile), () => unlinkSync(testFile) )
) )

test('json parse errors', t => (
  t.plan(2),

  node(
    done =>
      writeFile( invalidFile, '][', done )
  )
  .chain( () => read(invalidFile) )
  .fork(
    () => (
      t.pass('json parse error threw'),
      unlinkSync(invalidFile)
    ),
    () => unlinkSync(invalidFile)
  ),

  write( '/BAD/PATH', {} )
  .fork(
    () => t.pass('bad path error threw'),
    t.fail
  )
) )
