import json
import collections

file = open("../rawData/epicuriousData/full_format_recipes.json")
jstr = file.read()
data = json.loads(jstr)

headerT1 = ["rid", "title", "rating", "instructions", "calories", "description"]
dataT1 = list()

headerT2 = ["iid","rid", "title", "ingredient"]
dataT2 = list()

idCount = 0
rid = 0
for item in data:
    rating = item["rating"] if "rating" in item else -1.0
    title = item['title'] if "title" in item else ""
    ingreds = item['ingredients'] if "ingredients" in item else []
    directions = item['directions'] if "directions" in item else []
    dirarr = ""
    for i in directions:
        dirarr += i + "$#"
    calories = item['calories'] if 'calories' in item else -1.0
    description = item['desc'] if 'desc' in item else ""
    for ingred in ingreds:
        temp = [rid, idCount, title, ingred]
        dataT2.append(collections.OrderedDict(zip(headerT2, temp)))
        rid += 1
    arr = [idCount,title, rating, dirarr, calories, description]
    dataT1.append(collections.OrderedDict(zip(headerT1, arr)))
    idCount += 1

#
with open("../outputData/recipes.json", 'w') as file:
    json.dump(dataT1, file, indent=2)

with open("../outputData/ingredients.json", 'w') as file:
    json.dump(dataT2, file, indent=2)

