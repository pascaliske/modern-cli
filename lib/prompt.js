import inquirer from 'inquirer';

export default class Prompt {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the prompt
     */
    constructor() {
        this.questions = [];
        this.inquirer = inquirer;
    }

    /* --- protected --- */

    /* --- public --- */

    ask(questions=[]) {
        this.questions = this.questions.concat(questions);
    }

    start() {
        return this.inquirer.prompt(this.questions);
    }
}
