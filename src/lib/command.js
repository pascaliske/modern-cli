export default class Command {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the cli command
     *
     * @param {String} name
     * @param {String} description
     * @return {Command}
     */
    constructor(name, description='') {
        this.name = name;
        this.description = description;
        this.subcommands = [];
    }

    /* --- protected --- */

    /* --- public --- */
}
