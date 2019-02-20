export default class Team {
    #name;
    #logo;


    constructor(name) {
        this.#name = name;
    }

    get name() {
        return this.#name
    }

    get logo() {
        return this.#logo
    }

    set logo(logo) {
        this.#logo = logo
    }

}