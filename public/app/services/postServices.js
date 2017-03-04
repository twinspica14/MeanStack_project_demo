(function(){

	"use strict";

	angular

		.module('postServices', [])
		.factory('PostBlog', function($http) {
    var postFactory = {}; // Create the userFactory object

    // Register users in database
    

    postFactory.createBlog = function(p) {
        return $http.post('/api/blogss', p);
    };

     postFactory.displayBlog = function() {
        return $http.get('/api/blogss');
    };

   

     postFactory.deleteBlog = function(h) {
            return $http.delete('/api/blogss/' + h);
        };

			return postFactory;
		});
})();