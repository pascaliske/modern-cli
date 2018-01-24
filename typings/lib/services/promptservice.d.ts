import * as inquirer from 'inquirer';
export interface PromptQuestion extends inquirer.Question {
    name: string;
}
export interface PromptAnswers extends inquirer.Answers {
}
export declare class PromptService {
    private prompt;
    private questions;
    /**
     * Initializes the prompt service.
     *
     * @returns {PromptService}
     */
    constructor();
    /**
     * Adds the given questions to the prompt instance.
     *
     * @param {Array<PromptQuestion>} questions -
     * @returns {PromptService}
     */
    ask(questions?: Array<PromptQuestion>): PromptService;
    /**
     * Resets the questions on the service.
     *
     * @returns {PromptService}
     */
    reset(): PromptService;
    /**
     * Starts the prompt session.
     *
     * @returns {Promise<PromptAnswers>}
     */
    start(): Promise<PromptAnswers>;
}
