import { basename, dirname } from 'path'
import { sync as findPackage } from 'pkg-up'
import { sync as readPackage } from 'read-pkg-up'
import { readFile, writeFile } from 'mz/fs'
import { safeLoad, safeDump } from 'js-yaml'

/**
 * Finds the name field of the package json file of the current project.
 *
 * @param {string} override - Possibility to override the name field.
 * @returns {string}
 */
export const findName = (override: string = null, fallback: string = null): string => {
    return override || readPackage(__dirname).name || fallback
}

/**
 * Finds the version field of the package json file of the current project.
 *
 * @param {string} override - Possibility to override the version field.
 * @returns {string}
 */
export const findVersion = (override: string = null): string => {
    return override || readPackage(__dirname).version || '1.0.0'
}

/**
 * Finds the project root of the highest executing node module.
 *
 * @returns {string}
 */
export const findRoot = (): string => {
    const findHighestModule = (): NodeModule => {
        const stack = [module]
        let parent = module.parent
        let current

        for (; parent; parent = parent.parent) {
            stack.push(parent)
        }

        while ((current = stack.pop()) != null) {
            try {
                return current
            } catch (ex) {}
        }
    }
    const { filename } = findHighestModule()

    return dirname(findPackage(filename))
}

/**
 * Reads a yaml file from disk and parses it into js.
 *
 * @param {string} file - The yaml file to read and parse.
 * @returns {Promise<object>} - The parsed yaml file as object.
 */
export const readYaml = async (file: string): Promise<object> => {
    return safeLoad(await readFile(file))
}

/**
 * Parses a js object and saves it to an yaml file on disk.
 *
 * @param {Object} file - The yaml file to write into.
 * @param {Object} contents - The contents to write in the yaml file.
 * @returns {Promise}
 */
export const writeYaml = async (file: string, contents: object): Promise<void> => {
    await writeFile(file, safeDump(contents))
}
