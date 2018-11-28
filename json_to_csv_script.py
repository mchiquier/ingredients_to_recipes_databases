import json

import csv

parsed = []

with open('data.json', 'r') as f:
    parsed = json.load(f)

# open a file for writing
ingredient_title_id= open('data.csv', 'w')
# create the csv writer object
csvwriter = csv.writer(ingredient_title_id)
count = 0

for elem in parsed:
    if count == 0:
             header = elem.keys()
             csvwriter.writerow(header)
             count += 1
    csvwriter.writerow(elem.values())
          
ingredient_title_id.close()