import yargs from 'yargs';

export default class Environment {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes a environment inspector.
     *
     * @returns {Environment}
     */
    constructor() {
        this.yargs = yargs.options({
            env: {
                alias: 'environment',
                default: 'development'
            }
        });

        this.name = this.yargs.argv.env || 'development';
    }

    /* --- protected --- */

    /* --- public --- */

    /**
     * Checks if the given string is the curent environment.
     *
     * @param {string} name - The name to be checked.
     * @returns {bool}
     */
    is(name) {
        return this.name === name;
    }

    /**
     * Alias for is('production').
     *
     * @returns {bool}
     */
    isProd() {
        return this.is('production');
    }

    /**
     * Alias for is('development').
     *
     * @returns {bool}
     */
    isDev() {
        return this.is('development');
    }
}
