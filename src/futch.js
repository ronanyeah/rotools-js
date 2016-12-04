'use strict'

const { fromPromise2 } = require('fluture')
const fetch            = require('node-fetch')

// String -> Object -> Future Err Res
module.exports = (url, options = {}) =>
  fromPromise2(fetch, url, options)
