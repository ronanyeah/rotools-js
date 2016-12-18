'use strict'

const test = require('tape')
const { map, drop } = require('ramda')
const { removeSync, ensureFileSync, ensureDirSync } = require('fs-extra')

const fileMapper = require(`${ROOT}/src/fileMapper.js`)

const testDirectory = `${ROOT}/test/scrap/map`

const files = [
  '/one/a.txt',
  '/one/two/b.txt',
  '/one/two/three/c.txt'
]

test('fileMapper', t => (
  t.plan(1),

  ensureDirSync(testDirectory),

  files.forEach(
    file =>
      ensureFileSync(testDirectory + file)
  ),

  t.deepEquals(
    map(
      drop(testDirectory.length),
      fileMapper(testDirectory)
    ),
    files,
    'files are being mapped correctly'
  ),

  removeSync(testDirectory)
) )
