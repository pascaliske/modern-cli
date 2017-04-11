import Environment from './environment';
import Logger from './logger';
import Arguments from './arguments';
import Options from './options';
import Prompt from './prompt';

export default class Cli {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the cli
     *
     * @param {String} name
     * @param {String} version
     */
    constructor(name, version) {
        this.name = name;
        this.version = version;
        this.env = new Environment();
        this.log = new Logger(name);
        this.args = new Arguments();
        this.commands = {};
        this.options = {};
    }

    /* --- protected --- */

    /* --- public --- */

    /**
     * Defines cli commands
     *
     * @param {Object} commands
     * @return {void}
     */
    addCommands(commands={}) {
        for (const id in commands) {
            const fn = (typeof commands[id] === 'function') ? commands[id] : commands[id].fn;

            this.commands[id] = { id, fn };
        }
    }

    /**
     * Defines cli options
     *
     * @param {Object} options
     * @return {void}
     */
    addOptions(options={}) {
        for (const id in options) {
            this.options[id] = options[id];
        }
    }

    /**
     * Executes the cli command
     *
     * @return {Promise}
     */
    async execute() {
        const options = new Options(this.options);

        const command = this.args.args[0] || 'help';
        const subcommand = this.args.args[1] || false;

        this.log.bold(`${command} ${subcommand} v${this.version}`);

        if (this.commands[command]) {
            await this.commands[command].fn.call(this, options);
        }
    }
}
