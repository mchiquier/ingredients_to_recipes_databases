import csv
#difflib
# #fuzzywuzzy 
with open('final_data/rawData/nutrients.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    recipe_dict = {}
    with open('ingredientrecipe-v2.txt', 'w') as out: 
        for row in csv_reader:
            name = row[4]
            print(name)
