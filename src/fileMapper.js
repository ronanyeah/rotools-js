'use strict'

const { resolve }               = require('path')
const { map }                   = require('ramda')
const { pipe }                  = require('sanctuary')
const { statSync, readdirSync } = require('fs')

const flatten = require(resolve(`${__dirname}/../src/flatten.js`))

// Walks through directories and files, nesting arrays to represent
// file hierarchy.
// String -> [String|Array]
const walk = dir =>
  map(
    pipe([
      file =>
        `${dir}/${file}`,
      path =>
        statSync(path).isDirectory()
          ? walk(path)
          : path
    ]),
    readdirSync(dir)
  )

// String -> [String]
module.exports = pipe([
  walk,
  flatten
])
