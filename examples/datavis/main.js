// This value of this variable is the output of examples/node/index.js
const data = [ { name: 'hat', count: 8 },
{ name: 'boolean', count: 43 },
{ name: 'reporter', count: 56 },
{ name: 'c', count: 19 },
{ name: 'cap', count: 7 },
{ name: 'stack', count: 40 },
{ name: 'custom', count: 0 } ]

const width = 600,
    height = 400,
    radius = Math.min(width, height) / 2;

// Create the SVG with a g element
const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width/2}, ${height/2})`);

// Set the category colors
const color = d3.scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);;

const pie = d3.pie()
    .value(d => d.count)
    .sort(null);

const arc = d3.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(radius * 0.4);

const outerArc = d3.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

const arcs = pie(data.filter(d => d.count > 0));

const g = svg.selectAll('.arc')
    .data(arcs)
    .enter().append('g')
    .attr('class', 'arc');

    g.append('path')
        .attr('d', arc)
        .style('fill', d => color(d.data.name));

const text = svg.append('g')
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs, d => d.data.name)





text.enter()
    .append('text')
    .attr('dy', '.35mm')
    .text(d => d.data.name)
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
          .attr("x", 0)
          .attr("y", "1.0em")
          .attr("fill-opacity", 0.7)
          .text(d => d.data.count));