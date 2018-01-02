#!/usr/bin/env node

/* eslint-disable no-console */

const { name, version } = require('../package.json')
const { Cli, Command } = require('../dist')


class DemoCommand extends Command {
    constructor() {
        super('demo', 'Demo command class.', builder => {
            builder.positional('foo', {
                type: 'string'
            })
            return builder
        })
    }

    handler(args) {
        console.log(`foo: ${args.foo}`)
        console.log(`verbose: ${args.verbose}`)
        console.log('success')
    }
}

// const storage = new Storage(name, version)
new Cli(name, version)
    .addOptions([
        {
            key: 'f',
            alias: 'file',
            description: 'FILE',
            type: 'string'
        }
    ])
    .addCommands([
        new DemoCommand(),
        Command.fromObject({
            name: 'hello',
            description: 'Description.',
            handler: (args) => {
                console.log(args)
                console.log('hello', args.get('first'), args.get('last'), 'welcome to yargs!')
            }
        })
    ])
    .run()
