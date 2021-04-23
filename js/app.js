//modules + controleurs + routage (injection du module routage)
var app = angular.module('routage', ['ngRoute', 'ngAnimate']);
//configuration des routes
//$routeProvider permet de configurer les différentes routes
app.config(function($routeProvider){
	$routeProvider
	//si '/' dans l'url, appel de home.html + controleur homeCtrl
	.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'homeCtrl'
	})
	.when('/previsions', {
		templateUrl: 'templates/previsions.html',
		controller: 'previsionsCtrl'
	})
	.when('/meteo', {
		templateUrl: 'templates/meteo.html',
		controller: 'meteoCtrl'
	})
	.when('/qualite', {
		templateUrl: 'templates/qualite.html',
		controller: 'qualiteCtrl'
	})
	.when('/configuration', {
		templateUrl: 'templates/config.html',
		controller: 'configCtrl'
	})
	.when('/carte', {
		templateUrl: 'templates/carte.html',
		controller: 'carteCtrl'
	})
	.when('/credits', {
		templateUrl: 'templates/credits.html',
		controller: 'creditsCtrl'
	})
	.when('/mentionslegales', {
		templateUrl: 'templates/ml.html',
		controller: 'mlCtrl'
	})
	//équivalent 404
	.otherwise({
		redirectTo: '/'
	});
});

//filtre pour première lettre en majuscule
app.filter('ucfirst', function(){
	return function(data) {
		return data.charAt(0).toUpperCase() + data.slice(1);
	}
});

