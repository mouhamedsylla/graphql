

const margin = {
    top: 20,
    right: 30,
    bottom: 40,
    left: 40
}


// Fonction pour créer un graphique en barres
export function createBarChart(data) {
    d3.select("#graph1").selectAll("*").remove();

    // Définir les dimensions du graphique
    const container = d3.select("#graph1");

    const width = parseInt(container.style("width")) - margin.left - margin.right;
    const height = parseInt(container.style("height"))  - margin.top - margin.bottom;

    const svg = d3.select("#graph1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Définir les échelles
    const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, width])
        .padding(0.1)

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([height, 0])

    // Ajouter les axes (sans les noms sur l'axe X)
    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0).tickFormat(''))

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));

    // Ajouter les barres
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", y(0))
        .attr("width", x.bandwidth() - 2)
        .attr("height", 0)
        .transition()
        .duration(750)
        .attr("y", d => y(d.value))
        .attr("height", d => height - y(d.value))

    // Ajouter la légende au survol
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")

    svg.selectAll(".bar")
        .on("mouseover", function(event, d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", .9)
            tooltip.html(d.name + "<br>" + d.value + " kb") 
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px")
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0)
        })
}
