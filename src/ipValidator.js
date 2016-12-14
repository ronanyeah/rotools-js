'use strict'

const { test } = require('ramda')

/**
 * @alias ipValidator
 * @param {string} ip IP address to validate.
 * @returns {boolean}
 * @example ipValidator('192.168.0.1') //=> true
 */
module.exports =
  // From here: http://www.w3resource.com/javascript/form/ip-address-validation.php
  test(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)

