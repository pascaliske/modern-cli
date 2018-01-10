import debug from 'debug'
import * as Spinner from 'ora'
import * as chalk from 'chalk'
import * as styles from 'ansi-styles'

export class Logger {
    /* --- constants --- */

    /**
     * Logging levels.
     */
    public static readonly DEBUG: string = 'debug'
    public static readonly VERBOSE: string = 'verbose'
    public static readonly INFO: string = 'info'
    public static readonly WARNING: string = 'warning'
    public static readonly ERROR: string = 'error'

    /* --- properties --- */

    /**
     * Level specific debug instances.
     *
     * @private
     * @property {object}
     */
    private instances: object = {}

    /**
     * Current indentation counter.
     *
     * @private
     * @property {number}
     */
    private indentation: number = 0

    /* --- constructor --- */

    /**
     * Initializes the logger.
     *
     * @param {string} id - The id of the logger instance.
     * @returns {Logger}
     */
    constructor(id: string) {
        // this.options = new Options()

        // enable levels based on verbosity
        debug.enable(this.enabledLevels(id))

        // register debug instances for all levels
        for (const level of this.getLevels()) {
            this.instances[level] = debug(`${id}:${level}`)
        }

        // register styles on class
        this.registerStyles()
    }

    /* --- protected --- */

    /**
     * Fetches the current verbosity from cli options.
     *
     * @private
     * @returns {string}
     */
    private fetchVerbosity(): string {
        // if (this.options.get('debug')) {
        //     return Logger.DEBUG
        // }

        // if (this.options.get('verbose')) {
        //     return Logger.VERBOSE
        // }

        return Logger.INFO
    }

    /**
     * Returns the enabled debug instance names as comma seperated string.
     *
     * @private
     * @param {string} id - The logger id.
     * @returns {string}
     */
    private enabledLevels(id: string): string {
        // fetch current level from command line
        const current = this.fetchVerbosity()

        // level map
        const enabled = key => ({
            [Logger.DEBUG]: [
                Logger.DEBUG,
                Logger.VERBOSE,
                Logger.INFO,
                Logger.WARNING,
                Logger.ERROR
            ],
            [Logger.VERBOSE]: [
                Logger.VERBOSE,
                Logger.INFO,
                Logger.WARNING,
                Logger.ERROR
            ],
            [Logger.INFO]: [
                Logger.INFO,
                Logger.WARNING,
                Logger.ERROR
            ],
            [Logger.WARNING]: [
                Logger.WARNING,
                Logger.ERROR
            ],
            [Logger.ERROR]: [
                Logger.ERROR
            ]
        }[key])

        return enabled(current)
            .map(level => `${id}:${level}`)
            .join(',')
    }

    /**
     * Registers chalk styles.
     *
     * @private
     * @returns {void}
     */
    private registerStyles(): void {
        for (const style in styles) {
            Logger[style] = chalk[style].bind(chalk)
        }
    }

    /* --- public --- */

    /**
     * Logs the given message with a verbosity of given level.
     *
     * @param {string} level - The logging level.
     * @param {Array<any>} params - The variables to log.
     * @returns {void}
     */
    public log(level: string = Logger.INFO, ...params): void {
        this.instances[level](...params)
    }

    /**
     * Logs the given message with a verbosity of "Logger.DEBUG".
     *
     * @param {Array<any>} params - The variables to log.
     * @returns {void}
     */
    public debug(...params): void {
        this.log(Logger.DEBUG, ...params)
    }

    /**
     * Logs the given message with a verbosity of "Logger.VERBOSE".
     *
     * @param {Array<any>} params - The variables to log.
     * @returns {void}
     */
    public verbose(...params): void {
        this.log(Logger.VERBOSE, ...params)
    }

    /**
     * Logs the given message with a verbosity of "Logger.INFO".
     *
     * @param {Array<any>} params - The variables to log.
     * @returns {void}
     */
    public info(...params): void {
        this.log(Logger.INFO, ...params)
    }

    /**
     * Logs the given message with a verbosity of "Logger.WARNING".
     *
     * @param {Array<any>} params - The variables to log.
     * @returns {void}
     */
    public warning(...params): void {
        this.log(Logger.WARNING, ...params)
    }

    /**
     * Logs the given message with a verbosity of "Logger.ERROR".
     *
     * @param {Array<any>}
     */
    public error(...params): void {
        this.log(Logger.ERROR, ...params)
    }

    /**
     * Logs a raw message using console.log.
     *
     * @param {Array<any>} params - The variables to log.
     * @returns {void}
     */
    public raw(...params): void {
        if (this.indentation > 0) {
            let prepend = []

            for (let i = 1; i < this.indentation; i++) {
                prepend.push(' ')
            }

            params.unshift(prepend.join(''))
        }

        console.log.apply(chalk, params)
    }

    /**
     * Increases the indentation for raw logging.
     *
     * @param {number} value - The number of spaces to increase.
     * @returns {void}
     */
    public indent(value: number = 4): void {
        this.indentation = this.indentation + value
    }

    /**
     * Decreases the indentation for raw logging.
     *
     * @param {number} value - The number of spaces to decrease.
     * @returns {void}
     */
    public outdent(value: number = 4): void {
        if (this.indentation < value) {
            this.indentation = 0
        } else {
            this.indentation = this.indentation - value
        }
    }

    /**
     * Creates and returns a new spinner instance.
     *
     * @param {string} text -
     * @param {object} options -
     * @returns {Spinner}
     */
    public spinner(text: string = 'waiting...', options: object = {}): any {
        const spinner = new Spinner({
            text: text,
            spinner: options['visual'],
            color: options['color'],
            interval: 80
        })

        return spinner.start()
    }

    /**
     * Returns all logging levels in an array.
     *
     * @returns {Array<string>}
     */
    public getLevels(): Array<string> {
        return [
            Logger.DEBUG,
            Logger.VERBOSE,
            Logger.INFO,
            Logger.WARNING,
            Logger.ERROR
        ]
    }
}
