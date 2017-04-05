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
        const instance = debug(id);

        // register chalk styles
        this.registerStyles(instance);

        // return logger instance
        return instance;
    }

    /* --- protected --- */

    /**
     * Registers chalk styles to logger class as static methods and on instance
     *
     * @param {Logger} instance
     * @return {void}
     */
    registerStyles(instance) {
        for (const method in chalk.styles) {
            // build handler for color
            const handler = (...params) => chalk[method](...params);

            // register as static method
            Logger[method] = handler;

            // register on current instance
            instance[method] = handler;
        }
    }

    /* --- public --- */
}
