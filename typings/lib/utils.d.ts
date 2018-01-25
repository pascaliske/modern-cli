/**
 * Finds the name field of the package json file of the current project.
 *
 * @param {string} override - Possibility to override the name field.
 * @returns {string}
 */
export declare const findName: (override?: string, fallback?: string) => string;
/**
 * Finds the version field of the package json file of the current project.
 *
 * @param {string} override - Possibility to override the version field.
 * @returns {string}
 */
export declare const findVersion: (override?: string) => string;
/**
 * Finds the project root of the highest executing node module.
 *
 * @returns {string}
 */
export declare const findRoot: () => string;
/**
 * Reads a yaml file from disk and parses it into js.
 *
 * @param {string} file - The yaml file to read and parse.
 * @returns {Promise<object>} - The parsed yaml file as object.
 */
export declare const readYaml: (file: string) => Promise<object>;
/**
 * Parses a js object and saves it to an yaml file on disk.
 *
 * @param {Object} file - The yaml file to write into.
 * @param {Object} contents - The contents to write in the yaml file.
 * @returns {Promise}
 */
export declare const writeYaml: (file: string, contents: object) => Promise<void>;
