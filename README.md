# cis550

The first script is script_for_net.py where I took the csv we had: recipeIngredientTitleID.csv and turned it into 'ingredientrecipe-v2.txt' which pretty much just extracted the Ingredient and the recipe id it comes from. This is the textfile format that was needed for the neural network that I trained and ran from NYTimes: 

https://github.com/NYTimes/ingredient-phrase-tagger

This gave me the output, please only consider the v2 version: results-v2.txt 

Then I took this and did alot of post-processing on it in script_from_net.py 

Then I made a matching file where I realized that matching would take way too long: matching_ingredients.py

Connect to Database:
mysql -h nutritionandrecipes.ce7wp32dwfvn.us-east-2.rds.amazonaws.com -P 3306 -u cis550group -p password
