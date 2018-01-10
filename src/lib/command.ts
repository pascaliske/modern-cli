import { shell } from 'execa'
import { readFile, writeFile } from 'mz/fs'
import { safeLoad, safeDump } from 'js-yaml'
import fetch from 'node-fetch'
import * as yargs from 'yargs'
import { CommandObject, Arguments, Builder, PrepareFn, BuilderFn, HandlerFn } from './commandline'
import { Logger } from './logger'
import { Prompt } from './prompt'
import { Storage } from './storage'

export class Command implements CommandObject {
    /* --- constants --- */

    /* --- properties --- */

    public name: string

    public description: string

    public aliases: Array<string>

    public root: string

    public log: Logger

    public storage: Storage

    /* --- constructor --- */

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
    constructor(name: string, description: string, prepare: PrepareFn = null, builder: BuilderFn = null, handler: HandlerFn = null) {
        this.name = name || ''
        this.description = description || ''

        if (prepare !== null) {
            this.prepare = prepare.bind(this)
        }

        if (builder !== null) {
            this.builder = builder.bind(this)
        }

        if (handler !== null) {
            this.handler = handler.bind(this)
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

    public prepare(): void {
    }

    public builder(args: Builder): Builder {
        console.log('default builder', args)
        return args
    }

    public async handler(args: Arguments): Promise<void>  {
        console.log('default handler', args)
    }

    /**
     * Creates a new command from an command object.
     *
     * @static
     * @param {CommandObject} object - Command object describing the command.
     * @returns {Command}
     */
    public static fromObject({ name, description, prepare, builder, handler }: CommandObject): Command {
        return new Command(name, description, prepare, builder, handler)
    }
}
