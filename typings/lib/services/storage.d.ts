import * as Configstore from 'configstore';
export interface StorageOptions extends Configstore.ConfigstoreOptions {
}
export declare class StorageService {
    private name;
    private version;
    private defaults;
    private options;
    private storage;
    /**
     * Initializes the cli storage.
     *
     * @param {string} name -
     * @param {string} version -
     * @returns {Storage}
     */
    constructor(name: string, version: string);
    /**
     * Creates a storage instance.
     *
     * @returns {void}
     */
    create(): void;
    /**
     * Returns all stored items.
     *
     * @returns {object}
     */
    all(): object;
    /**
     * Returns the size of all stored items.
     *
     * @returns {number}
     */
    size(): number;
    /**
     * Returns the path to the config file.
     *
     * @returns {number}
     */
    path(): string;
    /**
     * Returns the value of the given key.
     *
     * @param {string} key - The key to search for in storage.
     * @returns {any}
     */
    get(key: string): any;
    /**
     * Stores a new item in the storage with given key.
     *
     * @param {string} key - The key to store into.
     * @param {any} value - The value to store.
     * @returns {void}
     */
    set(key: string, value: any): void;
    /**
     * Checks if an item is stored for the given key.
     *
     * @param {string} key - The key to search for in storage.
     * @returns {boolean}
     */
    has(key: string): boolean;
    /**
     * Deletes the item for the given key in storage.
     *
     * @param {string} key - The key to search for in storage.
     * @returns {void}
     */
    delete(key: string): void;
    /**
     * Clears the complete storage.
     *
     * @returns {void}
     */
    clear(): void;
}