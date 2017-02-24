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
    constructor(args={}) {
        const defaults = {
            h: {
                alias: 'help',
                description: 'Displays help message.'
            }
        };

        this.yargs = yargs;
        this.args = this.yargs
            .usage('Usage: $0')
            .help('h')
            .options(Object.assign({}, defaults, args))
            .argv;
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
