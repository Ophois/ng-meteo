//controleur de la page crédits
app.controller('creditsCtrl', function($scope, $location){
	$scope.titre = "Crédits";
	$scope.credits = [
		{nom: 'Angular.JS', url: 'https://angularjs.org/'}, 
		{nom: 'Bootstrap 4.6', url: 'https://getbootstrap.com/docs/4.6/getting-started/introduction/'},
		{nom: 'HTML5', url: 'https://www.w3.org/'},
		{nom: 'CSS3', url: 'https://www.w3.org/'},
		{nom: 'Leaflet.js', url: 'https://leafletjs.com/'},
		{nom: 'OpenStreetMap', url: 'https://www.openstreetmap.fr/'},
		{nom: 'OpenWeatherMap', url: 'https://openweathermap.org/api'},
		{nom: 'Geo.api.gouv.fr', url: 'https://geo.api.gouv.fr/'},
		{nom: 'JSON Online Viewer', url: 'http://jsonviewer.stack.hu/'},
		{nom: 'Service Public', url: 'https://www.service-public.fr/professionnels-entreprises/vosdroits/F31228'} 
	];
});