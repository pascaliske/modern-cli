import 'reflect-metadata';
import { CommandObject, OptionObject } from './parser';
export declare class Cli {
    private name;
    private version;
    private root;
    private log;
    private notifications;
    private parser;
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
     * @param {Array<CommandObject>} commands - The commands to be added.
     * @returns {Cli}
     */
    addCommands(commands: Array<CommandObject>): Cli;
    /**
     * Register a single cli commands to the cli instance as default.
     *
     * @param {CommandObject} command - The commands to be added.
     * @returns {Cli}
     */
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
