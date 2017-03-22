import yargs from 'yargs';

export default class Arguments {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the cli arguments
     *
     * @param  [Object] args
     */
    constructor(options={}) {
        const defaults = {
            h: {
                alias: 'help',
                description: 'Displays help message.'
            }
        };

        this.yargs = yargs
            .usage('Usage: $0')
            .help('h')
            .options(Object.assign({}, defaults, options));

        this.options = this.yargs.argv;
        this.args = this.yargs.argv._;
    }

    /* --- protected --- */

    /* --- public --- */

    /**
     * Returns a single argument value
     *
     * @param  [String] key
     * @return [Mixed]
     */
    get(key) {
        return this.options[key];
    }

    /**
     * Returns all argument values
     *
     * @return [Object]
     */
    all() {
        return this.options;
    }
}
