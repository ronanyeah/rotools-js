'use strict'

const fs                      = require('fs')
const { pipe }                = require('sanctuary')
const { curry }               = require('ramda')
const { node, encase, chain } = require('fluture')

// String -> Future Err JSON
const read =
  pipe([
    path =>
      node(
        done =>
          fs.readFile( path, 'utf8', done )
      ),
    chain(encase(JSON.parse))
  ])

// String -> JSON -> Future Err _
const write = curry(
  (path, json) =>
    node(
      done => // TODO try/catch the JSON call?
        fs.writeFile( path, JSON.stringify(json), done )
    )
)

module.exports = {
  read,
  write
}
