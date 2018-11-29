import pickle

with open('correspondance.pickle', 'rb') as handle:
    unserialized_data = pickle.load(handle)

print(unserialized_data)