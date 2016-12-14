'use strict'

const { fromPromise, fromPromise2 } = require('fluture')
const fetch                         = require('node-fetch')

// String -> Object -> Boolean -> Future Err Res

/**
 * Futurized fetch. Worst name ever.
 * @alias futch
 * @param {string} url URL to fetch.
 * @param {object} [options={}] fetch options to be passed in.
 * @param {string} [parse=false] Optional body parsing instruction e.g. json, text.
 * @returns Future[ err, res ]
 * @example futch('https://json.com/', { headers }, 'json').fork( ... )
 */
module.exports = (url, options = {}, parse = false) =>
  parse
    ? fromPromise2(fetch, url, options)
      .chain(
        res =>
          fromPromise(
            () =>
              res[parse](),
            0
          )
      )
    : fromPromise2(fetch, url, options)
