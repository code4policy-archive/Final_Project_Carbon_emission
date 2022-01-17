// coal d3 chart
function coalChart(chartID){
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 50, left: 70},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(chartID)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("../data-sources/coal-production.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y")(d.date), value : d.value }
  },

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.date; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add X axis labels
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height +40)
    .text("Year");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -70)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Thousand Short Tons");

    // Add the area
    svg.append("path")
      .datum(data)
      .attr("fill", "#cce5df")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x(function(d) { return x(d.date) })
        .y0(y(0))
        .y1(function(d) { return y(d.value) })
        )

  // add subtitle
  svg
    .append("text")
      .attr("x", 0)
      .attr("y", -10)    // -10 to adjust position (higher)
      .text("The level of coal production in the United States now is lower than it was 30 years ago")
      .attr("font-size", "20px")
      .attr("fill",  "black" )  

})
}
coalChart("#coal")

//-------Creating an interctive button that takes a user to the top of page------

//Get the button:
mybutton = document.getElementById("myBtn");


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
