import json
import csv

fn = open("../outputData/nutrients.json")
fnr = fn.read()

nn = open("../outputData/ingredients.json")
nnr = nn.read()

rn = open("../outputData/recipes.json")
rnr = rn.read()

nutrients = json.loads(fnr)
ingredients = json.loads(nnr)
recipes = json.loads(rnr)

nutArr = ["nid", "name", "protein (g)", "fat (g)", "energy (kcal)",
               "sugar (g)", "calcium (g)", "potassium (g)", "cholesterol (g)", "carbohydrates (g)",
               "fiber (g)", "sodium (g)", "iron (g)"]
ingArr = ["iid", "rid", "title", "ingredient"]
recArr = ["rid", "title", "rating", "instructions", "calories", "description"]



ingreds = csv.writer(open('../outputData/ingredients.csv', "w"))
recs = csv.writer(open('../outputData/recipes.csv', "w"))

ingreds.writerow(ingArr)
recs.writerow(recArr)
with open("../outputData/nutrients.csv", 'w') as my_csv:
    csvWriter = csv.writer(my_csv, delimiter=',')
    csvWriter.writerow(nutArr)
    for el in nutrients:
        csvWriter.writerow([el[nutArr[0]], el[nutArr[1]], el[nutArr[2]], el[nutArr[3]],
                      el[nutArr[4]], el[nutArr[5]], el[nutArr[6]], el[nutArr[7]],
                           el[nutArr[8]], el[nutArr[9]], el[nutArr[10]], el[nutArr[11]],
                           el[nutArr[12]]])


with open("../outputData/ingredients.csv", 'w') as my_csv:
    csvWriter = csv.writer(my_csv, delimiter=',')
    csvWriter.writerow(ingArr)
    for el in ingredients:
        csvWriter.writerow([el[ingArr[0]], el[ingArr[1]], el[ingArr[2]], el[ingArr[3]]])


with open("../outputData/recipes.csv", 'w') as my_csv:
    csvWriter = csv.writer(my_csv, delimiter=',')
    csvWriter.writerow(recArr)
    for el in recipes:
        csvWriter.writerow([el[recArr[0]], el[recArr[1]], el[recArr[2]], el[recArr[3]],
                      el[recArr[4]], el[recArr[5]]])