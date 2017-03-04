(function(){

	"use strict";

	angular

		.module('userServices', [])
		.factory('User', function($http) {
    var userFactory = {}; // Create the userFactory object

    // Register users in database
    userFactory.create = function(usr) {
        return $http.post('/api/usersss', usr);
    };


    userFactory.getp = function(){
    	return $http.get('/api/permissions/');
    };

     userFactory.getallusr = function(){
        return $http.get('/api/management/');

    };

    userFactory.delete = function(name){
        return $http.delete('/api/management/' + name);

    };
			

			return userFactory;
		});
})();