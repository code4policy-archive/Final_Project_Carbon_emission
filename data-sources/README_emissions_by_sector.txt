To create the Tableau visualation for absolute emissions for all states by sector, I did the following;

1. Downloaded the spreadsheet of sector level emissions data (Table 4) from here: https://www.eia.gov/environment/emissions/state/

2. Deleted rows 1-3, 56-58 and columns G-M and retained only sector specific emissions data for each state. Tableau doesn't handle merged columns well, which is why this additional step was necessary. The dataset used in the visualization is named "Modified_sectoral_emissions_data.csv"

3. I then linked the cleaned dataset into Tableau and created the stacked barchart as we see in the website.

- Liza Maharjan