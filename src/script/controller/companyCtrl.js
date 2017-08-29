'use strict'

angular.module('app').controller('companyCtrl',function($scope,$http,$state){
	$http.get('data/company.json?id='+$state.params.id).then(function(resp){
		$scope.company = resp.data;
		// console.log(resp.data);
	});
});