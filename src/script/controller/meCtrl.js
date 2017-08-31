'use strict'

angular.module('app').controller('meCtrl',function($scope,$http,cache,$state){

	if(cache.get('name')){
		$scope.name = cache.get('name');
		$scope.image = cache.get('image');
	}

	$scope.logout = function(){
		cache.remove('id');
		cache.remove('name');
		cache.remove('image');

		$state.go('main');
	}
});