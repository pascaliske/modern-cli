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

@Service()
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
            transports: [
                new winston.transports.Console()
            ]
        })
    }

    /* --- private --- */

    /**
     * Formats the given message. Supports **bold**, *italic* and <highlight>.
     *
     * @param {string} message - The message to format.
     * @returns {string}
     */
    private formatMessage(message: string): string {
        return message
            .replace(/(\*\*[a-zA-z-_]+?\*\*)/g, match => {
                return chalk.bold(match.replace('*', ''))
            })
            .replace(/(\*[a-zA-z-_]+?\*)/g, match => {
                return chalk.bold(match.replace('*', ''))
            })
            .replace(/(<[a-zA-z-_]+?>)/g, match => {
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
    public log(level: LogLevels, message: string, ...params): void {
        this.logger.log(level, this.formatMessage(message), ...params)
    }

    /**
     * Logs the given message with a verbosity of "LogLevels.ERROR".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} params - Optional meta data to log.
     * @returns {void}
     */
    public error(message: string, ...params): void {
        this.log(LogLevels.ERROR, message, ...params)
    }

    /**
     * Logs the given message with a verbosity of "LogLevels.WARN".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} params - Optional meta data to log.
     * @returns {void}
     */
    public warn(message: string, ...params): void {
        this.log(LogLevels.WARN, message, ...params)
    }

    /**
     * Logs the given message with a verbosity of "LogLevels.INFO".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} params - Optional meta data to log.
     * @returns {void}
     */
    public info(message: string, ...params): void {
        this.log(LogLevels.INFO, message, ...params)
    }

    /**
     * Logs the given message with a verbosity of "LogLevels.VERBOSE".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} params - Optional meta data to log.
     * @returns {void}
     */
    public verbose(message: string, ...params): void {
        this.log(LogLevels.VERBOSE, message, ...params)
    }

    /**
     * Logs the given message with a verbosity of "LogLevels.DEBUG".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} params - Optional meta data to log.
     * @returns {void}
     */
    public debug(message: string, ...params): void {
        this.log(LogLevels.DEBUG, message, ...params)
    }

    /**
     * Logs the given message with a verbosity of "LogLevels.SILLY".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} params - Optional meta data to log.
     * @returns {void}
     */
    public silly(message: string, ...params): void {
        this.log(LogLevels.SILLY, message, ...params)
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
            LogLevels.ERROR,
            LogLevels.WARN,
            LogLevels.INFO,
            LogLevels.VERBOSE,
            LogLevels.DEBUG,
            LogLevels.SILLY
        ]
    }
}
