export default class Command {
    /* --- globals --- */

    /* --- constants --- */

    /* --- constructor --- */

    /**
     * Initializes the cli command
     *
     * @return {Command}
     */
    constructor(id) {
        this.id = id;
        this.subcommands = [];
    }

    /* --- protected --- */

    /* --- public --- */
}
