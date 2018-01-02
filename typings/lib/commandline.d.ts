/// <reference types="yargs" />
import * as yargs from 'yargs';
import { Logger } from './logger';
export interface CommandObject extends yargs.CommandModule {
    name: string;
    description: string;
    aliases: Array<string>;
    builder: (yargs: yargs.Argv) => yargs.Argv;
    handler: (args: any) => void;
    log: Logger;
}
export interface OptionObject extends yargs.Options {
    key: string;
}
export declare class CommandLine {
    private yargs;
    /**
     * Initializes the command line parser.
     *
     * @returns {CommandLine}
     */
    constructor();
    /**
     * Adds an command to the cli.
     *
     * @param {CommandObject} command -
     * @returns {void}
     */
    addCommand(command: CommandObject): void;
    /**
     * Adds an option to the cli.
     *
     * @param {OptionObject} option -
     * @returns {void}
     */
    addOption(option: OptionObject): void;
    /**
     * Parses the command line and returns it.
     *
     * @returns {Promise<yargs.Arguments>}
     */
    parse(): Promise<yargs.Arguments>;
}
