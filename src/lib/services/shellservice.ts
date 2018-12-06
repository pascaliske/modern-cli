import * as execa from 'execa'
import { Service, Inject } from '../container'
import { LogService } from './logservice'

@Service('ShellService')
export class ShellService {
    /* --- constants --- */

    /* --- properties --- */

    @Inject('LogService') private log: LogService

    /* --- constructor --- */

    public constructor() {
        //
    }

    /* --- protected --- */

    /* --- public --- */

    /**
     * Executes a given local command.
     *
     * @param {Array} params - The command with params to execute.
     * @returns {Promise<execa.ExecaReturns>}
     */
    public async local(...params: Array<string>): Promise<execa.ExecaReturns> {
        const command = params.join(' ')
        const options: execa.Options = {
            stdio: 'inherit'
        }

        this.log.info('\n$', command)

        const result = await execa.shell(command, options)

        this.log.info('')

        return result
    }
}
