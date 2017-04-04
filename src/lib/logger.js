import debug from 'debug';
import chalk from 'chalk';

export default class Logger {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the logger
     *
     * @param  [String] id
     */
    constructor(id) {
        // register chalk styles to logger class as static methods
        for (const method in chalk.styles) {
            Logger[method] = (...params) => chalk[method](...params);
        }

        // return logger instance
        return debug(id);
    }

    /* --- protected --- */

    /* --- public --- */
}
