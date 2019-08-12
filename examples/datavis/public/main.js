
//TODO: enable tip after integration with express
//const tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d; });

(async () => {

    // This value of this variable is the output of examples/node/index.js
    const data = await fetch('http://localhost:3000/shapes').then(r => r.json());

    const width = 600,
    height = 400,
    radius = Math.min(width, height) / 2;

    const svg = d3.select("#container").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Set the category colors
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    const pie = d3.pie()
        .padAngle(0.005)
        .sort(null)
        .value(d => d.count);

    const arc = d3.arc()
        .outerRadius(radius - 20)
        .innerRadius(radius - 80);

    const arcs = pie(data.filter(d => d.count > 0));


    /* ------- PIE SLICES -------*/

    //TODO: tooltip
    //svg.call(tip)

    var g = svg.selectAll(".arc")
                .data(pie(data))
                .enter().append("g")
                .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.count); });

    /* ------- TEXT IN PIE SLICES -------*/

    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .call(text => text.append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .text(d => d.data.name))
    .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .text(d => d.data.count));
})();