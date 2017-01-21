'use strict'

const Future = require('fluture')
const childProcess = require('child_process')

/**
 * Execute shell commands in the current working directory.
 * @alias exec
 * @param {string} command The shell command to be executed.
 * @returns Future< err, string >
 * @example exec('pwd')
 * .fork( err, '/home/ronan/repos/rotools' )
 */
module.exports =
  command =>
    Future(
      (rej, res) =>
        void childProcess.exec(
          command,
          { cwd: process.cwd() },
          (err, stdout, stderr) =>
            err
              ? rej(err)
              : stderr
                ? rej(stderr)
                : res(stdout)
      )
    )
