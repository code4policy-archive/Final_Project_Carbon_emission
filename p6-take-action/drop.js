
function drawbar(cssSelector) {

// Load and merge data, then make the visualization.
    var fileName = "../data-sources/state-emissions-byfuel-2018.csv";
    var fuelFields = ["coal", "petroleum", "natural gas"];

    d3.csv(fileName, function(error, data) {
        var stateMap = {};
        data.forEach(function(d) {
            var state = d.state;
            stateMap[state] = [];

            // { stateName: [ bar1Val, bar2Val, ... ] }
            fuelFields.forEach(function(field) {
                stateMap[state].push( +d[field] );
            });
        });
        makeVis(stateMap);
    });

    var makeVis = function(stateMap) {
        // Define dimensions of vis
        var margin = { top: 30, right: 50, bottom: 30, left: 50 },
            width  = 550 - margin.left - margin.right,
            height = 350 - margin.top  - margin.bottom;

        // Make x scale
        var xScale = d3.scale.ordinal()
            .domain(fuelFields)
            .rangeRoundBands([0, width], 0.1);

        // Make y scale, the domain will be defined on bar update
        var yScale = d3.scale.linear()
            .domain([0,350])
            .range([height , 0]);

        // Create canvas
        var canvas = d3.select(cssSelector)
          .append("svg")
            .attr("width",  width  + margin.left + margin.right)
            .attr("height", height + margin.top  + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Make x-axis and add to canvas
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        canvas.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Make y-axis and add to canvas
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        var yAxisHandleForUpdate = canvas.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        yAxisHandleForUpdate.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Value");

        var updateBars = function(data) {
            // First update the y-axis domain to match data
            yScale.domain( [0,350] );
            yAxisHandleForUpdate.call(yAxis);

            var bars = canvas.selectAll(".bar").data(data);

            // Add bars for new data
            bars.enter()
              .append("rect")
                .attr("class", "bar")
                .attr("x", function(d,i) { return xScale( fuelFields[i] ); })
                .attr("width", xScale.rangeBand())
                .attr("y", function(d,i) { return yScale(d); })
                .attr("height", function(d,i) { return height - yScale(d); });

            // Update old ones, already have x / width from before
            bars
                .transition().duration(250)
                .attr("y", function(d,i) { return yScale(d); })
                .attr("height", function(d,i) { return height - yScale(d); });

            // Remove old ones
            bars.exit().remove();
        };

        // Handler for dropdown value change
        var dropdownChange = function() {
            var newState = d3.select(this).property('value'),
                newData   = stateMap[newState];

            updateBars(newData);
        };

        // Get names of states, for dropdown
        var ustates = Object.keys(stateMap).sort();

        var dropdown = d3.select(cssSelector)
            .insert("select", "svg")
            .on("change", dropdownChange);

        dropdown.selectAll("option")
            .data(ustates)
          .enter().append("option")
            .attr("value", function (d) { return d; })
            .text(function (d) {
                return d[0].toUpperCase() + d.slice(1,d.length);
            });

        var initialData = stateMap[ ustates[0] ];
        updateBars(initialData);
    };
}


// Print Chart #1
drawbar("#vis-container");

//Print Chart #2
drawbar("#vis-container2");


//-------Creating an interctive button that takes a user to the top of page------

//Get the button:
mybutton = document.getElementById("myBtn");


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


