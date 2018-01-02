import { basename } from 'path'
import { padEnd, upperFirst } from 'lodash'
import { isCI } from 'ci-info'
import { notify } from 'node-notifier'
import * as findPackage from 'read-pkg-up'
import { CommandLine, CommandObject, OptionObject } from './commandline';
import { Logger } from './logger'
import { Command } from './command'

export class Cli {
    /* --- constants --- */

    /* --- properties --- */

    private name: string

    private version: string

    private commandline: CommandLine

    private log: Logger


    /* --- constructor --- */

    /**
     * Initializes the cli instance.
     *
     * @param {string} name - The name of the cli
     * @param {string} version - The cli version.
     * @returns {Cli}
     */
    constructor(name: string = null, version: string = null) {
        // fetch package data
        const pkg = findPackage.sync(__dirname)

        if (name === null) {
            name = pkg['name'] || basename(module.id)
        }

        if (version === null) {
            version = pkg['version'] || '1.0.0'
        }

        // enable all loggers including cli name
        process.env.DEBUG = `${name}*`

        this.name = name
        this.version = version
        this.commandline = new CommandLine()
        this.log = new Logger(name)

        // handle uncaught errors
        process.on('uncaughtException', error => this.exit(1, null, error))
        process.on('unhandledRejection', error => this.exit(1, null, error))
    }

    /* --- protected --- */

    /* --- public --- */

    /**
     * Register cli commands to the cli instance.
     *
     * @param {Array<Command>} commands - The commands to be added.
     * @returns {Cli}
     */
    public addCommands(commands: Array<CommandObject> = []): Cli {
        for (const command of commands) {
            this.commandline.addCommand(command)
        }

        return this
    }

    /**
     * Defines cli options.
     *
     * @param {Array} options -
     * @returns {Cli}
     */
    public addOptions(options: Array<OptionObject> = []): Cli {
        for (const option of options) {
            this.commandline.addOption(option)
        }

        return this
    }

    /**
     * Notifies the user with node-notifier.
     *
     * @param {string} message - The message for the notification.
     * @param {object} options - Optional options for the notification.
     * @returns {Promise<any>}
     */
    public notify(message: string, options: object = {}): Promise<any> {
        // ignore notifications on ci or non-tty
        if (!process.stdout.isTTY || isCI) {
            return Promise.resolve()
        }

        // promisify node-notifier
        return new Promise((resolve, reject) => {
            const defaults = {
                title: `${this.name}@${this.version}`,
                message: message || 'Done.',
                sound: true,
                actions: 'foo'
            }

            notify(Object.assign(defaults, options), (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    }

    /**
     * Runs the cli.
     *
     * @returns {Promise<any>}
     */
    public async run(): Promise<any> {
        try {
            await this.commandline.parse()
            await this.exit(0, `🎉  Command executed successfully!`)
        } catch (error) {
            await this.exit(1, null, error)
        }
    }

    /**
     * Exits the cli with an given status code, message / error.
     *
     * @param {number} status - The status code to exit with (defaults to "0").
     * @param {string} message - The message to exit with.
     * @param {Error} error - The error to exit with.
     * @returns {Promise}
     */
    public async exit(status: number = 0, message: string = null, error: Error = null): Promise<void> {
        // exits with an error
        if (error !== null) {
            await this.notify('😔 An error occured!')
            this.log.error(error.message)

            // exit with given status code
            process.exit(status)
            return
        }

        // exits with success message
        if (message !== null) {
            await this.notify(message)
            this.log.info(message)

            // exit with given status code
            process.exit(status)
            return
        }

        // exit with given status code
        process.exit(status)
        return
    }
}
