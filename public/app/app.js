angular
	.module("StarterApp",['approutes', 'userServices', 'authServices', 'postServices'])
	.config(function($httpProvider){
	$httpProvider.interceptors.push('AuthInterceptors');	
	});


