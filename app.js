var width = 600;
var height = 600;
var padding = 80;

function mustHaveKeys(obj){
    var keys = [
       "subscribersPer100",
       "urbanPopulationRate",
        "extremePovertyRate",
        "medianAge"
    ]

    for(var i = 0; i < keys.length; i++){
       if(obj[keys[i]] === null) return false 
    }
    return true;
}

var data = regionData.filter(mustHaveKeys);


var yMax = d3.max(data, d => d.subscribersPer100);
var xMax = d3.max(data, d => d.urbanPopulationRate);

var xScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.urbanPopulationRate))
                .range([padding, width - padding]);

var yScale = d3.scaleLinear()
                .domain(d3.extent(data, d => d.subscribersPer100))
                .range([height - padding, padding]);

var colorScale = d3.scaleLinear()
                    .domain(d3.extent(data, d => d.extremePovertyRate))
                    .range(["yellow", "black"]);

var radiusScale = d3.scaleLinear()
                    .domain(d3.extent(data, d => d.medianAge))
                    .range([15, 2]);

d3.select("svg")
    .attr("width", width)
    .attr("height", height)
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", d => xScale(d.urbanPopulationRate))
    .attr("cy", d => yScale(d.subscribersPer100))
    .attr("fill", d => colorScale(d.extremePovertyRate))
    .attr("r", d => radiusScale(d.medianAge));


//adding the GRID

var xAxis = d3.axisBottom(xScale)
                .tickSize(-height + 2*padding)
                .tickSizeOuter(0);
var yAxis = d3.axisLeft(yScale)
                .tickSize(-width + 2*padding)
                .tickSizeOuter(0);


d3.select("svg")
    .append("g")
        .attr("transform", "translate(0," + (height-padding) + ")")
        .call(xAxis);
            
d3.select("svg")
    .append("g")
        .attr("transform", "translate(" + padding +", 0)")
        .call(yAxis);


//adding title, X and Y axis labels


//TITLE 

d3.select("svg")
  .append("text")
    .attr("x", width/2)
    .attr("y", 50)
    .style("text-anchor", "middle")
    .style("font-size", "1.2em")
    .text("Mobile subscriptions and urban population rate")

//x-axis

d3.select("svg")
    .append("text")
      .attr("x", width/2)
      .attr("y", height - 30)
      .attr("dy", "1.5em") //push text down relative to the x axis
      .style("text-anchor", "middle")
  .text("Mobile subscriptions per 100")

  //y-axis

d3.select("svg")
.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height/2)
  .attr("y", 30)
  .attr("dy", "-1.1em")
  .style("text-anchor", "middle")
.text("Share of urban population");