'use strict'

const { assoc, replace } = require('ramda')
const { readdirSync }    = require('fs')
const { resolve }        = require('path')

global.ROOT = resolve(__dirname)

module.exports =
  readdirSync(`${ROOT}/src`)
  .reduce(
    // Object -> String -> Object
    (acc, file) =>
      assoc(
        replace('.js', '', file),
        require(`${ROOT}/src/${file}`),
        acc
      ),
    {}
  )
