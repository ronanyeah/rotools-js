'use strict'

const { readdirSync, readFileSync, writeFileSync } = require('fs')

global.ROOT = `${__dirname}/..`

writeFileSync(
  `${ROOT}/README.md`,
  readFileSync(`${ROOT}/README.md`, 'utf8')
  .replace(
    /{[\s\S]*}/,
    '{\n  ' +
    readdirSync(`${ROOT}/src`)
    .map(
      fileName =>
        (
          fn =>
            `[${fn}](https://github.com/ronanyeah/rotools/blob/master/docs.md#${fn})`
        )(
          fileName.replace('.js', '')
        )
    )
    .sort()
    .join(',\n  ') +
    '\n}'
  )
)
