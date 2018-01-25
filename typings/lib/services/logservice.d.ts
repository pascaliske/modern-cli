/// <reference types="winston" />
import * as winston from 'winston';
export declare enum LogLevels {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    VERBOSE = "verbose",
    DEBUG = "debug",
    SILLY = "silly",
}
export declare class LogService {
    logger: winston.LoggerInstance;
    /**
     * Initializes the logger.
     *
     * @returns {Logger}
     */
    constructor();
    /**
     * Formats the given message. Supports **bold**, *italic* and <highlight>.
     *
     * @param {string} message - The message to format.
     * @returns {string}
     */
    private format(message);
    /**
     * Logs the given message with a verbosity of given level.
     *
     * @param {string} level - The logging level.
     * @param {string} message - The message to log.
     * @param {Array<any>} params - Optional meta data to log.
     * @returns {void}
     */
    log(level: LogLevels, message: string, ...additional: Array<any>): void;
    /**
     * Logs the given message with a verbosity of "LogLevels.ERROR".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} additional - Optional meta data to log.
     * @returns {void}
     */
    error(message: string, ...additional: Array<any>): void;
    /**
     * Logs the given message with a verbosity of "LogLevels.WARN".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} additional - Optional meta data to log.
     * @returns {void}
     */
    warn(message: string, ...additional: Array<any>): void;
    /**
     * Logs the given message with a verbosity of "LogLevels.INFO".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} additional - Optional meta data to log.
     * @returns {void}
     */
    info(message: string, ...additional: Array<any>): void;
    /**
     * Logs the given message with a verbosity of "LogLevels.VERBOSE".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} additional - Optional meta data to log.
     * @returns {void}
     */
    verbose(message: string, ...additional: Array<any>): void;
    /**
     * Logs the given message with a verbosity of "LogLevels.DEBUG".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} additional - Optional meta data to log.
     * @returns {void}
     */
    debug(message: string, ...additional: Array<any>): void;
    /**
     * Logs the given message with a verbosity of "LogLevels.SILLY".
     *
     * @param {string} message - The message to log.
     * @param {Array<any>} additional - Optional meta data to log.
     * @returns {void}
     */
    silly(message: string, ...additional: Array<any>): void;
    /**
     * Creates and returns a new spinner instance.
     *
     * @param {string} text -
     * @param {object} options -
     * @returns {Spinner}
     */
    spinner(text?: string, options?: any): any;
    /**
     * Returns all logging levels in an array.
     *
     * @returns {Array<string>}
     */
    getLevels(): Array<string>;
}
