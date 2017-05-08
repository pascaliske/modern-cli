import Logger from './logger';
import Prompt from './prompt';
import { shell } from 'execa';

export default class Command {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the cli command
     *
     * @param {String} name
     * @param {String} description
     * @param {Function} execute
     * @return {Command}
     */
    constructor(name, description='', execute=null) {
        this.name = name;
        this.description = description;

        if (execute !== null) {
            this.execute = execute;
        }
    }

    /* --- protected --- */

    /**
     * Executes a given local command
     *
     * @param {Array} params
     * @return {Promise}
     */
    async local(...params) {
        this.log('Executing local shell command')
        this.log.raw(Logger.grey('\n$', params.join(' ')));

        const result = await shell(params, {
            stdio: 'inherit'
        });

        this.log.raw('\n');

        return result;
    }

    /**
     * Fetches necessary data from user
     *
     * @param {Array}
     * @return {Promise}
     */
    async prompt(questions=[]) {
        try {
            // create new prompt instance
            const prompt = new Prompt();

            // set questions to prompt
            prompt.ask(questions);

            // start prompting for answers
            return await prompt.start();
        } catch(err) {
            console.error(err.message);
            process.exit(1);
        }
    }

    /* --- public --- */
}
