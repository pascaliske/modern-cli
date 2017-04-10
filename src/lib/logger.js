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
        // force debug to use process.env.DEBUG
        debug.enable(process.env.DEBUG);

        // initialize debug
        this.instance = debug(id);

        // register chalk styles
        this.registerStyles();

        // register spinner
        this.registerSpinner();

        // return logger instance
        return this.instance;
    }

    /* --- protected --- */

    /**
     * Registers chalk styles to logger class as static methods and on instance
     *
     * @return {void}
     */
    registerStyles() {
        for (const method in chalk.styles) {
            // register as static method
            Logger[method] = chalk[method].bind(chalk);

            // register on current instance
            this.instance[method] = (...params) => this.instance(chalk[method](...params));
        }
    }

    /**
     * Registers a spinner as static method and on instance
     *
     * @return {void}
     */
    registerSpinner() {
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
        this.instance.spinner = spinner;
    }

    /* --- public --- */
}
