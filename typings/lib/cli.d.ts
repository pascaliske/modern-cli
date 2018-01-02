import { CommandObject, OptionObject } from './commandline';
export declare class Cli {
    private name;
    private version;
    private commandline;
    private log;
    /**
     * Initializes the cli instance.
     *
     * @param {string} name - The name of the cli
     * @param {string} version - The cli version.
     * @returns {Cli}
     */
    constructor(name?: string, version?: string);
    /**
     * Register cli commands to the cli instance.
     *
     * @param {Array<Command>} commands - The commands to be added.
     * @returns {Cli}
     */
    addCommands(commands?: Array<CommandObject>): Cli;
    /**
     * Defines cli options.
     *
     * @param {Array} options -
     * @returns {Cli}
     */
    addOptions(options?: Array<OptionObject>): Cli;
    /**
     * Notifies the user with node-notifier.
     *
     * @param {string} message - The message for the notification.
     * @param {object} options - Optional options for the notification.
     * @returns {Promise<any>}
     */
    notify(message: string, options?: object): Promise<any>;
    /**
     * Runs the cli.
     *
     * @returns {Promise<any>}
     */
    run(): Promise<any>;
    /**
     * Exits the cli with an given status code, message / error.
     *
     * @param {number} status - The status code to exit with (defaults to "0").
     * @param {string} message - The message to exit with.
     * @param {Error} error - The error to exit with.
     * @returns {Promise}
     */
    exit(status?: number, message?: string, error?: Error): Promise<void>;
}
