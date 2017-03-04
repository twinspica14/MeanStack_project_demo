(function(){

    "use strict";

    angular
         .module('StarterApp')
         .controller('RegCtrl', function($scope, User, $state, $http){

         	$scope.usr = {};

         	$scope.submit = function(usr){
         		$scope.errorMsg = false;
         		console.log(usr);
         		//$http.post('/api/userss', usr)
                User.create(usr).then(function(data){
         			console.log(data);
         			if(data.data.success){
         				$scope.successMsg = data.data.message;
         				$state.go('home');
         			} else {
         				$scope.errorMsg = data.data.message;
         			}

         		});

         	}

});

        
     })();