'use strict'

const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { replace, map, sort, gt, join, pipe } = require('ramda')

const ROOT = `${__dirname}/..`

const formatFilenames =
  pipe(
    map(replace('.js', '')),
    sort(gt),
    join(',\n  ')
  )

writeFileSync(
  `${ROOT}/README.md`,
  replace(
    /{[\s\S]*}/, // Select braces and contents.

    '{\n  ' +
    formatFilenames(readdirSync(`${ROOT}/src`)) +
    '\n}',

    readFileSync(`${ROOT}/README.md`, 'utf8')
  )
)
