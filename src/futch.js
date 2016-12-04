'use strict'

const { fromPromise, fromPromise2 } = require('fluture')
const fetch                         = require('node-fetch')

// String -> Object -> Boolean -> Future Err Res
module.exports = (url, options = {}, json = false) =>
  json
    ? fromPromise2(fetch, url, options)
      .chain(
        res =>
          fromPromise(
            () =>
              res.json(),
            0
          )
      )
    : fromPromise2(fetch, url, options)
