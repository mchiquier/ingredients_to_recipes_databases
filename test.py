import pickle
import csv 
import jsonlines 
import tqdm 

with open('correspondance.pickle', 'rb') as handle:
    unserialized_data = pickle.load(handle)

with jsonlines.open("output.ndjson") as reader:

    with open('id_to_id.csv', mode='w') as f:
        id_to_id = csv.writer(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        for obj in reader:
            recipe_id = obj["recipe_id"]
            ingredient = obj['INGREDIENT']
            mydict = unserialized_data[ingredient]
            data_id = mydict['code']
            id_to_id.writerow([recipe_id,data_id])
