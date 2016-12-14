'use strict'

const { resolve }             = require('path')
const futch                   = require(resolve(`${__dirname}/futch.js`))
const ipValidator             = require(resolve(`${__dirname}/ipValidator.js`))
const { fromPromise, reject } = require('fluture')
const { prop }                = require('ramda')

/**
 * Gets current IP address and validates it.
 * @alias getCurrentIp
 * @returns Future[ err, string ]
 * @example getCurrentIp.fork( err, ip )
 */
module.exports =
  futch('https://api.ipify.org?format=json')
  .chain(
    res =>
      res.status === 200
        ? fromPromise( () => res.json(), 0 )
        : reject(Error(
            'Failed to query IP address.' +
            `\n${res.status}: ${res.statusText}`
          ))
  )
  .map( prop('ip') )
  .map(
    ip =>
      ipValidator(ip)
        ? ip
        : reject(Error(`Invalid IP address returned: ${ip}`))
  )
