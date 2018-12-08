
import csv
import json
import collections


headerT1 = ["nid", "name", "protein (g)", "fat (g)", "energy (kcal)", "sugar (g)", "calcium (g)", "potassium (g)", "cholesterol (g)", "carbohydrates (g)", "fiber (g)", "sodium (g)", "iron (g)"]
dataT1 = list()

with open('../rawData/nutrients.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    id = 0
    for row in reader:
        if row['foodname'] != "":
            foodname = row['foodname']
            protein = float(row['_203 Protein (g)'])
            fat = float(row['_204 Total Fat (g)'])
            energy = float(row["_208 Energy (kcal)"])
            sugar = float(row['_269 Sugars, total (g)'])
            calcium = float(row['_301 Calcium (mg)']) / 1000
            potassium = float(row['_306 Potassium (mg)']) / 1000
            cholesterol = float(row['_601 Cholesterol (mg)']) / 1000
            carbohydrates = float(row['_205 Carbohydrate (g)']) if row['_205 Carbohydrate (g)'] != "NULL" else -1.0
            fiber = float(row['_291 Fiber, total dietary (g)'])
            sodium = float(row['_307 Sodium (mg)']) / 1000
            iron = float(row['_303 Iron (mg)']) / 1000
            arr = [id, foodname, protein, fat, energy, sugar, calcium, potassium, cholesterol, carbohydrates, fiber, sodium, iron]
            dataT1.append(collections.OrderedDict(zip(headerT1, arr)))
            id += 1

with open("../outputData/nutrients.json", 'w') as file:
    json.dump(dataT1, file, indent=2)