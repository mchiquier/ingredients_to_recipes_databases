import collections
import json

header = list()
data = list()


with open('./en.openfoodfacts.org.products.tsv') as file:
    lineNum = 0
    for line in file:
        if lineNum == 0:
            arr = line.split('\t')
            arr = [el for el in arr if arr.index(el) in [0, 7, 8 ,9, 40, 63, 64, 65, 66, 99, 100, 101, 102, 109, 111, 112, 116, 117, 119, 121, 124, 136, 138, 140]]
            for s in arr:
                header.append(s.replace("_100g", ""))
        elif len(line.split('\t')) == 163:
            arr = line.split('\t')
            temp = []
            for val in [0, 7, 8 ,9, 40, 63, 64, 65, 66, 99, 100, 101, 102, 109, 111, 112, 116, 117, 119, 121, 124, 136, 138, 140]:
                temp.append(arr[val])
            data.append(collections.OrderedDict(zip(header, temp)))
        lineNum += 1
        # print(lineNum)


with open("./data.json", 'w') as file:
    json.dump(data, file, indent=2)