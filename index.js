'use strict'

const { curry, assoc, replace } = require('ramda')
const { reduce }                = require('sanctuary')
const { readdirSync }           = require('fs')
const { resolve }               = require('path')

const srcFolder = resolve(`${__dirname}/src`)

module.exports =
  reduce(
    // Object -> String -> Object
    curry(
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
