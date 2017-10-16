import Logger from './logger';
import Prompt from './prompt';
import { shell } from 'execa';
import { readFile, writeFile } from 'mz/fs';
import { safeLoad, safeDump } from 'js-yaml';
import fetch from 'node-fetch';

export default class Command {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the cli command.
     *
     * @param {string} name -
     * @param {string} description -
     * @param {Function} execute -
     * @returns {Command}
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
     * Reads a yaml file from disk and parses it into js.
     *
     * @param {string} file - The ymal file to read and parse.
     * @returns {Object} - The parsed yaml file as object.
     */
    async readYaml(file) {
        return safeLoad(await readFile(file));
    }

    /**
     * Parses a js object and saves it to an yaml file on disk.
     *
     * @param {Object} file - The yaml file to write into.
     * @param {Object} contents - The contents to write in the yaml file.
     * @returns {Promise}
     */
    async writeYaml(file, contents) {
        await writeFile(file, safeDump(contents));
    }

    /**
     * Fetches a given url.
     *
     * @param {Array} params -
     * @returns {Promise}
     */
    async fetch(...params) {
        return fetch(...params);
    }

    /**
     * Executes a given local command.
     *
     * @param {Array} params -
     * @returns {Promise}
     */
    async local(...params) {
        this.log.raw(Logger.grey('\n$', params.join(' ')));

        const result = await shell(params, {
            stdio: 'inherit'
        });

        this.log.raw('');

        return result;
    }

    /**
     * Fetches necessary data from user.
     *
     * @param {Array} questions - The questions to ask.
     * @returns {Promise}
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
            // eslint-disable-next-line no-console
            console.error(err);
            process.exit(1);
        }
    }

    /* --- public --- */
}
