import query from "../query.js"
import { createBarChart, createPieChart } from "../chart.js"
import { GraphiQL_Request, gettingPercentage } from "../helper/utils.js"

export default class GraphSection {
    constructor() {
        this.barGraph = []
        this.grades = []
    }

    async getStats(token) {
        // Getting the user's transactions
        const transactions = (await GraphiQL_Request(query.USER_TRANSACTIONS, token)).data.user[0].transactions
        transactions.forEach(transaction => {
            transaction.amount = (transaction.amount / 1000).toFixed(0)
            this.barGraph.push({name: transaction.object.name, value: parseInt(transaction.amount)})
        })

        // Getting percentage pass or fail projects
        const transaction_grades = (await GraphiQL_Request(query.USER_TRANSACTIONS, token)).data.user[0].transactions
        transaction_grades.forEach(transaction => {
            this.grades.push({name: transaction.object.name, value: transaction.progress.grade})
        })
    }

    async render(token) {
       await this.getStats(token)

       const container = document.querySelector('.graph')
       container.innerHTML = `
            <div class="graph-container">
                <span>XP earned by project</span>
                <div class="chart-container" id="graph1"></div>
            </div>
            <div class="graph-container" id="graph2">
                    
            </div>
       `
        createBarChart(this.barGraph)
        createPieChart(gettingPercentage(this.grades))
    }
}