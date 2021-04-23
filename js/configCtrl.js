//controleur de la page configuration (injection du service meteoSvc)
app.controller('configCtrl', function($scope, $location, meteoSvc){
	$scope.titre = "Configuration";
	$scope.resultat = false; //blocage de l'affichage du bloc ul/li
	/* options de géolocalisation */
	$scope.options = {
  	enableHighAccuracy: true,
  	timeout: 5000,
  	maximumAge: 0
	};
	//fonctions géolocalisation
	$scope.trouver = function()
	{
		navigator.geolocation.getCurrentPosition(function(pos){
			//console.log(pos);
			meteoSvc.geolocation(pos.coords.latitude, pos.coords.longitude)
			.then(function(retour){
				localStorage.setItem('ville', retour[0].nom);
				localStorage.setItem('departement', retour[0].departement.nom);
				localStorage.setItem('lat', retour[0].centre.coordinates[1]);
				localStorage.setItem('lng', retour[0].centre.coordinates[0]);
				localStorage.setItem('contours', JSON.stringify(retour[0].contour.coordinates[0]));
				//redirection page d'accueil
				$location.path('/');
			});
		}, function(err){
			console.log(err);
		}, $scope.options);
	};
	//recherche de la liste des villes via le service
	$scope.chercher = function(){
		//console.log($scope.maVille);
		//appel au service (API)
		meteoSvc.listeVilles($scope.maVille)
		.then(function(reponse){
		 	$scope.liste = reponse;
		 	$scope.resultat = true;
		});
	};
	//enregistrement des infos dans le localStorage et redirection accueil
	$scope.afficher = function(ville)
	{
		//console.log(ville);
		//stockage des infos dans le localStorage
		localStorage.setItem('ville', ville.nom);
		localStorage.setItem('departement', ville.departement.nom);
		localStorage.setItem('lat', ville.centre.coordinates[1]);
		localStorage.setItem('lng', ville.centre.coordinates[0]);
		localStorage.setItem('contours', JSON.stringify(ville.contour.coordinates[0]));
		//redirection page d'accueil
		$location.path('/');
	};
});