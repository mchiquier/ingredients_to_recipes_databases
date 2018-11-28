import csv
#difflib
# #fuzzywuzzy 
with open('/Users/miachiquier/cis550/csv_data/recipeIngredientTitleID.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    recipe_dict = {}
    with open('ingredientrecipe-v2.txt', 'w') as out: 
        for row in csv_reader:
            if line_count == 0:
                line_count += 1
            else:
                recipe_dict[line_count] = row[0]
                out.write(f'{row[2]}' + f' | RecipeID:{row[0]}')
                out.write('\n')
                line_count += 1
    print(len(recipe_dict))

