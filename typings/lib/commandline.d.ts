import * as yargs from 'yargs';
import { Logger } from './logger';
import { Storage } from './storage';
export declare enum Mode {
    SINGLE = "single",
    MULTIPLE = "multiple",
}
export interface PrepareFn {
    (): void;
}
export interface BuilderFn {
    (args: Builder): Builder;
}
export interface HandlerFn {
    (args: Arguments): Promise<void>;
}
export interface Builder extends yargs.Argv {
}
export interface Arguments extends yargs.Arguments {
}
export interface CommandObject extends yargs.CommandModule {
    name: string;
    description: string;
    aliases?: Array<string>;
    root?: string;
    log?: Logger;
    storage?: Storage;
    prepare?: PrepareFn;
    builder: BuilderFn;
    handler: HandlerFn;
}
export interface OptionObject extends yargs.Options {
    key: string;
}
export declare class CommandLine {
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
    constructor(log: Logger, name: string, version: string);
    /**
     * Adds an command to the cli.
     *
     * @param {CommandObject} command -
     * @returns {void}
     */
    addCommand(command: CommandObject): Builder;
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
