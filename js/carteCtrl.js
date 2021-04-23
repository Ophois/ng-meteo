//controleur de la page carte (injection du service meteoSvc)
app.controller('carteCtrl', function($scope, $location, meteoSvc){
	$scope.titre = "Carte";

	//idem page d'accueil. Si ville dans le localStorage affichage, 
	//sinon redirection config
	if(!localStorage.getItem('ville'))
	{
		//console.log('pas de config carte');
		$location.path('/configuration');
	}
	else
	{
		$scope.ville = localStorage.getItem('ville');
		meteoSvc.carte();
	}
});