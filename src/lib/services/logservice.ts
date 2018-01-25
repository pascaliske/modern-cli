import * as winston from 'winston'
import * as Spinner from 'ora'
import chalk from 'chalk'
import * as styles from 'ansi-styles'

import { Service } from '../container'

export enum LogLevels {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    VERBOSE = 'verbose',
    DEBUG = 'debug',
    SILLY = 'silly'
}

@Service('LogService')
export class LogService {
    /* --- constants --- */

    /* --- properties --- */

    public logger: winston.LoggerInstance

    /* --- constructor --- */

    /**
     * Initializes the logger.
     *
     * @returns {Logger}
     */
    public constructor() {
        this.logger = new winston.Logger({
            transports: [new winston.transports.Console()]
        })
    }

    /* --- private --- */

    /**
     * Formats the given message. Supports **bold**, *italic* and <highlight>.
     *
     * @param {string} message - The message to format.
     * @returns {string}
     */
    private format(message: string): string {
        if (typeof message !== 'string') {
            return message
        }

        return message
            .replace(/(\*\*[a-zA-z-_/\\]+?\*\*)/g, match => {
                return chalk.bold(match.replace(/[*]/g, ''))
            })
            .replace(/(\*[a-zA-z-_/\\]+?\*)/g, match => {
                return chalk.italic(match.replace(/[*]/g, ''))
            })
            .replace(/(<<[a-zA-z-_/\\]+?>>)/g, match => {
                return chalk.red(match.replace(/[<>]/g, ''))
            })
            .replace(/(<[a-zA-z-_/\\]+?>)/g, match => {
                return chalk.cyan(match.replace(/[<>]/g, ''))
            })
    }

    /* --- protected --- */

    /* --- public --- */

    /**
     * Logs the given message with a verbosity of given level.
     *
     * @param {string} level - The logging level.
     * @param {string} message - The message to log.
     * @param {Array<any>} params - Optional meta data to log.
     * @returns {void}
     */
    public log(level: LogLevels, message: string, ...additional: Array<any>): void {
        this.logger.log(level, this.format(message), ...additional.map(this.format))
    }

    /**
     * Logs the given message with a verbosity of "LogLevels.ERROR".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} additional - Optional meta data to log.
     * @returns {void}
     */
    public error(message: string, ...additional: Array<any>): void {
        this.log(LogLevels.ERROR, message, ...additional)
    }

    /**
     * Logs the given message with a verbosity of "LogLevels.WARN".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} additional - Optional meta data to log.
     * @returns {void}
     */
    public warn(message: string, ...additional: Array<any>): void {
        this.log(LogLevels.WARN, message, ...additional)
    }

    /**
     * Logs the given message with a verbosity of "LogLevels.INFO".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} additional - Optional meta data to log.
     * @returns {void}
     */
    public info(message: string, ...additional: Array<any>): void {
        this.log(LogLevels.INFO, message, ...additional)
    }

    /**
     * Logs the given message with a verbosity of "LogLevels.VERBOSE".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} additional - Optional meta data to log.
     * @returns {void}
     */
    public verbose(message: string, ...additional: Array<any>): void {
        this.log(LogLevels.VERBOSE, message, ...additional)
    }

    /**
     * Logs the given message with a verbosity of "LogLevels.DEBUG".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} additional - Optional meta data to log.
     * @returns {void}
     */
    public debug(message: string, ...additional: Array<any>): void {
        this.log(LogLevels.DEBUG, message, ...additional)
    }

    /**
     * Logs the given message with a verbosity of "LogLevels.SILLY".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} additional - Optional meta data to log.
     * @returns {void}
     */
    public silly(message: string, ...additional: Array<any>): void {
        this.log(LogLevels.SILLY, message, ...additional)
    }

    /**
     * Creates and returns a new spinner instance.
     *
     * @param {string} text -
     * @returns {Spinner}
     */
    public spinner(text: string): any {
        const spinner = new Spinner({
            text: this.format(text),
            spinner: 'dots',
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
            LogLevels.ERROR,
            LogLevels.WARN,
            LogLevels.INFO,
            LogLevels.VERBOSE,
            LogLevels.DEBUG,
            LogLevels.SILLY
        ]
    }
}
