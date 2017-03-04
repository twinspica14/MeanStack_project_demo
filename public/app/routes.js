angular

	.module("approutes",['ui.router'])
	.config(function($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider){

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'app/views/pages/home.html',
				controller: 'HomeCtrl'
				
			})

			.state('about', {
				url: '/about',
				templateUrl: 'app/views/pages/about.html',
				controller: 'AboutCtrl',
				 needAdmin: true
			 
            			
			})
			.state('management', {
				url: '/management',
				templateUrl: 'app/views/manage/manage.html',
				controller: 'ManCtrl',
				  needAdmin: true,
			
				 permission: ['admin', 'user']
            			
			})

			.state('profile', {
						url: '/profile',
						templateUrl: 'app/views/pages/profile.html',
						controller: 'ProfileCtrl',
						 needAdmin: true
						

		            			
					})

			.state('login', {
						url: '/login',
						templateUrl: 'app/views/login/login.html',
						controller: 'LoginCtrl',
                 needAdmin: false
				
            			
					})

			.state('register', {
						url: '/register',
						templateUrl: 'app/views/registration/register.html',
						controller: 'RegCtrl',
                 needAdmin: false
			
					})

	

		$urlRouterProvider.otherwise('/home');

		$locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});


	})
//the way services is entered in that order its object should be called
 .run(['$rootScope', 'User', 'auth','$state',  function($rootScope, User, auth, $state){
            $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams){
                console.log(auth.isLoggedIn());
                if(toState.needAdmin  == true){
                	console.log('signed');
                	if(!auth.isLoggedIn()){
                	e.preventDefault();
                	$state.go('home');
					} else if(toState.permission){
						 User.getp().then(function(data){
							if(toState.permission[0]!==data.data.permission){
								if(toState.permission[1]!==data.data.permission){
									e.preventDefault();
                					$state.go('home');
								}
							}

						});

					};
                }else if(toState.needAdmin  == false){

                	if(auth.isLoggedIn()){
                	e.preventDefault();
                	
}
                }
                
            })
         }]);

