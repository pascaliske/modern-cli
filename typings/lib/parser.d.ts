import * as yargs from 'yargs';
export declare enum Mode {
    SINGLE = "single",
    MULTIPLE = "multiple",
}
export declare type PrepareFn = () => void;
export declare type BuilderFn = (args: Builder) => Builder;
export declare type HandlerFn = (args: Arguments) => Promise<void>;
export interface Builder extends yargs.Argv {
}
export interface Arguments extends yargs.Arguments {
}
export interface CommandObject {
    prepare?: PrepareFn;
    builder?: BuilderFn;
    handler?: HandlerFn;
}
export interface OptionObject extends yargs.Options {
    key: string;
}
export declare class Parser {
    private name;
    private version;
    private log;
    private yargs;
    private args;
    private mode;
    private locked;
    /**
     * Initializes the command line parser.
     *
     * @returns {CommandLine}
     */
    constructor();
    /**
     * Displays an error message if the yargs parser failed.
     *
     * @param {string} message - The error message.
     * @param {Error} error - The error directly.
     * @returns{void}
     */
    private fail(message, error);
    /**
     * Adds an command to the cli.
     *
     * @param {CommandObject} command -
     * @returns {void}
     */
    addCommand({name, command, description}: any): Builder;
    /**
     * Adds an option to the cli.
     *
     * @param {OptionObject} option -
     * @returns {void}
     */
    addOption(option: OptionObject): Builder;
    /**
     * Parses the command line and returns the parsed arguments.
     *
     * @returns {Promise<Arguments>}
     */
    parse(): Promise<Arguments>;
    /**
     * Checks if the command line is locked.
     *
     * @returns {boolean}
     */
    isLocked(): boolean;
    /**
     * Locks the command line.
     *
     * @returns {void}
     */
    lock(): void;
    /**
     * Unlocks the command line.
     *
     * @returns {void}
     */
    unlock(): void;
    setMode(mode: Mode): void;
}
