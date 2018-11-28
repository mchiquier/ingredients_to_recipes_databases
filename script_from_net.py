import csv
import json
from tqdm import tqdm 
import jsonlines

with open('/Users/miachiquier/cis550/results-v2.txt') as results:
    # csv_reader = csv.reader(csv_file, delimiter='\t')
    line_count = 0
    entities = []
    # recipe_dict = {}
    # with open('/Users/miachiquier/cis550/csv_data/recipeIngredientTitleID.csv') as f:
    #     line_count = 0
    #     for row in f.readlines():
    #         if line_count > 0:
    #             recipe_dict[line_count-1] = row.split(',')[0]
    #         line_count += 1
    # print("Last value in dic", recipe_dict[line_count-1])
    # print("Len of Recipe Dict", len(recipe_dict), line_count)

   
    count = 0
    count2 = 0
    for row in results.readlines():
        if row.startswith("# 0."):
            entity = []
            count = count + 1
        elif row == '\n': 
            count2 = count2 + 1
            entities.append(entity)
        else: 
            items = row.split('\t')
            if items[-1].startswith('B-NAME') or items[-1].startswith('I-NAME') or items[-1].startswith('B-UNIT') or items[-1].startswith('B-QTY'):
                entity.append((items[0],items[-1].split('/')[0]))

            if items[0].startswith('RecipeID:'):
                entity.append(int(items[0].split(':')[-1]))

    def get_tag(tag):
        s = tag.split('-')
        return s[0], s[-1]

    outtie = []
    for e in tqdm(entities): 
        entity, recipeId = e[:-1], e[-1] 
        entity_tags = [(element, tag) for element, tag in entity if element != '|' and not element.startswith("RecipeID")]  
        if entity_tags:
            entity, tags = zip(*entity_tags)
            tags = list(tags)
        i = 0 
        block = {} 
        while i < len(entity): 
            try: 
                tag = tags[i] 
            except:
                break
            prefix, class_tag = get_tag(tag) 
            if prefix == 'B': 
                j = i + 1 
                merge = [str(entity[i])] 
                while j < len(tags) and j < len(entity): 
                    p, cl = get_tag(tags[j]) 
                    if p == 'I' and cl == class_tag: 
                        merge.append(str(entity[j])) 
                        j = j + 1 
                    else: 
                        break 
                #outtie.append((' '.join(merge), tags[i], recipeId))
                if class_tag == 'QTY':
                    temp = ' '.join(merge)
                    if '$' in temp:
                        temp = temp.replace('$', ' ')
                    if '//' in temp:
                        temp = temp.replace('//', '/')
                    if '/' in temp:
                        index = temp.index('/')
                        try:
                            newval = int(temp[index-1])/int(temp[index+1])
                            temp = temp.replace(temp[index-1:index+2],str(newval))
                            try: 
                                myarray = temp.split(' ')
                                temp = str(sum([float(part) for part in myarray]))
                            except:
                                print("lol")
                        except:
                            print(temp)
                    block['QTY'] = temp

                if class_tag == 'UNIT':
                    block['UNIT'] = ' '.join(merge)
                if class_tag == 'NAME':
                    fullingredient = ' '.join(merge)
                    block['INGREDIENT'] = fullingredient
                
                i = j
            elif prefix == 'I': 
                print("PROBLEMO")
       
        if 'QTY' in block and 'UNIT' in block and 'INGREDIENT' in block:
                    block['recipe_id'] = recipeId
                    outtie.append(block)

    with jsonlines.open("output.ndjson", mode="w") as writer:
        writer.write_all(outtie)


        



                    
   # recipeId, qty, unit, name
        # for e in entities:
        #     out.write(e)
        #     out.write('\n')
    
    #we only need B-NAME, mustard dijon gets b
    #BNAME followed by INAME 

