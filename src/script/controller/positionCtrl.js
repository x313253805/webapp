'use strict'

angular.module('app').controller('positionCtrl',function($scope,$http,$state,$q,cache){
	// cache.put('to','you');
	$scope.isLogin = false;

	// function getPosition(){
	// 	var def = $q.defer();
	// 	$http.get('/data/position.json?id=' + $state.params.id).then(function(resp){
	// 	$scope.position = resp.data;}
	// 	def.resolve(resp.data);
	// }).error(function(err){
	// 	def.reject(err);
	// });

	// return def.promise;
	// }

	function getPosition(){
		var def = $q.defer();
		$http.get('data/position.json?id=' + $state.params.id).then(function(resp){
			$scope.position = resp.data;
			def.resolve(resp.data);
		},function(resp){
			def.reject(resp.data);
		});
		return def.promise;
	}
	

	function getCompany(id){
		$http.get('data/company.json?id=' + id).then(function(resp){
			$scope.company = resp.data;
			// console.log(resp.data);
		});
	}

	getPosition().then(function(obj){
		
		getCompany(obj.companyId);

	});
});