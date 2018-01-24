import { shell } from 'execa'
import { readFile, writeFile } from 'mz/fs'
import fetch from 'node-fetch'
import * as yargs from 'yargs'

import { Container, Service, Inject } from './container'
import { CommandObject, Arguments, Builder, PrepareFn, BuilderFn, HandlerFn } from './parser'
import { LogService } from './services/logservice'
import { HttpService } from './services/httpservice'
import { PromptService } from './services/promptservice'
import { StorageService } from './services/storageservice'

@Service()
export class Command implements CommandObject {
    /* --- constants --- */

    /* --- properties --- */

    public static command: string = 'default-name'

    public static description: string = 'default-description'

    public static aliases: Array<string>

    @Inject('root')
    public root: string

    // @Inject()
    public log: LogService

    // @Inject(HttpService)
    // public http: HttpService

    // @Inject(PromptService)
    // public prompt: PromptService

    // @Inject(StorageService)
    // public storage: StorageService

    /* --- constructor --- */

    /* --- protected --- */

    // /**
    //  * Executes a given local command.
    //  *
    //  * @param {Array} params -
    //  * @returns {Promise}
    //  */
    // protected async local(...params): Promise<any> {
    //     this.log.info('\n$', params.join(' '))

    //     const result = await shell(params, {
    //         stdio: 'inherit'
    //     })

    //     this.log.info('')

    //     return result
    // }

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

    // /**
    //  * Creates a new command from an command object.
    //  *
    //  * @static
    //  * @param {CommandObject} object - Command object describing the command.
    //  * @returns {Command}
    //  */
    // public static fromObject({ name, description, prepare, builder, handler }: CommandObject): Command {
    //     return new Command(name, description, prepare, builder, handler)
    // }
}
