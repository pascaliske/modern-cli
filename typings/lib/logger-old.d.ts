export declare class Logger {
    /**
     * Logging levels.
     */
    static readonly DEBUG: string;
    static readonly VERBOSE: string;
    static readonly INFO: string;
    static readonly WARNING: string;
    static readonly ERROR: string;
    static cyan: any;
    /**
     * Level specific debug instances.
     *
     * @private
     * @property {object}
     */
    private instances;
    /**
     * Current indentation counter.
     *
     * @private
     * @property {number}
     */
    private indentation;
    /**
     * Initializes the logger.
     *
     * @param {string} id - The id of the logger instance.
     * @returns {Logger}
     */
    constructor(id: string);
    /**
     * Fetches the current verbosity from cli options.
     *
     * @private
     * @returns {string}
     */
    private fetchVerbosity();
    /**
     * Returns the enabled debug instance names as comma seperated string.
     *
     * @private
     * @param {string} id - The logger id.
     * @returns {string}
     */
    private enabledLevels(id);
    /**
     * Registers chalk styles.
     *
     * @private
     * @returns {void}
     */
    private registerStyles();
    /**
     * Logs the given message with a verbosity of given level.
     *
     * @param {string} level - The logging level.
     * @param {Array<any>} params - The variables to log.
     * @returns {void}
     */
    log(level?: string, ...params: any[]): void;
    /**
     * Logs the given message with a verbosity of "Logger.DEBUG".
     *
     * @param {Array<any>} params - The variables to log.
     * @returns {void}
     */
    debug(...params: any[]): void;
    /**
     * Logs the given message with a verbosity of "Logger.VERBOSE".
     *
     * @param {Array<any>} params - The variables to log.
     * @returns {void}
     */
    verbose(...params: any[]): void;
    /**
     * Logs the given message with a verbosity of "Logger.INFO".
     *
     * @param {Array<any>} params - The variables to log.
     * @returns {void}
     */
    info(...params: any[]): void;
    /**
     * Logs the given message with a verbosity of "Logger.WARNING".
     *
     * @param {Array<any>} params - The variables to log.
     * @returns {void}
     */
    warning(...params: any[]): void;
    /**
     * Logs the given message with a verbosity of "Logger.ERROR".
     *
     * @param {Array<any>}
     */
    error(...params: any[]): void;
    /**
     * Logs a raw message using console.log.
     *
     * @param {Array<any>} params - The variables to log.
     * @returns {void}
     */
    raw(...params: any[]): void;
    /**
     * Increases the indentation for raw logging.
     *
     * @param {number} value - The number of spaces to increase.
     * @returns {void}
     */
    indent(value?: number): void;
    /**
     * Decreases the indentation for raw logging.
     *
     * @param {number} value - The number of spaces to decrease.
     * @returns {void}
     */
    outdent(value?: number): void;
    /**
     * Creates and returns a new spinner instance.
     *
     * @param {string} text -
     * @param {object} options -
     * @returns {Spinner}
     */
    spinner(text?: string, options?: object): any;
    /**
     * Returns all logging levels in an array.
     *
     * @returns {Array<string>}
     */
    getLevels(): Array<string>;
}
