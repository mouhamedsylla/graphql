// Configuration du graphique avec CSS
const margin = {
    top: 20,
    right: 30,
    bottom: 40,
    left: 40
};


// Fonction pour créer un graphique en barres
function createBarChart(data) {
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
            tooltip.html("Nom: " + d.name + "<br>Valeur: " + d.value)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px")
        })
        .on("mouseout", function(d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0)
        })
}

// Données personnalisables
const data = [
    {name: "A", value: 30},
    {name: "B", value: 80},
    {name: "C", value: 45},
    {name: "D", value: 60},
    {name: "E", value: 20},
    {name: "F", value: 90},
    {name: "G", value: 55},
    {name: "H", value: 75},
    {name: "I", value: 40},
    {name: "J", value: 65},
    {name: "K", value: 25},
    {name: "L", value: 85},
    {name: "M", value: 50},
    {name: "N", value: 70},
];

// Créer le graphique en barres
createBarChart(data);

window.addEventListener("resize", () => {
    d3.select("#graph1").selectAll("*").remove();
    createBarChart(data);
    window.location.reload();
});



var options = {
    series: [40, 60],
    chart: {
      width: 600,
      type: 'pie',
    },
    labels: ['PASS', 'FAIL'],
    colors: ['#16a085', '#333'], // Couleurs personnalisées
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  var chart = new ApexCharts(document.querySelector("#graph2"), options);
  chart.render();

