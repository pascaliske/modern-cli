import yargs from 'yargs';

export default class Arguments {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the cli arguments.
     *
     * @returns {Arguments}
     */
    constructor() {
        this.yargs = yargs;
        this.args = this.yargs.argv._;
    }

    /* --- protected --- */

    /* --- public --- */

    /**
     * Returns a single argument based on the index.
     *
     * @param {string} key - They key to be returned.
     * @returns {string}
     */
    get(key) {
        return this.args[key];
    }

    /**
     * Returns all argument values.
     *
     * @returns {Object}
     */
    all() {
        return this.args;
    }
}
