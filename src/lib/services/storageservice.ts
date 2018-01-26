import * as Configstore from 'configstore'
import { Service, Inject } from '../container'

export interface StorageOptions extends Configstore.ConfigstoreOptions {}

@Service('StorageService')
export class StorageService {
    /* --- constants --- */

    /* --- properties --- */

    @Inject('name') private name: string

    @Inject('version') private version: string

    private defaults: object = {}

    private options: StorageOptions = {}

    private storage: Configstore = null

    /* --- constructor --- */

    /* --- protected --- */

    /* --- public --- */

    /**
     * Creates a new storage object.
     *
     * @returns {void}
     */
    public create(): void {
        this.storage = new Configstore(this.name, this.defaults, this.options)
        this.storage.set('version', this.version)
    }

    /**
     * Returns all stored items.
     *
     * @returns {object}
     */
    public all(): object {
        if (this.storage === null) {
            throw new Error('No storage created.')
        }

        return this.storage.all
    }

    /**
     * Returns the size of all stored items.
     *
     * @returns {number}
     */
    public size(): number {
        if (this.storage === null) {
            throw new Error('No storage created.')
        }

        return this.storage.size
    }

    /**
     * Returns the path to the config file.
     *
     * @returns {number}
     */
    public path(): string {
        if (this.storage === null) {
            throw new Error('No storage created.')
        }

        return this.storage.path
    }

    /**
     * Returns the value of the given key.
     *
     * @param {string} key - The key to search for in storage.
     * @returns {any}
     */
    public get(key: string): any {
        if (this.storage === null) {
            throw new Error('No storage created.')
        }

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
        if (this.storage === null) {
            throw new Error('No storage created.')
        }

        this.storage.set(key, value)
    }

    /**
     * Checks if an item is stored for the given key.
     *
     * @param {string} key - The key to search for in storage.
     * @returns {boolean}
     */
    public has(key: string): boolean {
        if (this.storage === null) {
            throw new Error('No storage created.')
        }

        return this.storage.has(key)
    }

    /**
     * Deletes the item for the given key in storage.
     *
     * @param {string} key - The key to search for in storage.
     * @returns {void}
     */
    public delete(key: string): void {
        if (this.storage === null) {
            throw new Error('No storage created.')
        }

        this.storage.delete(key)
    }

    /**
     * Clears the complete storage.
     *
     * @returns {void}
     */
    public clear(): void {
        if (this.storage === null) {
            throw new Error('No storage created.')
        }

        this.storage.clear()
    }
}
