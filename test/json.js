'use strict'

const test                  = require('tape')
const { node }              = require('fluture')
const { unlink, writeFile } = require('fs')

const { write, read } = require(`${ROOT}/src/json.js`)

const testFile = `${ROOT}/scrap/test.json`
const invalidFile = `${ROOT}/scrap/invalid.json`

const deleteFile = path => () => unlink(path)

test('json test', t => (
  t.plan(1),

  write( testFile, { prop: 1 } )
  .chain( () => read(testFile) )
  .map( json => t.equals( json.prop, 1, 'write/read json success' ) )
  .fork( deleteFile(testFile), deleteFile(testFile) )
) )

test('json errors', t => (
  t.plan(2),

  node(
    done =>
      writeFile( invalidFile, '][', done )
  )
  .chain( () => read(invalidFile) )
  .map( () => t.fail( 'invalid json did not throw' ) )
  .mapRej( () => t.pass('json parsing error threw') )
  .fork( deleteFile(invalidFile), deleteFile(invalidFile) ),

  write( '/BAD/PATH', {} )
  .fork(
    () => t.pass('bad path error threw'),
    () => t.fail( 'bad path did not throw' )
  )
) )
