import yargs from 'yargs';

export default class Options {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the cli options.
     *
     * @param {string} name -
     * @param {Object} options -
     */
    constructor(name, options={}) {
        const defaults = {};

        this.name = name;
        this.yargs = yargs.options(Object.assign({}, defaults, options));
        this.options = this.yargs.argv;
    }

    /* --- protected --- */

    /* --- public --- */

    /**
     * Returns a single option value.
     *
     * @param {string} key -
     * @returns {string}
     */
    get(key) {
        return this.options[key];
    }

    /**
     * Returns all option values.
     *
     * @returns {Object}
     */
    all() {
        return this.options;
    }
}
