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
        with open('csv_data/data.csv', mode='r') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            line_count = 0
            for row in csv_reader:
                ingredient_data = row['product_name']
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