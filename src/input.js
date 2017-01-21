'use strict'

const Future = require('fluture')
const { dropLast } = require('ramda')

// TODO: May also be possible to implement recursively
// by returning userInput(fn) but is harder to test due to
// the stdin mock being synchronous. Could put the mock calls in setTimeouts,
// or nextTick?

/**
 * Get validated user input from the CLI.
 * @alias input
 * @param {function} validator Input will be passed to this function and the Future will resolve with the value if it returns truthy.
 * @returns Future< err, any >
 * @example const isEven = x =>
 * Number(x) % 2 === 0
 *
 * input( isEven )
 * .fork( err, '4' )
 */
module.exports = validator =>
  Future( (reject, resolve) =>
    void process.stdin.on(
      'data',
      function inputHandler (data) {
        const input = dropLast(1, String(data)) // remove line break
        return validator(input)
          ? (
              process.stdin.removeListener('data', inputHandler),
              resolve(input)
            )
          : console.log('Try again!')
      }
    )
  )

