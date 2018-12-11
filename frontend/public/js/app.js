var app = angular.module('angularjsNodejsTutorial',[]);

app.controller('homeController', function($scope, $http, $window) {
    var index = 0;
    $scope.selectedName = ""
    $scope.lte = ""
    $scope.gte = [">", "<", "="]
    $scope.options = ["All", "Title", "Ingredient", "Rare Ingredient", "(g) Protein", "(g) Fat", "(g) Carbohydrates", "(g) Sugar", "(g) Fiber"]
    $scope.selectedSort= ""
    $scope.sort = ["Rating", "Alphabetical"]
    $scope.shouldDisplay = function() {
        return $scope.selectedName == "(g) Protein" || $scope.selectedName == "(g) Fat" 
        || $scope.selectedName == "(g) Carbohydrates" || $scope.selectedName == "(g) Sugar" 
        || $scope.selectedName == "(g) Fiber"
    }
    $scope.SubmitSort = function() {
        index = 0;
        if ($scope.selectedSort == "Rating") {
            var request = $http.get('/rating/' + index);
                request.success(function(data) {
                    $scope.data = data;
                });
                request.error(function(data){
                    console.log(data);
                });
        } else if ($scope.selectedSort = "Alphabetical") {
            var request = $http.get('/alpha/' + index);
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log(data);
            });
        }
    }
    $scope.Submit = function() {
        index = 0;
        if ($scope.word == undefined || $scope.word.length == 0) {
            $window.location.reload()
        } else {
            if ($scope.selectedName == 'Title') {
                var request = $http.get('/filterword/'+$scope.word +"/" + index);
                request.success(function(data) {
                    $scope.data = data;
                });
                request.error(function(data){
                    console.log(data);
                });
            }  else if ($scope.selectedName == "Ingredient") {
                var request = $http.get('/filteringredient/'+$scope.word +"/" + index);
                request.success(function(data) {
                    $scope.data = data;
                });
                request.error(function(data){
                    console.log(data);
                });
            } else if ($scope.selectedName == "Rare Ingredient") {
                console.log("Rare")
                var request = $http.get('/filterrare/'+$scope.word +"/" + index);
                request.success(function(data) {
                    $scope.data = data;
                });
                request.error(function(data){
                    console.log(data);
                });
            } else if ($scope.selectedName == "(g) Protein" || $scope.selectedName == "(g) Fat" 
            || $scope.selectedName == "(g) Carbohydrates" || $scope.selectedName == "(g) Sugar" 
            || $scope.selectedName == "(g) Fiber") {
                var type = ""
                if ($scope.selectedName == "(g) Protein") {
                    type = "protein"
                } else if ($scope.selectedName == "(g) Fat" ) {
                    type = "fat"
                } else if ($scope.selectedName == "(g) Carbohydrates") {
                    type = "carbohydrate"
                } else if ($scope.selectedName == "(g) Sugar") {
                    type = "sugar"
                } else {
                    type = "fiber"
                }
                var g = ""
                if ($scope.lte == ">") {
                    g = "more"
                } else if ($scope.lte == "<") {
                    g = "less"
                } else {
                    g = "eq"
                }
                var request = $http.get('/recipenutrition/' + type + "/"+ g + "/"+$scope.word + "/"+index)
                request.success(function(data) {
                    $scope.data = data;
                });
                request.error(function(data){
                    console.log(data);
                });
            }
           
        }
       
    }; 
    $scope.Next = function() {
        if ($scope.selectedName == "All") {
            if (index < 18375) {
                index += 15
                var request = $http.get('/fillhome/' + index)
                request.success(function(data) {
                    $scope.data = data
                })
                request.error(function(data) {
                    $scope.data = []
                })
            } 
        } else if ($scope.selectedName == 'Title') {
            index += 15
            var request = $http.get('/filterword/'+$scope.word +"/" + index);
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log(data);
            });
        } else if ($scope.selectedSort == "Rating") {
            index += 15
            var request = $http.get('/rating/' + index);
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log(data);
            });
        } else if ($scope.selectedName == "Ingredient") {
            index += 15
            var request = $http.get('/filteringredient/'+$scope.word +"/" + index);
                request.success(function(data) {
                    $scope.data = data;
                });
                request.error(function(data){
                    console.log(data);
                });
        } else if ($scope.selectedSort == "Alphabetical") {
            index += 15
            var request = $http.get('/alpha/' + index);
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log(data);
            });
        } else if ($scope.selectedName == "(g) Protein" || $scope.selectedName == "(g) Fat" 
        || $scope.selectedName == "(g) Carbohydrates" || $scope.selectedName == "(g) Sugar" 
        || $scope.selectedName == "(g) Fiber") {
            index += 15
            var type = ""
            if ($scope.selectedName == "(g) Protein") {
                type = "protein"
            } else if ($scope.selectedName == "(g) Fat" ) {
                type = "fat"
            } else if ($scope.selectedName == "(g) Carbohydrates") {
                type = "carbohydrate"
            } else if ($scope.selectedName == "(g) Sugar") {
                type = "sugar"
            } else {
                type = "fiber"
            }
            var g = ""
            if ($scope.lte == ">") {
                g = "more"
            } else if ($scope.lte == "<") {
                g = "less"
            } else {
                g = "eq"
            }
            var request = $http.get('/recipenutrition/' + type + "/"+ g + "/"+$scope.word + "/"+index)
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log(data);
            });
        }
        
    }

    $scope.Prev = function() {
        if ($scope.selectedName == "All") {
            if (index > 0) {
                index -= 15
                var request = $http.get('/fillhome/' + index)
                request.success(function(data) {
                    $scope.data = data
                })
                request.error(function(data) {
                    $scope.data = []
                })
            }
        } else if ($scope.selectedName == "Title") {
            if (index > 0) {
                index -= 15
                var request = $http.get('/filterword/'+$scope.word +"/" + index);
                request.success(function(data) {
                    $scope.data = data
                })
                request.error(function(data) {
                    $scope.data = []
                })
            }
        } else if ($scope.selectedSort == "Rating") {
            if (index > 0) {
                index -= 15
                var request = $http.get('/rating/' + index);
                request.success(function(data) {
                    $scope.data = data;
                });
                request.error(function(data){
                    console.log(data);
                });
            }
        
        } else if ($scope.selectedName == "Ingredient") {
            if (index > 0) {
                index -= 15
                var request = $http.get('/filteringredient/'+$scope.word +"/" + index);
                    request.success(function(data) {
                        $scope.data = data;
                    });
                    request.error(function(data){
                        console.log(data);
                    });
            }
        } else if ($scope.selectedSort == "Alphabetical") {
            if (index > 0) {
                index -= 15
                var request = $http.get('/alpha/' + index);
                request.success(function(data) {
                    $scope.data = data;
                });
                request.error(function(data){
                    console.log(data);
                });
            }
         
        }  else if ($scope.selectedName == "(g) Protein" || $scope.selectedName == "(g) Fat" 
        || $scope.selectedName == "(g) Carbohydrates" || $scope.selectedName == "(g) Sugar" 
        || $scope.selectedName == "(g) Fiber") {
            if (index > 0) {
                index -= 15
                var type = ""
                if ($scope.selectedName == "(g) Protein") {
                    type = "protein"
                } else if ($scope.selectedName == "(g) Fat" ) {
                    type = "fat"
                } else if ($scope.selectedName == "(g) Carbohydrates") {
                    type = "carbohydrate"
                } else if ($scope.selectedName == "(g) Sugar") {
                    type = "sugar"
                } else {
                    type = "fiber"
                }
                var g = ""
                if ($scope.lte == ">") {
                    g = "more"
                } else if ($scope.lte == "<") {
                    g = "less"
                } else {
                    g = "eq"
                }
                var request = $http.get('/recipenutrition/' + type + "/"+ g + "/"+$scope.word + "/"+index)
                request.success(function(data) {
                    $scope.data = data;
                });
                request.error(function(data){
                    console.log(data);
                });
            }
        }
        
    }
    $scope.allRecipes = function() {
        var request = $http.get('/fillhome/' + index)
        request.success(function(data) {
            $scope.data = data
        })
        request.error(function(data) {
            $scope.data = []
        })
    }
    $scope.tableParams = ({}, { dataset: $scope.data});
});

