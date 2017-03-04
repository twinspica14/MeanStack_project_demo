(function(){

    "use strict";

    angular
         .module('StarterApp')
         .controller('AboutCtrl', function($scope, PostBlog, $state, $http){

          $scope.p = {};

          $scope.submit = function(p){
          
            console.log(p);
            //$http.post('/api/userss', usr)
                PostBlog.createBlog(p).then(function(data){
              console.log(data);
            });
                $scope.p = {};
          }

});

        
     })();



























           