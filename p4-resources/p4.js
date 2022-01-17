
//-------Creating the table for top 10 emitters------
var data = [
  { "Greenhouse rank" : '1', "Parent Coporation/entity" : "Vistra Energy", "Headquarters" : "Irving, TX", "2019 CO2 emissions (metric tons)" : '106,510,086',"Percentage of 2019 CO2 emissions" : '1.6%', "Sector" : "Power Plants"},
  { "Greenhouse rank" : '2', "Parent Coporation/entity" : "Duke Energy", "Headquarters" : "Charlotte, NC", "2019 CO2 emissions (metric tons)" : '87,140,105',"Percentage of 2019 CO2 emissions" : '1.3%', "Sector" : "Power Plants, Other, Petroleum and Natural Gas Systems, Waste"},
  { "Greenhouse rank" : '3', "Parent Coporation/entity" : "Southern Company", "Headquarters" : "Atlanta, GA", "2019 CO2 emissions (metric tons)" : '86,244,286',"Percentage of 2019 CO2 emissions" : '1.3%', "Sector" : "Power Plants, Petroleum and Natural Gas Systems, Other"},
  { "Greenhouse rank" : '4', "Parent Coporation/entity" : "Berkshire Hathaway", "Headquarters" : "Omaha, NE", "2019 CO2 emissions (metric tons)" : '74,960,726' ,"Percentage of 2019 CO2 emissions" : '1.1%', "Sector" : "Power Plants, Petroleum and Natural Gas Systems, Minerals, Metals, Other, Chemicals" },
  { "Greenhouse rank" : '5', "Parent Coporation/entity" : "American Electric Power", "Headquarters" : "Columbus, OH", "2019 CO2 emissions (metric tons)" : '70,044,545' ,"Percentage of 2019 CO2 emissions" : '1.1%' , "Sector" : "Power Plants, Other"},
  { "Greenhouse rank" : '6', "Parent Coporation/entity" : "US Government", "Headquarters" : "Washington DC", "2019 CO2 emissions (metric tons)" : '47,504,228' ,"Percentage of 2019 CO2 emissions" : '0.7%', "Sector": "Power Plants, Other, Waste, Petroleum and Natural Gas Systems, Chemicals" },
  { "Greenhouse rank" : '7', "Parent Coporation/entity" : "Xcel Energy", "Headquarters" : "Minneapolis, MN", "2019 CO2 emissions (metric tons)" : '46,975,696' ,"Percentage of 2019 CO2 emissions" : '0.7%', "Sector" : "Power Plants, Petroleum and Natural Gas Systems, Other" },
  { "Greenhouse rank" : '8', "Parent Coporation/entity" : "Orion Energy Systems", "Headquarters" : "Manitowoc, WI", "2019 CO2 emissions (metric tons)" : '41,420,489' ,"Percentage of 2019 CO2 emissions" : '0.6%', "Sector" : "Power Plants, Metals" },
  { "Greenhouse rank" : '9', "Parent Coporation/entity" : "NextEra Energy", "Headquarters" : "Juno Beach, FL", "2019 CO2 emissions (metric tons)" : '40,521,250' ,"Percentage of 2019 CO2 emissions" : '0.6%', "Sector" : "Power Plants, Petroleum and Natural Gas Systems, Other" },
  { "Greenhouse rank" : '10', "Parent Coporation/entity" : "Exxon Mobil", "Headquarters" : "Irving, TX", "2019 CO2 emissions (metric tons)" : '38,252,969' ,"Percentage of 2019 CO2 emissions" : '0.6%', "Sector": "Refineries, Petroleum and Natural Gas Systems, Power Plants, Chemicals, Other" }
]
    
function tabulate(data, columns) {
  var table = d3.select('body').append('table')
  var thead = table.append('thead')
  var tbody = table.append('tbody');

  // append the header row
  thead.append('tr')
    .selectAll('th')
    .data(columns).enter()
    .append('th')
      .text(function (column) { return column; });

  // create a row for each object in the data
  var rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr');

  // create a cell in each row for each column
  var cells = rows.selectAll('td')
    .data(function (row) {
      return columns.map(function (column) {
        return {column: column, value: row[column]};
      });
    })
    .enter()
    .append('td')
      .text(function (d) { return d.value; });

  return table;
}

// render the tables
tabulate(data, ['Greenhouse rank', 'Parent Coporation/entity', 'Headquarters', '2019 CO2 emissions (metric tons)', 'Percentage of 2019 CO2 emissions', 'Sector']); // 5 column table

//-------Creating an interctive button that takes a user to the top of page------


//Get the button:
mybutton = document.getElementById("myBtn");


// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


