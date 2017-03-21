import yargs from 'yargs';

export default class Environment {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes a environment inspector
     *
     * @return {Environment}
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
     * Checks if the given string is the curent environment
     *
     * @param  {String} name
     * @return {Boolean}
     */
    is(name) {
        return this.name === name;
    }

    /**
     * Alias for is('production')
     *
     * @return {Boolean}
     */
    isProd() {
        return this.is('production');
    }

    /**
     * Alias for is('development')
     *
     * @return {Boolean}
     */
    isDev() {
        return this.is('development');
    }
}
