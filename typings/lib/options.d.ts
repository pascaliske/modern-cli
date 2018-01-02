export declare class Options {
    private options;
    /**
     * Initializes the cli options.
     *
     * @param {Object} options -
     * @returns {Options}
     */
    constructor(options?: object);
    /**
     * Returns a single option value.
     *
     * @param {string} key -
     * @returns {string}
     */
    get(key: string): string;
    /**
     * Returns all option values.
     *
     * @returns {Object}
     */
    all(): object;
}
