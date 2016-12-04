'use strict'

// Flattens a nested array recursively.
// [Array|Any] -> [Any]
const flatten = arr =>
  arr.filter( Array.isArray ).length
    ? flatten( Array.prototype.concat( ...arr ) )
    : arr

module.exports = flatten
