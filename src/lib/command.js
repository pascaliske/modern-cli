import Prompt from './prompt';

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
            console.error(err);
            process.exit(1);
        }
    }

    /* --- public --- */
}
