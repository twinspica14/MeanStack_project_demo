(function(){

    "use strict";

    angular
         .module('StarterApp')
         .controller('HomeCtrl', function($scope, PostBlog, $state, $http){

  $scope.obj = {};
 $scope.blog = {};
    


PostBlog.displayBlog().then(function(data){
          console.log(data.data)
                    $scope.blog = data.data; // Assign users from database to variable
                    
 

});



});

        
     })();