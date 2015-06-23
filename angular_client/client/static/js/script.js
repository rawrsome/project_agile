var App = angular.module('myApp', ['ngRoute']);
// ====> overcoming cross orgin error
	App.config(['$httpProvider', function($httpProvider) {
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}]);
// <==== end


// ====> start partials
	App.config(function($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'partials/tasks.html'
		})
		.when('/tasks', {
			templateUrl: 'partials/tasks.html'
		})
		.when('/users', {
			templateUrl: 'partials/users.html'
		})
		.when('/new_task', {
			templateUrl: 'partials/new_task.html'
		})
		.when('/new_user', {
			templateUrl: 'partials/new_user.html'
		})
		.when('/profile/:id', {
			templateUrl: 'partials/profile.html'
		})
		.otherwise({
			redirectTo: '/'
		});
	});
// <==== end partials



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
							// tasksController
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

	App.controller('tasksController', function($scope, MainFactory, $location) {
	// ====> display all tasks
		console.log('---> show all tasks <--- tasksController');
		$scope.tasks = MainFactory.getTasks(function(res) {
			$scope.tasks = res;
			// console.log($scope.tasks);
		})
	// <==== end display all tasks


	// ====> addTask
		$scope.addTask = function() {
			console.log('---> addTask <--- tasksController', $scope);
			MainFactory.addTask($scope.new_task, function(tasks) {
				$scope.tasks = tasks;
			});
			$scope.new_task = {};
			$location.path('/tasks');
		}
	// <==== end addTask
	});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
							// usersController
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

	App.controller('usersController', function($scope, MainFactory, $location, $routeParams) {

	// ====> display all users
		console.log('---> show all users <--- usersController');
		$scope.users = MainFactory.getUsers(function(res) {
			$scope.users = res;
			// console.log($scope.users);
		})

	// <==== end dispaly all users

	// ====> addUser
		$scope.addUser = function() {
			console.log('---> addUser <--- usersController', $scope);
			MainFactory.addUser($scope.new_user, function(users) {
				$scope.users = users;
			});
			$scope.new_user = {};
			$location.path('/users');
		}
	// <==== end addUser

	// ====> showProfile
		$scope.showProfile = function(res) {
			console.log('---> showProfile <--- usersController');
			user_id = res;
			console.log(user_id);
			$scope.user_profile = MainFactory.showProfile(function(user_id) {
				$scope.user_profile = user_id;
				console.log('usersController getting -> ', $scope.user_profile);
			})
		}
	// <==== end showProfile


	// ====> updateUser
		$scope.updateUser = function() {
			user_id = res;
			console(user_id);
			MainFactory.updateUser(function(update_user, user_id) {
				$scope.users = users;
			});
			$scope.update_user = {};
			$location.path('/users');
		}
	// <==== end updateUser
	});

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ //
							// MainFactory
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ //

	App.factory('MainFactory', function($http) {
		var factory = {};
		var tasks = [];
		var users = [];
		var user_profile = [];

	// -=-=> getTasks
		factory.getTasks = function(callback) {
			console.log('-=-> getTasks <-=- MainFactory', callback);
			$http.get('http://localhost:3000/tasks').success(function(res) {
				tasks = res;
				callback(tasks);
			})
		}
	// <=-=- end getTasks

	// -=-=> addTask
		factory.addTask = function(new_task, callback) {
			console.log('-=-> addTask <-=- MainFactory', callback);
			$http({
				method: 'POST',
				url: 'http://localhost:3000/tasks',
				params: new_task,
				headers: {'Content-type': 'application/x-www-form-urlencoded'}
			}).success(function(res) {
				tasks = res;
				callback(tasks);
			})
			console.log(new_task);
		}
	// <=-=- end addTask





	// ====> showProfile
		factory.showProfile = function(callback) {
			console.log('===> showProfile <=== MainFactory', callback);
			$http.get('http://localhost:3000/users/'+user_id).success(function(res) {
				user_profile = res;
				console.log('Factory getting -> ', user_profile);
				callback(user_profile);
			})
		}
	// <==== end showProfile


	// ====> getUsers
		factory.getUsers = function(callback) {
			console.log('===> getUsers <=== MainFactory', callback);
			$http.get('http://localhost:3000/users').success(function(res) {
				users = res;
				callback(users);
			})
		}
	// <==== end getUsers


	// ====> updateUser
		factory.updateUser = function(update_user, callback) {
			console.log('===> updateUser <=== UserFactory', callback);
			$http({
				method: 'POST',
				url: 'http://localhost:3000/users',
				params: update_user,
				headers: {'Content-type': 'application/x-www-form-urlencoded'}
			}).success(function(res) {
				users = res;
				callback(users);
			})
			console.log(update_user);
		}

	// <==== end updateUser


	// ====> addUser
		factory.addUser = function(new_user, callback) {
			console.log('===> addUser <=== UserFactory', callback);
			$http({
				method: 'POST',
				url: 'http://localhost:3000/users',
				params: new_user,
				headers: {'Content-type': 'application/x-www-form-urlencoded'}
			}).success(function(res) {
				users = res;
				callback(users);
			})
			console.log(new_user);
		}
	// <==== end addUser
	return factory;
	});