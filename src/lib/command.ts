import { shell } from 'execa'
import { readFile, writeFile } from 'mz/fs'
import { safeLoad, safeDump } from 'js-yaml'
import fetch from 'node-fetch'
import * as yargs from 'yargs'
import { CommandObject } from './commandline'
import { Logger } from './logger'
import { Prompt } from './prompt'

export class Command implements CommandObject {
    /* --- constants --- */

    /* --- properties --- */

    public name: string

    public description: string

    public aliases: Array<string>

    public builder: (yargs: yargs.Argv) => yargs.Argv

    public handler: (args: any) => void

    public log: Logger

    /* --- constructor --- */

    /**
     * Initializes the cli command.
     *
     * @param {string} name -
     * @param {string} description -
     * @param {Function} handler -
     * @returns {Command}
     */
    constructor(name: string, description: string, builder: (yargs: yargs.Argv) => yargs.Argv, handler: (args: any) => void) {
        this.name = name || ''
        this.description = description || ''
        // this.log = new Logger(name)

        if (builder) {
            this.builder = builder
        }

        if (handler) {
            this.handler = handler
        }
    }

    /* --- protected --- */

    /**
     * Reads a yaml file from disk and parses it into js.
     *
     * @param {string} file - The ymal file to read and parse.
     * @returns {Object} - The parsed yaml file as object.
     */
    protected async readYaml(file: string): Promise<object> {
        return safeLoad(await readFile(file))
    }

    /**
     * Parses a js object and saves it to an yaml file on disk.
     *
     * @param {Object} file - The yaml file to write into.
     * @param {Object} contents - The contents to write in the yaml file.
     * @returns {Promise}
     */
    protected async writeYaml(file: string, contents: object): Promise<any> {
        await writeFile(file, safeDump(contents))
    }

    /**
     * Fetches a given url.
     *
     * @param {Array} params -
     * @returns {Promise}
     */
    protected async fetch(...params): Promise<any> {
        return fetch(...params)
    }

    /**
     * Executes a given local command.
     *
     * @param {Array} params -
     * @returns {Promise}
     */
    protected async local(...params): Promise<any> {
        (<any>this.log.verbose).raw((<any>Logger).grey('\n$', params.join(' ')))

        const result = await shell(params, {
            stdio: 'inherit'
        })

        (<any>this.log.verbose).raw('')

        return result
    }

    /**
     * Fetches necessary data from user.
     *
     * @param {Array} questions - The questions to ask.
     * @returns {Promise}
     */
    protected async prompt(questions: Array<object> = []): Promise<Array<any>> {
        try {
            // create new prompt instance
            const prompt = new Prompt()

            // set questions to prompt
            prompt.ask(questions)

            // start prompting for answers
            return await prompt.start()
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err)
            process.exit(1)
        }
    }

    /* --- public --- */

    /**
     * Creates a new command from an command object.
     *
     * @static
     * @param {CommandObject} object - Command object describing the command.
     * @returns {Command}
     */
    public static fromObject({ name, description, builder, handler }: CommandObject): Command {
        return new Command(name, description, builder, handler)
    }
}
