'use strict'

const { fromPromise, fromPromise2 } = require('fluture')
const fetch = require('node-fetch')

/**
 * Futurized fetch. Worst name ever.
 * @alias futch
 * @param {string} url URL to fetch.
 * @param {object} [options] fetch options to be passed in.
 * @returns Future[ err, res ]
 * @example futch('https://test.com/').fork( ... )
 */
module.exports = (url, options) =>
  options
    ? fromPromise2(fetch, url, options)
    : fromPromise(fetch, url)
