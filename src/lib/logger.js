import debug from 'debug';
import chalk from 'chalk';
import { Spinner } from 'cli-spinner';

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

        // register spinner
        this.registerSpinner(instance);

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

    /**
     * Registers a spinner as static method and on instance
     *
     * @param {Logger} instance
     * @return {void}
     */
    registerSpinner(instance) {
        // build spinner
        const spinner = text => {
            const options = {
                text: text || '%s waiting...'
            };
            return new Spinner(options);
        }

        // register as static method
        Logger.spinner = spinner;

        // register on current instance
        instance.spinner = spinner;
    }

    /* --- public --- */
}
