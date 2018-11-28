import json
import collections

file = open("./epicuriousData/full_format_recipes.json")
jstr = file.read()
data = json.loads(jstr)

headerT1 = ["id", "title", "rating"]
dataT1 = list()

headerT2 = ["id", "title", "ingredient"]
dataT2 = list()

idCount = 0
for item in data:
    rating = item["rating"] if "rating" in item else -1.0
    title = item['title'] if "title" in item else ""
    ingreds = item['ingredients'] if "ingredients" in item else []
    for ingred in ingreds:
        temp = [idCount, title, ingred]
        dataT2.append(collections.OrderedDict(zip(headerT2, temp)))
    arr = [idCount,title, rating]
    dataT1.append(collections.OrderedDict(zip(headerT1, arr)))
    idCount += 1

# print(dataT2)
# print(dataT1)
with open("./recipeRatingTitleID.json", 'w') as file:
    json.dump(dataT1, file, indent=2)

with open("./recipeIngredientTitleID.json", 'w') as file:
    json.dump(dataT2, file, indent=2)

