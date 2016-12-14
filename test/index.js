'use strict'

const { ensureDirSync, readdirSync } = require('fs-extra')
const { resolve } = require('path')

global.ROOT = resolve(`${__dirname}/..`)

ensureDirSync(`${ROOT}/test/scrap`)

readdirSync(`${ROOT}/src`)
.forEach(
  file =>
    require(`${ROOT}/test/src/${file}`)
)
