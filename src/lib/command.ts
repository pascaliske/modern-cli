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

    @Inject('root') public root: string

    @Inject('LogService') public log: LogService

    @Inject('HttpService') public http: HttpService


    @Inject('PromptService') public prompt: PromptService

    @Inject('StorageService') public storage: StorageService

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

    public builder(args: Builder): Builder {
        // silence is golden
        return args
    }

    public async handler(args: Arguments): Promise<void> {
        // silence is golden
    }
}
