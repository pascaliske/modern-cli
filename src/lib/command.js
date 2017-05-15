import Logger from './logger';
import Prompt from './prompt';
import { shell } from 'execa';
import fetch from 'node-fetch';
import { readFile, writeFile } from 'mz/fs';
import { safeLoad, safeDump } from 'js-yaml';

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
     * Reads a yaml file from disk and parses it into js
     *
     * @param {String} file
     * @return {Object}
     */
    async readYaml(file) {
        return safeLoad(await readFile(file));
    }

    /**
     * Parses a js object and saves it to an yaml file on disk
     *
     * @param {Object} file
     * @return {Promise}
     */
    async writeYaml(file, contents) {
        await writeFile(file, safeDump(contents));
    }

    /**
     * Fetches a given url
     *
     * @param {Array} params
     * @return {Promise}
     */
    async fetch(...params) {
        return fetch(...params);
    }

    /**
     * Executes a given local command
     *
     * @param {Array} params
     * @return {Promise}
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
