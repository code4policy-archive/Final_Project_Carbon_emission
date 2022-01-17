To produce State Comparison Bar Charts:

1. I downloaded the original data in xls from https://www.eia.gov/environment/emissions/state/

2. I then used online converter tool to convert xls to csv

3. The data comprised of the following information by state:
- Coal, Petroleum, Natural Gas, and Total (in million metric tons of carbon dioxide)
- Coal, Petroleum, Natural Gas Shares of Total

4. The bar chart is intended to include only Coal, Petroleum, Natural Gas (in million metric tons of carbon dioxide)

5. So, I had to convert the data using the following script in python (filename: "../data-sources/fuel-convert.py"):



# Import CSV Command 
import csv 


# Read original csv file into a variable called states.

with open('table3-raw.csv', 'r') as f:
    reader = csv.DictReader(f)
    states = list(reader)

# Write the output into another csv called state-emissions-byfuel-2018-output.csv

with open('state-emissions-byfuel-2018.csv', 'w') as f:
    
	# Write first row = header
	writer = csv.writer(f)
	writer.writerow(['state','coal','petroleum','natural gas','total'])
	
	# Write content
	for state in states:
		state_name=state["state"] 
		state_coal=state["coal"] 
		state_petrol=state["petroleum"]
		state_ng=state["natural gas"]
		state_tot=state["total"]
		writer.writerow([state_name, state_coal , state_petrol, state_ng, state_tot])


--Aji Wibowo Suharto