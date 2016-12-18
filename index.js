'use strict'

const { curry, assoc, replace } = require('ramda')
const { reduce }                = require('sanctuary')
const { readdirSync }           = require('fs')

const srcFolder = `${__dirname}/src`

/*
 * Returns an object with all the tools in ./src.
 * {
 *   name: function
 * }
 *
 */
module.exports =
  reduce(
    curry(
      // Object -> String -> Object
      (acc, file) =>
        assoc(
          replace('.js', '', file),
          require(`${srcFolder}/${file}`),
          acc
        )
    ),
    {},
    readdirSync(srcFolder)
  )
