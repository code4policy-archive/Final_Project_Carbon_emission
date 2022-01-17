function addTreemap(chartID){
// set the dimensions and margins of the graph
var margin = {top: 70, right: 10, bottom: 10, left: 10},
  width = 1400 - margin.left - margin.right,
  height = 1000 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(chartID)
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Read data
d3.csv('../data-sources/emissions-per-capita-2018_treemap.csv', function(data) {

  // stratify the data: reformatting for d3.js
  var root = d3.stratify()
    .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
    .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
    (data);
  root.sum(function(d) { return +d.value })   // Compute the numeric value for each entity

  // Then d3.treemap computes the position of each element of the hierarchy
  // The coordinates are added to the root object above
  d3.treemap()
    .size([width, height])
    .padding(4)
    (root)

console.log(root.leaves())
  // use this information to add rectangles:
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", "#2b8cbe");

  // and to add the text labels
  svg
    .selectAll("text")
    .data(root.leaves())
    .enter()
    .append("text")
      .attr("x", function(d){ return d.x0+2})    // +2 to adjust position (more right)
      .attr("y", function(d){ return d.y0+20})    // +20 to adjust position (lower)
      .text(function(d){ return d.data.name})
      .attr("font-size", "15px")
      .attr("fill", "white")

  // add title
  svg
    .append("text")
      .attr("x", 0)
      .attr("y", -40)    // -40 to adjust position (higher)
      .text("The states with the highest populations are not its largest emitters by capita")
      .attr("font-size", "30px")
      .attr("fill",  "black" )

  // add subtitle
  svg
    .append("text")
      .attr("x", 0)
      .attr("y", -10)    // -10 to adjust position (higher)
      .text("State carbon dioxide emissions per capita, 2018 (larger rectangle = higher per capita emissions)")
      .attr("font-size", "20px")
      .attr("fill",  "black" )  

})
}
addTreemap("#per-capita")