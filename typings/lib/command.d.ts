import { CommandObject, Arguments, Builder, PrepareFn, BuilderFn, HandlerFn } from './commandline';
import { Logger } from './logger';
import { Storage } from './storage';
export declare class Command implements CommandObject {
    name: string;
    description: string;
    aliases: Array<string>;
    root: string;
    log: Logger;
    storage: Storage;
    /**
     * Initializes the cli command.
     *
     * @param {string} name -
     * @param {string} description -
     * @param {Function} prepare -
     * @param {Function} builder -
     * @param {Function} handler -
     * @returns {Command}
     */
    constructor(name: string, description: string, prepare?: PrepareFn, builder?: BuilderFn, handler?: HandlerFn);
    /**
     * Reads a yaml file from disk and parses it into js.
     *
     * @param {string} file - The ymal file to read and parse.
     * @returns {Object} - The parsed yaml file as object.
     */
    protected readYaml(file: string): Promise<object>;
    /**
     * Parses a js object and saves it to an yaml file on disk.
     *
     * @param {Object} file - The yaml file to write into.
     * @param {Object} contents - The contents to write in the yaml file.
     * @returns {Promise}
     */
    protected writeYaml(file: string, contents: object): Promise<any>;
    /**
     * Fetches a given url.
     *
     * @param {Array} params -
     * @returns {Promise}
     */
    protected fetch(...params: any[]): Promise<any>;
    /**
     * Executes a given local command.
     *
     * @param {Array} params -
     * @returns {Promise}
     */
    protected local(...params: any[]): Promise<any>;
    /**
     * Fetches necessary data from user.
     *
     * @param {Array} questions - The questions to ask.
     * @returns {Promise}
     */
    protected prompt(questions?: Array<object>): Promise<Array<any>>;
    prepare(): void;
    builder(args: Builder): Builder;
    handler(args: Arguments): Promise<void>;
    /**
     * Creates a new command from an command object.
     *
     * @static
     * @param {CommandObject} object - Command object describing the command.
     * @returns {Command}
     */
    static fromObject({name, description, prepare, builder, handler}: CommandObject): Command;
}
