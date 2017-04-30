import yargs from 'yargs';

export default class Arguments {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the cli arguments
     *
     * @return {Arguments}
     */
    constructor() {
        this.yargs = yargs;
        this.args = this.yargs.argv._;
    }

    /* --- protected --- */

    /* --- public --- */

    /**
     * Returns a single argument based on the index
     *
     * @param  [String] key
     * @return [Mixed]
     */
    get(key) {
        return this.args[key];
    }

    /**
     * Returns all argument values
     *
     * @return [Object]
     */
    all() {
        return this.args;
    }
}
