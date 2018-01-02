export declare class Environment {
    static readonly DEVELOPMENT: string;
    static readonly PRODUCTION: string;
    private current;
    constructor();
    /**
     * Returns the current environment.
     *
     * @returns {string}
     */
    get(): string;
    /**
     * Compares the given environment against the current one.
     *
     * @param {string} name -
     * @returns {boolean}
     */
    is(name: string): boolean;
    /**
     * Checks if the current environment is production.
     *
     * @returns {boolean}
     */
    isProd(): boolean;
    /**
     * Checks if the current environment is development.
     *
     * @returns {boolean}
     */
    isDev(): boolean;
}
