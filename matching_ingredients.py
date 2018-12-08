import json
from tqdm import tqdm 
import jsonlines
import csv
import Levenshtein
import pickle

ingredient_to_data_ingredient = {}
print("hi", Levenshtein.ratio("Lentils", "Dried red lentils"))
count = 0

with jsonlines.open("output.ndjson") as reader:
    for obj in tqdm(reader):
        ingredient_recipe = obj['INGREDIENT']
        #print("ingredient_recipe", ingredient_recipe)
        highest = 0
        count = count + 1
        current_token = ''
        if ingredient_recipe in ingredient_to_data_ingredient:
            continue
        with open('final_data/rawData/nutrients.csv', mode='r') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            line_count = 0
            for row in csv_reader:
                ingredient_data = row['foodname']
                if '(' in ingredient_data:
                    first = ingredient_data.split('(')
                    ingredient_data= first[0]
                if ',' in ingredient_data:
                    second = ingredient_data.split(',')
                    ingredient_data = second[0]
                #print("ingredient_data", ingredient_data)
                similarity = Levenshtein.ratio(ingredient_recipe,ingredient_data)
                #print("similarity", similarity)
                if similarity > highest: 
                    highest = similarity
                    current_token = row
                if highest >= 0.8: 
                    break
            ingredient_to_data_ingredient[ingredient_recipe] = current_token


# Store data (serialize)
with open('correspondance.pickle', 'wb') as handle:
    pickle.dump(ingredient_to_data_ingredient, handle, protocol=pickle.HIGHEST_PROTOCOL)