'use strict'

const { assoc, replace } = require('ramda')
const { readdirSync }    = require('fs')
const { resolve }        = require('path')

const srcFolder = `${resolve(__dirname)}/src`

module.exports =
  readdirSync(srcFolder)
  .reduce(
    // Object -> String -> Object
    (acc, file) =>
      assoc(
        replace('.js', '', file),
        require(srcFolder),
        acc
      ),
    {}
  )
