'use strict'

const { map } = require('ramda')
const { pipe } = require('sanctuary')
const { statSync, readdirSync } = require('fs')

const flatten = require(`${__dirname}/../src/flatten.js`)

/**
 * Recursive filepath walker.
 * @alias fileMapper
 * @param {string} dir Directory to start from.
 * @returns {array<string>}
 * @example fileMapper('/home/me') //=> ['/home/me/file.txt', '/home/me/folder/pic.png']
 */
const walk = dir =>
  map(
    file =>
      statSync(`${dir}/${file}`).isDirectory()
        ? walk(`${dir}/${file}`)
        : `${dir}/${file}`,
    readdirSync(dir)
  )

// String -> [String]
module.exports = pipe([
  walk,
  flatten
])
