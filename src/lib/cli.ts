import { basename, dirname } from 'path'
import { padEnd, upperFirst } from 'lodash'
import { isCI } from 'ci-info'
import { notify } from 'node-notifier'
import { sync as findPackage } from 'pkg-up'
import { sync as readPackage } from 'read-pkg-up'
import { CommandLine, CommandObject, OptionObject, Builder, Arguments, PrepareFn, BuilderFn, HandlerFn, Mode } from './commandline'
import { Logger } from './logger'
import { Command } from './command'
import { Storage } from './storage'

export class Cli {
    /* --- constants --- */

    /* --- properties --- */

    private name: string

    private version: string

    private root: string

    private log: Logger

    private commandline: CommandLine

    private storage: Storage

    /* --- constructor --- */

    /**
     * Initializes the cli instance.
     *
     * @param {string} name - The name of the cli
     * @param {string} version - The cli version.
     * @param {boolean} storage - Need the cli a global storage.
     * @returns {Cli}
     */
    constructor(name: string = null, version: string = null, storage: boolean = false) {
        // fetch package data
        const pkg = readPackage(__dirname)

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
        this.root = this.findRoot()
        this.log = new Logger(name)
        this.commandline = new CommandLine(this.log, this.name, this.version)

        if (storage) {
            this.storage = new Storage(name, version)
        }

        // handle uncaught errors
        process.on('uncaughtException', error => this.exit(1, error))
        process.on('unhandledRejection', error => this.exit(1, error))
    }

    /* --- private --- */

    private findRoot(): string {
        const findHighestModule = (): NodeModule => {
            const stack = [module]
            let parent = module.parent
            let current

            for (; parent; parent = parent.parent) {
                stack.push (parent)
            }

            while ((current = stack.pop()) != null) {
                try {
                    return current
                } catch (ex) {}
            }
        }

        return dirname(findPackage(findHighestModule().filename))
    }

    /* --- protected --- */

    /**
     * Notifies the user with node-notifier.
     *
     * @param {string} message - The message for the notification.
     * @param {object} options - Optional options for the notification.
     * @returns {Promise<any>}
     */
    protected notify(message: string, options: object = {}): Promise<any> {
        // ignore notifications on ci or non-tty
        if (!process.stdout.isTTY || isCI) {
            return Promise.resolve()
        }

        // promisify node-notifier
        return new Promise((resolve, reject) => {
            const defaults = {
                title: `${this.name}@${this.version}`,
                message: message || 'Done.',
                sound: true
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
     * Exits the cli with an given status code, message / error.
     *
     * @param {number} status - The status code to exit with (defaults to "0").
     * @param {string} message - The message to exit with.
     * @returns {Promise}
     */
    protected async exit(status: number = 0, message: any = null): Promise<void> {
        // exits with an error
        if (status > 0) {
            await this.notify('😔 An error occured!')
            this.log.error(message)

            // exit with given status code
            process.exit(status)
            return
        }

        // exits with success message
        await this.notify(message)
        this.log.info(message)

        // exit with given status code
        process.exit(status)
        return
    }

    /* --- public --- */

    /**
     * Register cli commands to the cli instance.
     *
     * @param {Array<Command>} commands - The commands to be added.
     * @returns {Cli}
     */
    public addCommands(commands: Array<CommandObject>): Cli {
        // refuse command if theres already one set
        if (this.commandline.isLocked()) {
            return this
        }

        // set mode to multiple
        this.commandline.setMode(Mode.MULTIPLE)

        for (let command of commands) {
            // prepare command
            if (typeof command.prepare !== 'function') {
                command.prepare = () => {}
            }
            command.root = this.root
            command.log = this.log
            command.storage = this.storage
            command.prepare()

            // add command
            this.commandline.addCommand(command)
        }

        // lock command line
        this.commandline.lock()

        return this
    }

    public addSingleCommand(command: CommandObject): Cli {
        // refuse command if theres already one set
        if (this.commandline.isLocked()) {
            return this
        }

        // set mode to single
        this.commandline.setMode(Mode.SINGLE)

        // prepare command
        if (typeof command.prepare !== 'function') {
            command.prepare = () => {}
        }
        command.root = this.root
        command.log = this.log
        command.storage = this.storage
        command.prepare()

        // add command and set to single mode
        this.commandline.addCommand(command)

        // lock command line
        this.commandline.lock()

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
     * Runs the cli.
     *
     * @returns {Promise<any>}
     */
    public async run(): Promise<any> {
        try {
            this.log.info(`v${this.version}`)

            await this.commandline.parse()
        } catch (error) {
            await this.exit(1, error.message)
        }
    }
}
