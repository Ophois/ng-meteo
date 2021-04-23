// service pour l'utilisation des API (réutilisable)
app.service('meteoSvc', function($http){
	//variables de configuration
	this.apikey = "d2e33b810d399f2fb3d6791d161388ec";
	this.fields = "departement,centre,contour";
	this.language = 'fr';
	this.details = true;
	this.exclude = "hourly,minutely";
	this.exclude2 = "minutely,daily";
	this.units = "metric";
	//ID de la div qui contient la carte
	this.idCarte = 'maCarte';
	this.polyg = null;
	
	// inversion latitude/longitude pour le dessin des contours
	this.invPolig = function(){
		let retour = [];
		this.polyg.forEach(function(e){
			retour.push([e[1], e[0]]);
		});
		return retour;
	}

	//retourne la liste des villes correspondant à une recherche
	this.listeVilles = function(ville)
	{
		//$http().then(function success(reponse){}, function error(reponse){}) 
		//permet d'appeler des API (promise)
		return $http({
			method: 'GET',
			url: 'https://geo.api.gouv.fr/communes',
			params: { fields: this.fields , nom: ville},
		})
		.then(function success(response){
			//console.log(response.data);
			return response.data;
		}, function error(response){
			console.log(response.statusText);
		});
	};
	// retourne la ville qui corresponds à des coordonnées GPS
	this.geolocation = function(lat, lng)
	{
		return $http({
			method: 'get',
			url: 'https://geo.api.gouv.fr/communes',
			params: {lat: lat, lon: lng, fields: this.fields}
		})
		.then( 
			function(response){
				return response.data;
			}, 
			function(err){
				return err.statusText;
			});
	};

	// retourne la météo pour une ville en fonction de ses coordonnées GPS
	this.conditions = function(lat, lng)
	{
		return $http({
			method: 'GET',
			url: 'https://api.openweathermap.org/data/2.5/onecall',
			params: {lat: lat, lon: lng, appid: this.apikey, exclude: this.exclude2, units: this.units, lang: this.language},
		})
		.then( 
			function success(response){
				return response.data;
			}, 
			function error(response){
				return response.statusText;
			});
	}
	// retourne les prévisions pour les jours à venir
	this.previsions = function(lat, lng)
	{
		return $http({
			method: 'GET',
			url: 'https://api.openweathermap.org/data/2.5/onecall',
			params: {lat: lat, lon: lng, appid: this.apikey, exclude: this.exclude, units: this.units, lang: this.language},
		})
		.then( 
			function success(response){
				return response.data;
			}, 
			function error(response){
				return response.statusText;
			});
	}
	// retourne la qualite de l'air
	this.qualite = function(lat, lng)
	{
		return $http({
			method: 'GET',
			url: 'https://api.openweathermap.org/data/2.5/air_pollution',
			params: {lat: lat, lon: lng, appid: this.apikey},
		})
		.then( 
			function success(response){
				return response.data;
			}, 
			function error(response){
				return response.statusText;
			});
	}

	// Affichage de la carte pour une ville
	// ne pas oublier de mettre une hauteur pour la carte dans le CSS
	this.carte = function()
	{
		//coordonnées stockées dans le localStorage.
		let coords = [localStorage.getItem('lat'), localStorage.getItem('lng')];
		//contour de la ville
		this.polyg = JSON.parse(localStorage.getItem('contours'));
		//création de la carte.
		var map = L.map(this.idCarte).setView(coords, 13); //13 = niveau de zoom de départ
		//copyright OpenStreetMap
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
		//le marqueur avec le texte (non paramétré)
		L.marker(coords).addTo(map)
    .bindPopup(localStorage.getItem('ville'))
    .openPopup();
    L.polygon(this.invPolig()).addTo(map);
	}
});