app.controller('recipeController', function($scope, $http, $window) {
    var url = $window.location.href.split('/')
    var rid = url[url.length - 1]
    $scope.recipeInfo = function() {
        var request = $http.get('/recipe/info/' + rid)
        request.success(function(data) {
            $scope.title = data[0].title;
            $scope.rating = data[0].rating != null ? data[0].rating : "Not yet rated";
            var len = data[0].instructions.split('$#').length
            $scope.instructions = data[0].instructions.split('$#').slice(0, len - 1);
            $scope.cals = data[0].calories != 1 ? data[0].calories : "N/A";
            $scope.desc = data[0].description;
        })

        var request1 = $http.get('/recipe/ingredients/' + rid)

        request1.success(function(data) {
            var conv = data[0].conversion
            if (conv == null || conv == 0) {
                conv = 1
            }
            conv = conv / 100
            $scope.conv = conv
            $scope.data = data
            var energy = 0;
            var fat = 0;
            var carbs = 0;
            var sugar = 0;
            var fiber = 0;
            var protein = 0;
            var sodium = 0;
            var potassium = 0;
            for (var i = 0; i < data.length; i++) {
                energy += (data[i].energy * data[i].conversion)
                fat += (data[i].fat * data[i].conversion)
                carbs += (data[i].carbohydrates * data[i].conversion)
                sugar += (data[i].sugar * data[i].conversion)
                fiber += (data[i].fiber * data[i].conversion)
                protein += (data[i].protein * data[i].conversion)
                sodium += (data[i].sodium * data[i].conversion / 1000)
                potassium += (data[i].potassium * data[i].conversion / 1000) 
            }
            $scope.energy = energy
            $scope.fat = fat
            $scope.carbs = carbs
            $scope.sugar = sugar
            $scope.fiber = fiber
            $scope.protein = protein
            $scope.sodium = sodium
            $scope.potassium = potassium
            console.log(energy)
            console.log(protein)
            console.log(data)
        })
    }
    
});