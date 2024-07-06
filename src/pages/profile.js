import Page from "./page.js"
import { session_expire, GraphiQL_Request, parseJWT } from "../../helper/utils.js"    

export default class Profile extends Page {
    constructor() {
        super()
        this.setTitle("Profile")
        this.token = null
        this.user = {}
    }

    initUser() {
        if (session_expire()) {
            window.location.href = "/login"
        }
        this.token = document.cookie
    }

    async renderComponents() {
        const id = parseJWT(this.token).sub
        const query = `
            {
                object(where: { id: { _eq: ${id} }}) {
                    name
                    type
                }
            }
        `
        console.log(query)
        const response = await GraphiQL_Request(query, this.token)
        console.log(response)
    }

    async getHTML() {
        this.initUser()
        return `
        <div class="profile">
            <h1>Profile</h1>
            <div id="profile__info"></div>
        </div>
        `
    }
}