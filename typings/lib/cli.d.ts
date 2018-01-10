import { CommandObject, OptionObject } from './commandline';
export declare class Cli {
    private name;
    private version;
    private root;
    private log;
    private commandline;
    private storage;
    /**
     * Initializes the cli instance.
     *
     * @param {string} name - The name of the cli
     * @param {string} version - The cli version.
     * @param {boolean} storage - Need the cli a global storage.
     * @returns {Cli}
     */
    constructor(name?: string, version?: string, storage?: boolean);
    private findRoot();
    /**
     * Notifies the user with node-notifier.
     *
     * @param {string} message - The message for the notification.
     * @param {object} options - Optional options for the notification.
     * @returns {Promise<any>}
     */
    protected notify(message: string, options?: object): Promise<any>;
    /**
     * Exits the cli with an given status code, message / error.
     *
     * @param {number} status - The status code to exit with (defaults to "0").
     * @param {string} message - The message to exit with.
     * @returns {Promise}
     */
    protected exit(status?: number, message?: any): Promise<void>;
    /**
     * Register cli commands to the cli instance.
     *
     * @param {Array<Command>} commands - The commands to be added.
     * @returns {Cli}
     */
    addCommands(commands: Array<CommandObject>): Cli;
    addSingleCommand(command: CommandObject): Cli;
    /**
     * Defines cli options.
     *
     * @param {Array} options -
     * @returns {Cli}
     */
    addOptions(options?: Array<OptionObject>): Cli;
    /**
     * Runs the cli.
     *
     * @returns {Promise<any>}
     */
    run(): Promise<any>;
}
