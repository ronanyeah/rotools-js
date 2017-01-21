'use strict'

const { fromPromise } = require('fluture')

const futch = require(`${__dirname}/futch.js`)

/**
 * Futurized json fetch.
 * @alias futchJson
 * @param {string} url URL to fetch.
 * @param {object} [options] fetch options to be passed in.
 * @returns Future< err, json >
 * @example futchJson('https://json.com/')
 * .fork( err, { yeah: 'ok' } )
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
