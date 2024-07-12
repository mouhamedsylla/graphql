import Page from "./page.js"

export default class Error extends Page {
    constructor() {
        super()
    }

    async getHTML() {
        this.setTitle("Error")
        return `
        <div class="error">
            <h1>Error</h1>
            <p>Page not found</p>
        </div>
        `
    }
}