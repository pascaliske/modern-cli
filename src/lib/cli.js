import path from 'path';
import { padEnd, upperFirst } from 'lodash';
import { isCI } from 'ci-info';
import notifier from 'node-notifier';
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
        const execute = ::this.help;

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
     * @param {String} command
     * @param {String} subcommand
     * @param {Object} options
     * @return {Promise}
     */
    async executeCommand(command=false, subcommand=false, options) {
        if (!command || !this.commands[command]) {
            throw new Error(`No command "${command}" specified!`);
        }

        // get command from name
        command = this.commands[command];

        // inject logger and options into command
        command.log = this.log;
        command.env = this.env;
        command.options = options;

        // display command name and version
        this.log.bold(`${command.name} v${this.version}`);
        this.log('🔥  let\'s go!');

        try {
            let fn = 'execute';
            if (subcommand !== false) {
                fn = `execute${upperFirst(subcommand)}`
            }

            // execute command
            if (command[fn] && typeof command[fn] === 'function') {
                await command[fn].call(command, options);
            } else {
                throw new Error(`The command "${command.name}" doesn't have an executor called "${fn}".`);
            }

            // done
            this.log.bold('🎉  we\'re done, my friend! put down your ☕️  and carry on coding!');
        } catch(e) {
            this.log.red('Something went wrong!');
            this.log.red(`😔  ${e.message}`);
            process.exit(1);
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
     * Notifies the user
     *
     * @param {String} message
     * @param {Object} options
     * @return {Promise}
     */
    async notify(message, options={}) {
        if (!process.stdout.isTTY || isCI) {
            return;
        }

        // temporarily disable debugging
        const debug = process.env.DEBUG;
        process.env.DEBUG = undefined;

        // promisify node-notifier
        const promise = new Promise((resolve, reject) => {
            notifier.notify({
                title: `${this.name}@${this.version}`,
                message: message || 'Done.',
                sound: Boolean(options.sound) || false
            }, (error, result) => {
                if (error) {
                    reject(new Error(error));
                }
                resolve(result);
            });
        });

        // re-enable debugging and return
        return promise.then(() => process.env.DEBUG = debug);
    }

    /**
     * Executes the cli command
     *
     * @return {Promise}
     */
    async run() {
        const [ command, subcommand = false ] = (this.args.get(0) || 'help').split(':');
        const options = new Options(this.options);

        try {
            // display help screen
            if (command === 'help' || options.get('help') || options.get('h')) {
                await this.help(options);
                process.exit(0);
            }

            // execute command
            await this.executeCommand(command, subcommand, options);

            // notify user of successful execution
            await this.notify(`🎉 Command "${this.args.get(0)}" executed successfully!`);

            // exit process
            process.exit(0);
        } catch(e) {
            this.log.red(`Error: ${e.message}`);
            this.log.red('You can display the help with the flag "-h" or the subcommand "help".');
            await this.notify('😔 An error occured!');
            process.exit(1);
        }
    }
}
