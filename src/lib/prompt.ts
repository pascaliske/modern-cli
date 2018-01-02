import { PathPrompt } from 'inquirer-path';
import inquirer from 'inquirer';
import ChalkPipe from 'inquirer-chalk-pipe'

export class Prompt {
    /* --- constants --- */

    /* --- properties --- */

    private prompt: Function;
    private questions: Array<object> = [];

    /* --- constructor --- */

    /**
     * Initializes the prompt.
     *
     * @returns {Prompt}
     */
    constructor() {
        // prepare prompt
        const prompt = inquirer.createPromptModule();
        prompt.registerPrompt('path', PathPrompt);
        prompt.registerPrompt('chalk-pipe', ChalkPipe);

        // assign prompt
        this.prompt = prompt;
    }

    /* --- protected --- */

    /* --- public --- */

    /**
     * Adds the given questions to the prompt instance.
     *
     * @param {Array} questions -
     * @returns {void}
     */
    public ask(questions: Array<object> = []): void {
        this.questions = this.questions.concat(questions);
    }

    /**
     * Starts the prompt session.
     *
     * @returns {Promise}
     */
    public start(): Promise<Array<any>> {
        return this.prompt(this.questions);
    }
}
