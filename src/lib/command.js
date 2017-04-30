export default class Command {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the cli command
     *
     * @param {String} name
     * @param {String} description
     * @param {Function} execute
     * @return {Command}
     */
    constructor(name, description='', execute=null) {
        this.name = name;
        this.description = description;

        if (execute !== null) {
            this.execute = execute;
        }
    }

    /* --- protected --- */

    /* --- public --- */
}
