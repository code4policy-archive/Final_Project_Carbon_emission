# Import CSV 
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
