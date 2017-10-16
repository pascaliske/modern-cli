import inquirer from 'inquirer';

export default class Prompt {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the prompt.
     */
    constructor() {
        this.questions = [];
        this.inquirer = inquirer;
    }

    /* --- protected --- */

    /* --- public --- */

    /**
     * Adds the given questions to the prompt instance.
     *
     * @param {Array} questions -
     * @returns {void}
     */
    ask(questions=[]) {
        this.questions = this.questions.concat(questions);
    }

    /**
     * Starts the prompt session.
     *
     * @returns {Promise}
     */
    start() {
        return this.inquirer.prompt(this.questions);
    }
}
