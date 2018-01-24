/// <reference types="inquirer" />
import * as inquirer from 'inquirer';
export interface PromptQuestion extends inquirer.Question {
}
export declare class Prompt {
    private prompt;
    private questions;
    /**
     * Initializes the prompt.
     *
     * @returns {Prompt}
     */
    constructor();
    /**
     * Adds the given questions to the prompt instance.
     *
     * @param {Array<PromptQuestion>} questions -
     * @returns {void}
     */
    ask(questions?: Array<PromptQuestion>): void;
    /**
     * Starts the prompt session.
     *
     * @returns {Promise}
     */
    start(): Promise<inquirer.Answers>;
}
