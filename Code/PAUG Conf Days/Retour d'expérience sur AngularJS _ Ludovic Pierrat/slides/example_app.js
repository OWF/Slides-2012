// Declare app level module which depends on filters, and services
angular.module('todostacularApp', ['todostacularApp.services']).config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/', {
		controller : TodolistCtrl,
		templateUrl: 'partials/main.html'
	});
	$routeProvider.otherwise({
		redirectTo : '/'
	});
}]);