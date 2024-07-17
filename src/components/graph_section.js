import query from "../query.js"
import { createBarChart } from "../chart.js"
import { GraphiQL_Request } from "../helper/utils.js"

export default class GraphSection {
    constructor() {
        this.barGraph = []
    }

    async getStats(token) {
        // Getting the user's transactions
        const transactions = (await GraphiQL_Request(query.USER_TRANSACTIONS, token)).data.user[0].transactions
        transactions.forEach(transaction => {
            transaction.amount = (transaction.amount / 1000).toFixed(0)
            this.barGraph.push({name: transaction.object.name, value: parseInt(transaction.amount)})
        })
        console.log(this.barGraph)
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
    }
}