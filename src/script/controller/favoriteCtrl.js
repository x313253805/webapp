'use strict'

angular.module('app').controller('favoriteCtrl',function($scope,$http){

	$http.get('data/myfavorite.json').then(function(resp){
		$scope.list = resp.data;
	});

});