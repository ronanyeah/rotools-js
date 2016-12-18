'use strict'

const { fromPromise, reject, of } = require('fluture')
const { prop } = require('ramda')

const futch = require(`${__dirname}/futch.js`)
const ipValidator = require(`${__dirname}/ipValidator.js`)

/**
 * Gets current IP address and validates it.
 * @alias getCurrentIp
 * @returns Future[ err, string ]
 * @example getCurrentIp.fork( err, ip )
 */
module.exports =
  futch('https://ipinfo.io/json')
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
  .chain(
    ip =>
      ipValidator(ip)
        ? of(ip)
        : reject(Error(`Invalid IP address returned: ${ip}`))
  )
