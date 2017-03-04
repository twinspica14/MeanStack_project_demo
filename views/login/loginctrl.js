(function(){

    "use strict";

    angular
         .module('StarterApp')
         .controller('LoginCtrl', function($scope, $state, User, auth, $http){

         	
            if(auth.isLoggedIn()){
                console.log("success logged fucker");
                auth.getuser().then(function(data){
                   
                    $scope.name = data.data.name;
                    $scope.email = data.data.email;

                    User.getp().then(function(data){
                        console.log(data.data.permission);
                        if(data.data.permission == 'admin' || data.data.permission == 'moderator'){
                            $scope.grantedpermission = true;
                        }else if(data.data.permission == 'user'){
                             $scope.grantedpermission = false;
                             $scope.grantedprofile = true;// Show main HTML now that data is obtained in AngularJS
                        } else{
                             $scope.grantedpermission = false;
                             $scope.grantedprofile = false;// Show main HTML now that data is obtained in AngularJS
                        }

                    })
                });



            } else {
                console.log('failure');
            }

            $scope.submit = function(logg){
                $scope.errorMsg = false;
                console.log(logg);
                //$http.post('/api/userss', usr)
                auth.login(logg).then(function(data){
                    console.log(data);
                    if(data.data.success){
                        $scope.successMsg = data.data.message;
                        $state.go('about');
                    } else {
                        $scope.errorMsg = data.data.message;
                    }

                });

            }

            $scope.logout = function(){
                auth.logout();
                $state.go('login');
            }

});
        
        
     })();