//controleur de la page d'accueil (injection du service meteoSvc)
app.controller('qualiteCtrl', function($scope, $location, meteoSvc){
	$scope.titre = "Qualité de l'air";
	$scope.ville = '';
	$scope.reponse = false;

	//si rien dans le localStorage, redirection vers page config
	if(!localStorage.getItem('ville'))
	{
		//console.log('pas de config');
		$location.path('/configuration	'); //redirection
	}
	else
	{
		//affichage de la météo via le service
		$scope.ville = localStorage.getItem('ville');
		meteoSvc.qualite(localStorage.getItem('lat'), localStorage.getItem('lng'))
						.then(function(reponse){
							//console.log(reponse);
							// utile pour debug ou lecture json
							$scope.reponse = reponse;
						});
	}
});