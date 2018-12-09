var app = angular.module('angularjsNodejsTutorial',['ngTable']);

app.controller('myController', function($scope, $http, $window, $location) {
    var index = 0;
    $scope.Submit = function() {
        if ($scope.word === undefined || $scope.word.length == 0) {
            $window.location.reload()
        } else {
            var request = $http.get('/filterword/'+$scope.word);
            $scope.word = ""
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

    // $scope.recipeDetails = function(rec) {
        
    //     $window.location.href = '/recipe/' + rec.rid;
    //     var request = $http.get('/recipe/:' + rec.rid)
    //     // request.success(function(data) {
    //         console.log(rec)
    //     // })
    // }

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

app.controller('recipe', function($scope, $http, $routeParams) {
    var one = $routeParams.recipe
    $scope.test = function() {
        console.log("happening")
    }
    console.log(one)
    
});

// app.controller('familyController', function($scope, $http) {
//     $scope.message="";
//     var selfInv = function() {
//         console.log("happeneing")
//         var request = $http.get('/familyLogins');
//         request.success(function(data) {
//             $scope.data = data;
//         });
//         request.error(function(data){
//             console.log('err');
//         });
//     }();

//     $scope.FindFamily = function() {
//         console.log($scope.x)
//         var request = $http.get('/family/'+$scope.login);
//         request.success(function(data) {
//             $scope.info = data;
//         });
//         request.error(function(data){
//             console.log('err');
//         });
//     };
// });


// app.controller('insertController', function($scope, $http) {
//     $scope.message="";
//     $scope.Insert = function() {
//         //json
//         var request = $http.post('insertNew/'+$scope.login+'/'+$scope.name+'/'+$scope.sex+'/'+$scope.RelationshipStatus+'/'+$scope.Birthyear);
//         request.success(function(data) {
//             window.location = data.redirectURL
//         });
//         request.error(function(data){
//             console.log('err');
//         });

//     }; 
// });
