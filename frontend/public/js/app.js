var app = angular.module('angularjsNodejsTutorial',[]);
app.controller('myController', function($scope, $http) {
    $scope.message="";
    $scope.Submit = function() {
        var request = $scope.email === '' ? $http.get('/data/undefined') : $http.get('/data/'+$scope.email);
        request.success(function(data) {
            $scope.data = data;
            $scope.email = ''
        });
        request.error(function(data){
            console.log('err');
        });

    }; 
});

// app.controller('friendController', function($scope, $http) {
//     $scope.message="";
//     $scope.FindFriends = function() {
//     var request = $http.get('/friends/'+$scope.email);
//     request.success(function(data) {
//         $scope.data = data;
//     });
//     request.error(function(data){
//         console.log('err');
//     });

// }; 
// });

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
