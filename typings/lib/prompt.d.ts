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
     * @param {Array} questions -
     * @returns {void}
     */
    ask(questions?: Array<object>): void;
    /**
     * Starts the prompt session.
     *
     * @returns {Promise}
     */
    start(): Promise<Array<any>>;
}
