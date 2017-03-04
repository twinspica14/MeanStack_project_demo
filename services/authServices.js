(function(){

	"use strict";

	angular

		.module('authServices', [])

		.factory('auth', function($http, authtoken) {
    var authFactory = {}; // Create the userFactory object

    // Register users in database
    authFactory.login = function(logg) {
        return $http.post('/api/authenticates', logg).then(function(data){
        	console.log(data.data.token);
        	authtoken.settoken(data.data.token);
        	return data;
        });
    };
			authFactory.isLoggedIn = function(){
				if(authtoken.gettoken()){
					return true;
				} else {
					return false;
				}
			};	

			authFactory.getuser = function(){
				if(authtoken.gettoken()){
					return $http.post('/api/mes');

				} else {
					$q.reject({message: 'user has no token'});
				}
			};

			authFactory.logout = function(){
				authtoken.settoken();
			};	

			return authFactory;
		})


		.factory('authtoken', function($window) {
    var authtokenFactory = {}; // Create the userFactory object

    // Register users in database
    authtokenFactory.settoken = function(token) {
    	if(token){
        $window.localStorage.setItem('token', token);
    } else {
    	$window.localStorage.removeItem('token');
    }
    };

    authtokenFactory.gettoken = function(){
    	return $window.localStorage.getItem('token');
    };
							
			return authtokenFactory;
		})

	.factory('AuthInterceptors', function(authtoken) {
    var authInterceptorsFactory = {}; // Create factory object

    // Function to check for token in local storage and attach to header if so
    authInterceptorsFactory.request = function(config) {
        var token = authtoken.gettoken(); // Check if a token is in local storage
        if (token){ 
        config.headers['x-access-token'] = token; //If exists, attach to headers
    };
        return config; // Return config object for use in app.js (config file)
    };

    return authInterceptorsFactory; // Return factory object

});

})();