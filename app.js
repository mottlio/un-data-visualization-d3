var width = 600;
var height = 600;
var padding = 30;


var yMax = d3.max(regionData, d => d.subscribersPer100);
var xMax = d3.max(regionData, d => d.urbanPopulationRate);

var xScale = d3.scaleLinear()
                .domain(d3.extent(regionData, d => d.urbanPopulationRate))
                .range([padding, width - padding]);

var yScale = d3.scaleLinear()
                .domain(d3.extent(regionData, d => d.subscribersPer100))
                .range([height - padding, padding]);

var colorScale = d3.scaleLinear()
                    .domain(d3.extent(regionData, d => d.extremePovertyRate))
                    .range(["yellow", "black"]);

var radiusScale = d3.scaleLinear()
                    .domain(d3.extent(regionData, d => d.medianAge))
                    .range([15, 2]);

d3.select("svg")
    .attr("width", width)
    .attr("height", height)
  .selectAll("circle")
  .data(regionData)
  .enter()
  .append("circle")
    .attr("cx", d => xScale(d.urbanPopulationRate))
    .attr("cy", d => yScale(d.subscribersPer100))
    .attr("fill", d => colorScale(d.extremePovertyRate))
    .attr("r", d => radiusScale(d.medianAge));