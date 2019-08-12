// This value of this variable is the output of examples/node/index.js
const data = [ { name: 'hat', count: 8 },
{ name: 'boolean', count: 43 },
{ name: 'reporter', count: 56 },
{ name: 'c', count: 19 },
{ name: 'cap', count: 7 },
{ name: 'stack', count: 40 },
{ name: 'custom', count: 0 } ]

//TODO: enable tip after integration with express
//const tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d; });

const width = 600,
    height = 400,
    radius = Math.min(width, height) / 2;

// Create the SVG with a g element
const svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width/2}, ${height/2})`);

svg.append("g")
	.attr("class", "slices");
svg.append("g")
	.attr("class", "labels");
svg.append("g")
	.attr("class", "lines");

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

/* ------- PIE SLICES -------*/

//TODO: tooltip
//svg.call(tip)

const slice = svg.select(".slices")
    .selectAll("path.slice")
    .data(arcs)

slice.enter()
    .insert("path")
        .attr('d', arc)
        .style("fill", d => color(d.data.name))
        .attr("class", "slice")
 

//TODO: tooltip
//       .on('mouseover', tip.show)
//       .on('mouseout', tip.hide)

/* ------- TEXT LABELS -------*/

const text = svg.select(".labels").selectAll("text")
    .data(arcs, d => d.data.name);

// This is from: http://bl.ocks.org/dbuezas/9306799
text.enter()
    .append("text")
    .attr("dy", ".35em")
    .attr("transform", d => {
        let pos = outerArc.centroid(d);
        pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
        return `translate(${pos})`
    })
    .text(function(d) {
        return d.data.name;
    });

/* ------- SLICE TO TEXT POLYLINES -------*/

const polyline = svg.select(".lines").selectAll("polyline")
    .data(arcs, d => d.data.name);

// This is from: http://bl.ocks.org/dbuezas/9306799
polyline.enter()
    .append("polyline")
    .attr('points', d => {
        let pos = outerArc.centroid(d);
        pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
        return [arc.centroid(d), outerArc.centroid(d), pos]
    });

function midAngle(d){
    return d.startAngle + (d.endAngle - d.startAngle)/2;
}


