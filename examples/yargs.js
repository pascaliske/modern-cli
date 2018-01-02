#!/usr/bin/env node

/* eslint-disable no-console */

const { name, version } = require('../package.json')

require('yargs')
    .version(false)
    .help(false)
    .usage(`${name} <cmd> [args]`)
    .alias('h', 'help')
    .alias('v', 'version')
    .option()
    .command('hello', 'welcome ter yargs!', yargs => {
        yargs.positional('first', {
            type: 'string',
            default: 'foo'
        })
        yargs.positional('last', {
            type: 'string',
            default: 'bar'
        })
    }, argv => {
        console.log('hello', argv.first, argv.last, 'welcome to yargs!')
    })
    .argv
