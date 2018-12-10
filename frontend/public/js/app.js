var app = angular.module('angularjsNodejsTutorial',[]);

app.controller('homeController', function($scope, $http, $window) {
    var index = 0;
    $scope.Submit = function() {
        if ($scope.word === undefined || $scope.word.length == 0) {
            $window.location.reload()
        } else {
            var request = $http.get('/filterword/'+$scope.word);
            request.success(function(data) {
                $scope.data = data;
            });
            request.error(function(data){
                console.log(data);
            });
        }
       
    }; 
    $scope.Next = function() {
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
    }

    $scope.Prev = function() {
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
            $scope.cals = data[0].calories != null ? data[0].calories : "N/A";
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
                energy += (data[i].energy * conv)
                fat += (data[i].fat * conv)
                carbs += (data[i].carbohydrates * conv)
                sugar += (data[i].sugar * conv)
                fiber += (data[i].fiber * conv)
                protein += (data[i].protein * conv)
                sodium += (data[i].sodium * conv / 1000)
                potassium += (data[i].potassium * conv / 1000) 
            }
            $scope.energy = energy
            $scope.fat = fat
            $scope.carbs = carbs
            $scope.sugar = sugar
            $scope.fiber = fiber
            $scope.protein = protein
            $scope.sodium = sodium
            $scope.potassium = potassium
        })
    }
    
});