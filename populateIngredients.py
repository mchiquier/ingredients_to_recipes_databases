import mysql.connector
import json

db = mysql.connector.connect(
  host="nutritionandrecipes.ce7wp32dwfvn.us-east-2.rds.amazonaws.com",
  user="cis550group",
  passwd="password",
  port="3306",
  database="nutrition_and_recipes"
)

mycursor = db.cursor()

mycursor = db.execute("CREATE TABLE IF NOT EXISTS Ingredient(ingredientID INTEGER NOT NULL PRIMARY KEY, product_name VARCHAR(255), generic_name VARCHAR(255), quantity VARCHAR(255), serving_size VARCHAR(255), energy INTEGER, energy_from_fat INTEGER, fat DECIMAL, saturated_fat DECIMAL, trans_fat DECIMAL, cholesterol DECIMAL, carbohydrates DECIMAL, sugars DECIMAL, fiber DECIMAL, proteins DECIMAL, sodium DECIMAL, vitamin_a DECIMAL, vitamin_d DECIMAL, vitamin_c DECIMAL, calcium DECIMAL, iron DECIMAL);");

with open('./openfoodfactsData/ingredients.json') as file:
    ings = json.load(file)
    for ing in ings:
        ingredientID = ing['code'];
        product_name = ing['product_name'];
        generic_name = ing['generic_name'];
        quantity = ing['quantity'];
        serving_size = ing['serving_size'];
        energy = ing['energy'];
        energy_from_fat = ing['energy-from-fat'];
        fat = ing['fat'];
        saturated_fat = ing['saturated-fat'];
        trans_fat = ing['trans-fat'];
        cholesterol = ing['cholesterol'];
        carbohydrates = ing['carbohydrates'];
        sugars = ing['sugars'];
        fiber = ing['fiber'];
        proteins = ing['proteins'];
        sodium = ing['sodium'];
        vitamin_a = ing['vitamin-a'];
        vitamin_d = ing['vitamin-d'];
        vitamin_c = ing['vitamin-c'];
        calcium = ing['calcium'];
        iron = ing['iron'];

        sql="INSERT INTO Ingredient (ingredientID, product_name, generic_name, quantity, serving_size, energy, energy_from_fat, fat, saturated_fat, trans_fat, cholesterol, carbohydrates, sugars, fiber, proteins, sodium, vitamin_a, vitamin_d, vitamin_c, calcium, iron) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s); ";

        val=(ingredientID, product_name, generic_name, quantity, serving_size, energy, energy_from_fat, fat, saturated_fat, trans_fat, cholesterol, carbohydrates, sugars, fiber, proteins, sodium, vitamin_a, vitamin_d, vitamin_c, calcium, iron)

        mycursor.execute(sql,val)

        db.commit()
