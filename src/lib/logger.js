import debug from 'debug';
import chalk from 'chalk';
import Spinner from 'ora';

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

        // register war logger
        this.registerRaw();

        // register indentation helpers
        this.registerIndentHelpers();

        // register chalk styles
        this.registerStyles();

        // register spinner
        this.registerSpinner();

        // register counter
        this.registerCounter();

        // return logger instance
        return this.instance;
    }

    /* --- protected --- */

    /**
     * Registers raw logging
     *
     * @return {void}
     */
    registerRaw() {
        this.instance.raw = (...params) => {
            if (this.indentation > 0) {
                let indentation = '';
                for (let i = 1; i < this.indentation; i++) {
                    indentation += ' ';
                }

                params.unshift(indentation);
            }

            console.log.apply(chalk, params);
        };
    }

    /**
     * Registers indentation helpers for raw logging
     *
     * @return {void}
     */
    registerIndentHelpers() {
        this.indentation = 0;
        this.instance.indent = (value=3) => {
            this.indentation = this.indentation + value;
        };
        this.instance.outdent = (value=3) => {
            if ((this.indentation - value) >= 0) {
                this.indentation = this.indentation - value;
            } else {
                this.indentation = 0;
            }
        };
    }

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
                text: text || 'waiting...',
                spinner: 'line',
                interval: 5
            };
            return new Spinner(options);
        }

        // register as static method
        Logger.spinner = spinner;

        // register on current instance
        this.instance.spinner = spinner;
    }

    /**
     * Registers a counter for logging multiple steps
     *
     * @return {void}
     */
    registerCounter() {
        this.count = false;
        this.counterFrom = 1;
        this.counterTo = 1;
        this.instance.count = (counterTo=1) => {
            this.count = true;
            this.counterFrom = 1;
            this.counterTo = counterTo;
        };
        this.instance.countEnd = () => {
            this.count = false;
            this.counterFrom = 1;
            this.counterTo = 1;
        };
    }

    /* --- public --- */
}
