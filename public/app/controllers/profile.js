(function(){

    "use strict";

    angular
         .module('StarterApp')
         .controller('ProfileCtrl', function($scope, User, PostBlog, $state, $http){

          $scope.obj = {};
 $scope.blog = {};
     $scope.name = {}; 
User.getme().then(function(data){
	console.log(data.data.name)
	$scope.name = data.data.name;
});

PostBlog.displayBlog().then(function(data){
          console.log(data.data)
                    $scope.blog = data.data; // Assign users from database to variable
                    
 

});




$scope.delete = function(usr){
PostBlog.deleteBlog(usr);
};












});

        
     })();
