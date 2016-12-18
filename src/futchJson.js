'use strict'

const { fromPromise } = require('fluture')
const futch = require(`${__dirname}/futch.js`)

// String -> Object -> Boolean -> Future Err Res

/**
 * Futurized json fetch.
 * @alias futchJson
 * @param {string} url URL to fetch.
 * @param {object} [options] fetch options to be passed in.
 * @returns Future[ err, res ]
 * @example futchJson('https://json.com/').fork( ... )
 */
module.exports = (url, options) =>
  (
    options
      ? futch(url, options)
      : futch(url)
  )
  .chain(
    res =>
      fromPromise(
        () => res.json(),
        0
      )
  )