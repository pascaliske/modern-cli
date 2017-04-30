import path from 'path';
import { padEnd } from 'lodash';
import Environment from './environment';
import Logger from './logger';
import Arguments from './arguments';
import Options from './options';
import Command from './command';

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
    constructor(name=path.basename(module.id), version='1.0.0') {
        process.env.DEBUG = `${name}*`;
        this.name = name;
        this.version = version;
        this.env = new Environment();
        this.log = new Logger(name);
        this.args = new Arguments();
        this.commands = {};
        this.options = {};

        // add help command and option
        this.registerHelp();
    }

    /* --- protected --- */

    /**
     * Pre-registers the help command and option to the cli
     *
     * @return {void}
     */
    registerHelp() {
        const name = 'help';
        const description = 'Displays a help message and all available commands and options.';
        const execute = this.help.bind(this);

        // add help command
        this.addCommands([
            {
                name: name,
                description: description,
                execute: execute
            }
        ]);

        // add help option
        this.addOptions([
            {
                name: 'h',
                alias: name,
                description: description
            }
        ]);
    }

    /**
     * Displays the help message
     *
     * @param {Options} options
     * @return {void}
     */
    async help(options) {
        const output = [];
        let minWidth = 0;

        // calculate left column width
        for (const name in this.commands) {
            const cmd = this.commands[name];

            if (cmd.name.length > minWidth) {
                minWidth = cmd.name.length;
            }
        }
        for (const name in this.options) {
            const option = this.options[name];
            const leftCol = `-${option.name}, --${option.alias}`;

            if (leftCol.length > minWidth) {
                minWidth = leftCol.length;
            }
        }

        // build usage section
        output.push('Usage:');
        output.push(`   $ ${this.name} <command> [options...]`);

        // build commands section
        output.push('\nCommands:');
        for (const name in this.commands) {
            const cmd = this.commands[name];
            output.push(`   ${padEnd(cmd.name, (minWidth + 3))}${cmd.description || ''}`);
        }

        // build options section
        output.push('\nOptions:');
        for (const name in this.options) {
            const option = this.options[name];
            const leftCol = `-${option.name}, --${option.alias}`;
            output.push(`   ${padEnd(leftCol, (minWidth + 3))}${option.description || ''}`);
        }

        // build copyright section
        output.push('\nCopyright (c) Pascal Iske');

        // output help message
        this.log.bold(`help v${this.version}`);
        this.log(output.join('\n'));
    }

    /**
     * Executes a cli command
     *
     * @param {String} name
     * @param {Options} options
     * @return {void}
     */
    async executeCommand(name=false, options) {
        if (!name || !this.commands[name]) {
            throw new Error(`No command "${name}" specified!`);
        }

        // get command from name
        const command = this.commands[name];

        // inject options into command
        command.options = options;

        // execute command
        if (typeof command.execute === 'function') {
            // display command name and version
            this.log.bold(`${command.name} v${this.version}`);
            this.log('🔥  let\'s go!');

            try {
                // execute command
                await this.commands[name].execute.call(this, options);
                // done
                this.log.bold('🎉  we\'re done, my friend! put down your ☕️  and carry on coding!');
            } catch(e) {
                this.log.red(`Error: ${e.message}`);
                this.log.red('😔  something went wrong!');
                process.exit(1);
            }
        }
    }

    /* --- public --- */

    /**
     * Defines cli commands
     *
     * @param {Array} commands
     * @return {Cli}
     */
    addCommands(commands=[]) {
        for (const item of commands) {
            const { name, description, execute } = item;

            if (item instanceof Command) {
                this.commands[name] = item;
            } else {
                this.commands[name] = new Command(name, description, execute);
            }
        }

        return this;
    }

    /**
     * Defines cli options
     *
     * @param {Array} options
     * @return {Cli}
     */
    addOptions(options=[]) {
        for (const option of options) {
            this.options[option.name] = option;
        }

        return this;
    }

    /**
     * Executes the cli command
     *
     * @return {Promise}
     */
    async run() {
        const command = this.args.get(0) || 'help';
        const options = new Options(this.options);

        try {
            // display help screen
            if (command === 'help' || options.get('help') || options.get('h')) {
                await this.help(options);
                process.exit(0);
            }

            // execute command
            await this.executeCommand(command, options);
        } catch(e) {
            this.log.bold(`v${this.version}`);
            this.log.red(`Error: ${e.message}`);
            this.log.red('You can display the help with the flag "-h" or the subcommand "help".');
            process.exit(1);
        }
    }
}
