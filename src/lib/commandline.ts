import * as yargs from 'yargs'
import { Logger } from './logger'

export interface CommandObject extends yargs.CommandModule {
    name: string
    description: string
    aliases: Array<string>
    builder: (yargs: yargs.Argv) => yargs.Argv
    handler: (args: any) => void
    log: Logger
}

export interface OptionObject extends yargs.Options {
    key: string
}

export class CommandLine {
    /* --- constants --- */

    /* --- properties --- */

    private yargs: yargs.Argv

    /* --- constructor --- */

    /**
     * Initializes the command line parser.
     *
     * @returns {CommandLine}
     */
    constructor() {
        this.yargs = yargs
            .strict()
            .locale('en')
            .showHelpOnFail(true)
            .demandCommand(1)
            // .usage(`${this.name}@${this.version}`)
    }

    /* --- protected --- */

    /* --- public --- */

    /**
     * Adds an command to the cli.
     *
     * @param {CommandObject} command -
     * @returns {void}
     */
    public addCommand(command: CommandObject): void {
        this.yargs.command(command.name, command.description, command)
    }

    /**
     * Adds an option to the cli.
     *
     * @param {OptionObject} option -
     * @returns {void}
     */
    public addOption(option: OptionObject): void {
        this.yargs.option(option.key, option)
    }

    /**
     * Parses the command line and returns it.
     *
     * @returns {Promise<yargs.Arguments>}
     */
    public async parse(): Promise<yargs.Arguments> {
        return this.yargs
            .completion('completion', 'desc')
            .option('h', {
                alias: 'help',
                describe: 'ss',
                boolean: true
            })
            .option('V', {
                alias: 'verbose',
                describe: '',
                count: true
            })
            .option('v', {
                alias: 'version',
                describe: '',
                boolean: true
            })
            .argv
    }
}
