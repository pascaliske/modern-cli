import 'reflect-metadata'
import { basename } from 'path'
import { padEnd, upperFirst } from 'lodash'
import { isCI } from 'ci-info'

import { findRoot, findName, findVersion } from './utils'
import { Container } from './container'
import { LogService } from './services/logservice'
import { NotificationService } from './services/notificationservice'
import { StorageService } from './services/storageservice'
import {
    Parser,
    CommandObject,
    OptionObject,
    Builder,
    Arguments,
    PrepareFn,
    BuilderFn,
    HandlerFn,
    Mode
} from './parser'
import { Command } from './command'

export class Cli {
    /* --- constants --- */

    /* --- properties --- */

    private name: string

    private version: string

    private root: string

    private log: LogService

    private notifications: NotificationService

    private parser: Parser

    private storage: StorageService

    /* --- constructor --- */

    /**
     * Initializes the cli instance.
     *
     * @param {string} name - The name of the cli
     * @param {string} version - The cli version.
     * @param {boolean} storage - Decides if the cli gets a global storage.
     * @returns {Cli}
     */
    public constructor(name: string = null, version: string = null, storage: boolean = false) {
        // prepare di container
        Container.set('name', findName(name, basename(module.id)))
        Container.set('version', findVersion(version))
        Container.set('root', findRoot())

        this.name = Container.get('name')
        this.version = Container.get('version')
        this.root = Container.get('root')
        this.log = Container.get(LogService)
        this.notifications = Container.get(NotificationService)
        this.parser = Container.get(Parser)
        this.storage = Container.get(StorageService)

        if (storage) {
            this.storage.create()
        }

        // handle uncaught errors
        process.on('uncaughtException', error => this.exit(1, error.message))
        process.on('unhandledRejection', error => this.exit(1, error))
    }

    /* --- private --- */

    /* --- protected --- */

    /**
     * Exits the cli with an given status code, message / error.
     *
     * @param {number} status - The status code to exit with (defaults to "0").
     * @param {string} message - The message to exit with.
     * @returns {Promise}
     */
    protected async exit(status: number = 0, message: string = null): Promise<void> {
        // exits with an error
        if (status > 0) {
            await this.notifications.notify('😔 An error occured!')
            this.log.error(message)

            // exit with given status code
            process.exit(status)
            return
        }

        // exits with success message
        await this.notifications.notify(message)
        this.log.info(message)

        // exit with given status code
        process.exit(status)
        return
    }

    /* --- public --- */

    /**
     * Register cli commands to the cli instance.
     *
     * @param {Array<CommandObject>} commands - The commands to be added.
     * @returns {Cli}
     */
    public addCommands(commands: Array<typeof Command>): Cli {
        // set mode to multiple
        this.parser.setMode(Mode.MULTIPLE)

        // refuse command if theres already one set
        if (this.parser.isLocked()) {
            return this
        }

        // add commands to parser
        for (const command of commands) {
            this.parser.addCommand(command)
        }

        // lock command line
        this.parser.lock()

        return this
    }

    /**
     * Register a single cli commands to the cli instance as default.
     *
     * @param {CommandObject} command - The commands to be added.
     * @returns {Cli}
     */
    public addSingleCommand(command: CommandObject): Cli {
        // set mode to single
        this.parser.setMode(Mode.SINGLE)

        // refuse command if theres already one set
        if (this.parser.isLocked()) {
            return this
        }

        // add command and set to single mode
        this.parser.addCommand(command)

        // lock command line
        this.parser.lock()

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
            this.parser.addOption(option)
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
            await this.parser.parse()
        } catch (error) {
            this.exit(1, error.message)
        }
    }
}
