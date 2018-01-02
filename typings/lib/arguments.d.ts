export declare class Arguments {
    private arguments;
    /**
     * Initializes the cli arguments.
     *
     * @returns {Arguments}
     */
    constructor();
    /**
     * Returns a single argument based on the index.
     *
     * @param {string} key - They key to be returned.
     * @returns {string}
     */
    get(key: string): string;
    /**
     * Returns all argument values.
     *
     * @returns {Array}
     */
    all(): Array<string>;
}
