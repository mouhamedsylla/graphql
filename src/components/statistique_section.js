import { GraphiQL_Request, skills } from "../helper/utils.js"
import query from "../query.js"

export default class StatistiqueSection {
    constructor() {
        this.xp = 0
        this.technologies = []
        this.projects = []
    }

    async getStats(token) {
        // Getting the user's xp
        const user_xp_amount = (await GraphiQL_Request(query.USER_XP, token)).data.user[0].
        transactions_aggregate.aggregate.sum.amount

        this.xp = (user_xp_amount / 1000).toFixed(0)
        
       // Getting the user's technologies skills
        const technologies = (await GraphiQL_Request(query.TECHNOLOGIES_SKILLS, token)).data.transaction
        skills.forEach(skill => {
            const skills = technologies.find(tech => tech.type === skill)
            skills ?
            this.technologies.push({amount: skills.amount, skill: skill}) :
            this.technologies.push({amount: 0, skill: skill})
        })
        
        // Getting the user's working projects
        const projects = (await GraphiQL_Request(query.WORKING_PROJECTS, token)).data.user[0].groups
        projects.forEach(project => {
            this.projects.push({name: project.group.object.name, date: project.group.createdAt})
        })
    }

    async render(token) {
        const container = document.querySelector('.no-graph')
        await this.getStats(token)
        const skillsGo = this.technologies[0]
        const skillsJs = this.technologies[1]
        const skillsRust = this.technologies[2]
        container.innerHTML = `
                            <div class="container-section">
                    <i class="fas fa-star"></i>
                    <span class="num" data-val="${this.xp}">${this.xp} KB</span>
                    <span class="text">Earned XP</span>
                </div>

                <div class="container-section">
                    <div class="subject">
                        <div class="infos">
                            <div class="skill">Go</div>
                            <div class="percentage-num">${skillsGo.amount}%</div>
                        </div>
                        <div class="progressBar">
                            <div class="percentage" style="width: ${skillsGo.amount}%;">
        
                            </div>
                        </div>
                    </div>
                    <div class="subject">
                        <div class="infos">
                            <div class="skill">Javascript</div>
                            <div class="percentage-num">${skillsJs.amount}%</div>
                        </div>
                        <div class="progressBar">
                            <div class="percentage" style="width: ${skillsJs.amount}%;">
        
                            </div>
                        </div>
                    </div>
                    <div class="subject">
                        <div class="infos">
                            <div class="skill">Rust</div>
                            <div class="percentage-num">${skillsRust.amount}%</div>
                        </div>
                        <div class="progressBar">
                            <div class="percentage" style="width: ${skillsRust.amount}%;">
        
                            </div>
                        </div>
                    </div>
                    <span class="text">Technologies skills</span>
                </div>

                <div class="container-section">
                    <div class="status-infos">
                        <span>status</span>
                        <div class="status-color  ${this.projects.length > 0 ? "active" : "inactive"}"></div>
                    </div>
                    <div class="status-text ${this.projects.length > 0 ? "active" : "inactive"}">
                        ${this.projects.length > 0 ? "ACTIVE" : "INACTIVE"}
                    </div>
                    ${this.projects.length > 0 ? `<div class="work-status">working on  <span class="animate__animated animate__bounce">${this.projects[0].name}</span></div>` : "" }
                </div>`
    }
}