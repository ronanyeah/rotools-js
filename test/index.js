'use strict'

const { ensureDirSync, readdirSync } = require('fs-extra')
const { resolve } = require('path')

global.ROOT = resolve(`${__dirname}/..`)

ensureDirSync(`${ROOT}/scrap`)

readdirSync(`${ROOT}/src`)
.forEach(
  file =>
    require(`${ROOT}/test/${file}`)
)
