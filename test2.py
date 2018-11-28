import spacy
import json
from tqdm import tqdm 
import jsonlines
import csv

nlp = spacy.load('en')

doc1 = nlp("Red Lentils")
doc2 = nlp("Lentils")
print(doc1.similarity(doc2))

with jsonlines.open("output.ndjson") as reader:
    for obj in reader:
        ingredient_recipe = obj['INGREDIENT']
        #print("ingredient_recipe", ingredient_recipe)
        ingredient = nlp(ingredient_recipe)
        highest = 0
        current_token = ''
        ingredient_to_data_ingredient = {}
        with open('csv_data/data.csv', mode='r') as csv_file:
            csv_reader = csv.DictReader(csv_file)
            line_count = 0
            for row in tqdm(csv_reader):
                ingredient_data = row['product_name']
                #print("ingredient_data", ingredient_data)
                curr = nlp(ingredient_data)
                similarity = ingredient.similarity(curr)
                #print("similarity", similarity)
                if similarity > highest: 
                    highest = similarity
                    current_token = ingredient_data
            ingredient_to_data_ingredient[ingredient_recipe] = current_token
            print(ingredient_recipe, current_token)
            print("hi")
