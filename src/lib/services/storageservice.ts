import * as Configstore from 'configstore'
import { Service, Inject } from '../container'

export interface StorageOptions extends Configstore.ConfigstoreOptions {}

@Service('StorageService')
export class StorageService {
    /* --- constants --- */

    /* --- properties --- */

    private defaults: object = {}

    private options: StorageOptions = {}

    private storage: Configstore

    /* --- constructor --- */

    /**
     * Initializes the cli storage.
     *
     * @param {string} name -
     * @param {string} version -
     * @returns {Storage}
     */
    public constructor(@Inject('name') private name: string, @Inject('version') private version: string) {}

    /* --- protected --- */

    /* --- public --- */

    /**
     * Creates a storage instance.
     *
     * @returns {void}
     */
    public create(): void {
        this.storage = new Configstore(this.name, this.defaults, this.options)

        // initially store the version number
        this.set('version', this.version)
    }

    /**
     * Returns all stored items.
     *
     * @returns {object}
     */
    public all(): object {
        return this.storage.all
    }

    /**
     * Returns the size of all stored items.
     *
     * @returns {number}
     */
    public size(): number {
        return this.storage.size
    }

    /**
     * Returns the path to the config file.
     *
     * @returns {number}
     */
    public path(): string {
        return this.storage.path
    }

    /**
     * Returns the value of the given key.
     *
     * @param {string} key - The key to search for in storage.
     * @returns {any}
     */
    public get(key: string): any {
        return this.storage.get(key)
    }

    /**
     * Stores a new item in the storage with given key.
     *
     * @param {string} key - The key to store into.
     * @param {any} value - The value to store.
     * @returns {void}
     */
    public set(key: string, value: any): void {
        this.storage.set(key, value)
    }

    /**
     * Checks if an item is stored for the given key.
     *
     * @param {string} key - The key to search for in storage.
     * @returns {boolean}
     */
    public has(key: string): boolean {
        return this.storage.has(key)
    }

    /**
     * Deletes the item for the given key in storage.
     *
     * @param {string} key - The key to search for in storage.
     * @returns {void}
     */
    public delete(key: string): void {
        this.storage.delete(key)
    }

    /**
     * Clears the complete storage.
     *
     * @returns {void}
     */
    public clear(): void {
        this.storage.clear()
    }
}
