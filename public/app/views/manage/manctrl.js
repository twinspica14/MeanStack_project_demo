(function(){

    "use strict";

    angular
         .module('StarterApp')
         .controller('ManCtrl', function($scope, User, $state, $http){
      
      $scope.users = {};
      $scope.ppl = {};
        $scope.accessDenied = true;
        $scope.errorMsg  = false;
        $scope.editAccess = false;
        $scope.deleteAccess = false;

function showusr(){
      User.getallusr().then(function(data){
            // Check if able to get data from database
            if (data.data.success) {
                // Check which permissions the logged in user has
                if (data.data.permission === 'admin' || data.data.permission === 'moderator') {
                    $scope.users = data.data.users; // Assign users from database to variable
                    // Stop loading icon
                    $scope.accessDenied = false; // Show table
                    // Check if logged in user is an admin or moderator
                    if (data.data.permission === 'admin') {
                        $scope.editAccess = true; // Show edit button
                        $scope.deleteAccess = true; // Show delete button
                    } else if (data.data.permission === 'moderator') {
                        $scope.editAccess = true; // Show edit button
                    }
                } else {
                    $scope.errorMsg = 'Insufficient Permissions'; // Reject edit and delete options
                     // Stop loading icon
                }
            } else {
                $scope.errorMsg = data.data.message; // Set error message
                 // Stop loading icon
            }
        });
};

showusr();

$scope.deleteusr = function(name){
    User.delete(name).then(function(data){
        if(data.data.success){
            showusr();
        } else {
            $scope.showerrormssg = data.data.message;
        }

    })
}

});
     

        
     })();