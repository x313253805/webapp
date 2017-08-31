'use strict'

angular.module('app').controller('positionCtrl',function($scope,$http,$state,$q,cache,$log){
	// cache.put('to','you');
	$scope.isLogin = !!cache.get('name');
	$scope.message = $scope.isLogin?'投个简历':'去登陆';

	function getPosition(){
		var def = $q.defer();
		$http.get('data/position.json?id=' + $state.params.id).then(function(resp){
			$scope.position = resp.data;
			def.resolve(resp.data);
			if(resp.data.posted){
				$scope.message = '已投递';
			}
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

	$scope.go = function(){
		if($scope.message !== '已投递'){
			if($scope.isLogin){
			$http.post('data/handle.json',{
				id:$scope.position.id
			}).then(function(resp){
				$log.info(resp.data);
				$scope.message = '已投递';
				});
			}else{
				$state.go('login');
			}
		}
		
	}
});