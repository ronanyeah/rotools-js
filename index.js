'use strict'

const { assoc, replace, reduce } = require('ramda')
const { readdirSync } = require('fs')

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
    // Object -> String -> Object
    (acc, fileName) =>
      assoc(
        replace('.js', '', fileName),
        require(`${srcFolder}/${fileName}`),
        acc
      ),
    {},
    readdirSync(srcFolder)
  )
