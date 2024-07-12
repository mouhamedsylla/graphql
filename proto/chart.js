// chart.js

const svgNS = "http://www.w3.org/2000/svg";

// Données d'exemple
const data = [
    { category: 'Category 1', values: [38, 19, 51] },
    { category: 'Category 2', values: [10, 39, 46] },
    { category: 'Category 3', values: [47, 55, 55] },
    { category: 'Category 4', values: [35, 66, 23] },
    { category: 'Category 5', values: [71, 51, 46] },
    { category: 'Category 6', values: [50, 29, 66] },
];

const colors = ['#6f58e9', '#94d13d', '#eb6dc0'];

const chart = document.getElementById("chart");

// Fond
const background = document.createElementNS(svgNS, "rect");
background.setAttribute("x", 0);
background.setAttribute("y", 0);
background.setAttribute("width", 650);
background.setAttribute("height", 400);
background.setAttribute("fill", "#ffffff");
chart.appendChild(background);

// Grille et Axes
const drawGridAndAxes = () => {
    const gridGroup = document.createElementNS(svgNS, "g");
    const yAxis = [46, 116.5, 186.5, 256.5, 326.5];
    const xAxis = [131.5, 226.5, 320.5, 415.5, 510.5, 605.5];

    yAxis.forEach(y => {
        const line = document.createElementNS(svgNS, "path");
        line.setAttribute("d", `M 37 ${y} L 606 ${y}`);
        line.setAttribute("stroke", "#e6e6e6");
        line.setAttribute("stroke-width", 1);
        gridGroup.appendChild(line);
    });

    xAxis.forEach(x => {
        const line = document.createElementNS(svgNS, "path");
        line.setAttribute("d", `M ${x} 46 L ${x} 326`);
        line.setAttribute("stroke", "#e6e6e6");
        line.setAttribute("stroke-width", 1);
        gridGroup.appendChild(line);
    });

    chart.appendChild(gridGroup);
};

// Barres
const drawBars = () => {
    const seriesGroup = document.createElementNS(svgNS, "g");
    data.forEach((item, i) => {
        item.values.forEach((value, j) => {
            const bar = document.createElementNS(svgNS, "rect");
            bar.setAttribute("x", 30 + i * 95);
            bar.setAttribute("y", 326 - value * 3);
            bar.setAttribute("width", 35);
            bar.setAttribute("height", value * 3);
            bar.setAttribute("fill", colors[j]);
            seriesGroup.appendChild(bar);
        });
    });
    chart.appendChild(seriesGroup);
};

// Ligne
const drawLine = () => {
    const lineGroup = document.createElementNS(svgNS, "g");
    let d = "";
    data.forEach((item, i) => {
        const x = 47 + i * 95;
        const y = 326 - item.values[2] * 3;
        if (i === 0) {
            d += `M ${x} ${y}`;
        } else {
            d += ` L ${x} ${y}`;
        }
    });
    const line = document.createElementNS(svgNS, "path");
    line.setAttribute("d", d);
    line.setAttribute("stroke", "#eb6dc0");
    line.setAttribute("stroke-width", 2);
    line.setAttribute("fill", "none");
    lineGroup.appendChild(line);
    chart.appendChild(lineGroup);
};

// Titres
const drawTitles = () => {
    const title = document.createElementNS(svgNS, "text");
    title.setAttribute("x", 325);
    title.setAttribute("y", 24);
    title.setAttribute("class", "chart-title");
    title.textContent = "Chart title";
    chart.appendChild(title);
};

// Fonction d'animation
const animateBars = () => {
    const bars = document.querySelectorAll("rect");
    bars.forEach((bar, index) => {
        const height = bar.getAttribute("height");
        bar.setAttribute("height", 0);
        bar.setAttribute("y", 326);
        setTimeout(() => {
            bar.setAttribute("height", height);
            bar.setAttribute("y", 326 - height);
        }, index * 100);
    });
};

// Dessiner et animer le graphique
const drawChart = () => {
    drawGridAndAxes();
    drawBars();
    drawLine();
    drawTitles();
    animateBars();
};

drawChart()
