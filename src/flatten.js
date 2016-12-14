'use strict'

/**
 * Recursive array flattener.
 * @alias flatten
 * @param {array<any>} arr An array nested to any degree.
 * @return {array<any>}
 * @example flatten([1, [2, [3]]]) //=> [1, 2, 3]
 */
const flatten = arr =>
  arr.filter( Array.isArray ).length
    ? flatten( Array.prototype.concat( ...arr ) )
    : arr

module.exports = flatten
