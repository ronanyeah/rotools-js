'use strict'

const fs               = require('fs')
const { curry }        = require('ramda')
const { node, encase } = require('fluture')

module.exports = {
  /**
   * Reads JSON files.
   * @alias json.read
   * @param {string} path Filepath.
   * @returns Future[ err, JSON ]
   * @example json.read('/file/path').fork( err, json )
   */
  read:
    path =>
      node(
        done =>
          fs.readFile( path, 'utf8', done )
      )
      .chain( encase(JSON.parse) ),

  /**
   * Writes JSON files.
   * @alias json.write
   * @param {string} path Filepath.
   * @param {any} json Valid JSON.
   * @returns Future[ err, _ ]
   * @example json.write('/file/path', { json: 'yeah' }).fork( ... )
   */
  write:
    curry(
      (path, json) =>
        node(
          done => // TODO try/catch the JSON call?
            fs.writeFile( path, JSON.stringify(json), done )
        )
    )
}
