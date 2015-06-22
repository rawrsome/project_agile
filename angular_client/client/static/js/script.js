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

	App.controller('usersController', function($scope, MainFactory, $location) {
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
	});

// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ //
							// MainFactory
// +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ //

	App.factory('MainFactory', function($http) {
		var factory = {};
		var tasks = [];
		var users = [];

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
		factory.addTask = function(callback) {
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





	// ====> getUsers
		factory.getUsers = function(callback) {
			console.log('===> getUsers <=== MainFactory', callback);
			$http.get('http://localhost:3000/users').success(function(res) {
				users = res;
				callback(users);
			})
		}
	// <==== end getUsers

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