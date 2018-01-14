import * as yargs from 'yargs'
import { Logger } from './logger'
import { Storage } from './storage'

export enum Mode {
    SINGLE = 'single',
    MULTIPLE = 'multiple'
}
export interface PrepareFn {
    (): void
}
export interface BuilderFn {
    (args: Builder): Builder
}
export interface HandlerFn {
    (args: Arguments): Promise<void>
}
export interface Builder extends yargs.Argv {}
export interface Arguments extends yargs.Arguments {}
export interface CommandObject extends yargs.CommandModule {
    name: string
    description: string
    aliases?: Array<string>
    root?: string
    log?: Logger
    storage?: Storage
    prepare?: PrepareFn
    builder: BuilderFn
    handler: HandlerFn
}
export interface OptionObject extends yargs.Options {
    key: string
}

export class CommandLine {
    /* --- constants --- */

    /* --- properties --- */

    private log: Logger

    private yargs: Builder

    private args: Arguments

    private mode: Mode

    private locked: boolean = false

    /* --- constructor --- */

    /**
     * Initializes the command line parser.
     *
     * @returns {CommandLine}
     */
    constructor(log: Logger, name: string, version: string) {
        this.log = log
        this.yargs = yargs
            .strict()
            .locale('en')
            .epilogue('epilogue')
            .help('help', 'Shows this help message')
            .version('version', 'Shows the version number', version)
            .completion('completions')
            .showHelpOnFail(false)
            .fail((message: string, error: Error): void => {
                if (message) {
                    throw new Error(message)
                }

                throw error
            })
    }

    /* --- private --- */

    /* --- protected --- */

    /* --- public --- */

    /**
     * Adds an command to the cli.
     *
     * @param {CommandObject} command -
     * @returns {void}
     */
    public addCommand(command: CommandObject): Builder {
        const name = command.name
        const description = command.description
        const builder = command.builder.bind(command)
        const handler = command.handler.bind(command)

        return this.yargs.command(name, description, builder, handler)
    }

    /**
     * Adds an option to the cli.
     *
     * @param {OptionObject} option -
     * @returns {void}
     */
    public addOption(option: OptionObject): Builder {
        return this.yargs.option(option.key, option)
    }

    /**
     * Parses the command line and returns the parsed arguments.
     *
     * @returns {Promise<Arguments>}
     */
    public async parse(): Promise<Arguments> {
        this.args =  this.yargs
            .demandCommand(this.mode === Mode.SINGLE ? 0 : 1)
            .option('h', {
                alias: 'help',
                describe: 'ss',
                boolean: true
            })
            .option('v', {
                alias: 'version',
                describe: '',
                boolean: true
            })
            .option('V', {
                alias: 'verbose',
                describe: '',
                count: true
            })
            .argv

        return this.args
    }

    /**
     * Checks if the command line is locked.
     *
     * @returns {boolean}
     */
    public isLocked(): boolean {
        return this.locked
    }

    /**
     * Locks the command line.
     *
     * @returns {void}
     */
    public lock(): void {
        this.locked = true
    }

    /**
     * Unlocks the command line.
     *
     * @returns {void}
     */
    public unlock(): void {
        this.locked = false
    }

    public setMode(mode: Mode): void {
        this.mode = mode
    }
}
