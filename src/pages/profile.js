import Page from "./page.js"
import query from "../query.js"
import StatistiqueSection from "../components/statistique_section.js"
import GraphSection from "../components/graph_section.js"
import { session_expire, GraphiQL_Request, logout, numLoad } from "../helper/utils.js"    

export default class Profile extends Page {
    constructor() {
        super()
        this.token = null
        this.user = {}
        this.statistics = new StatistiqueSection()
        this.graphics = new GraphSection()
    }

    async initUser() {
        if (session_expire()) {
            window.location.href = "/login"
            return
        }

        
        try {
            this.token = document.cookie
            const response = await GraphiQL_Request(query.USER_INFO, this.token)
             this.user = response.data.user[0]

        } catch (error) {
            logout()
            console.error('Promise rejected:', error)
        }
    }

    async renderComponents() {
        const btn = document.querySelector(".btn")
        btn.addEventListener('click', () => {
            logout()
        })

        await this.statistics.render(this.token)
        numLoad()

        await this.graphics.render(this.token)
    }

    async getHTML() {
        this.setTitle("Profile")
        await this.initUser()
        return `
                <div class="center">
                    <class class="head">
                        <div class="logo"><img class="icon-graphql" src="graphql-icon.svg" alt="">GRAPHQL</div>
                        <button type="button" class="btn">Logout <span class="material-icons-round"></span></button>
                    </class>
                </div>
                <main>
                    <div class="sidebar">
                        <div class="user">
                            <div class="image-container">
                                <img id="user-image" src="profile.png" alt="">
                            </div>
                            <div class="user-info">
                                <h3>${this.user.firstName} ${this.user.lastName}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="content">
                        <div class="no-graph">

                        </div>
                        <div class="graph">

                        </div>
                    </div>
                </main>
        `
    }
}