import * as execa from 'execa';
export declare class ShellService {
    private log;
    constructor();
    /**
     * Executes a given local command.
     *
     * @param {Array} params - The command with params to execute.
     * @returns {Promise<execa.ExecaReturns>}
     */
    local(...params: Array<string>): Promise<execa.ExecaReturns>;
}
