'use strict'

angular.module('app').controller('loginCtrl',function($scope,$http,cache,$state){

	$scope.submit = function(){
		$http.post('data/login.json',$scope.user).then(function(resp){
			console.log(resp.data);
			cache.put('id',resp.data.id);
			cache.put('name',resp.data.name);
			cache.put('image',resp.data.image);
			$state.go('main');
		})
	}
});