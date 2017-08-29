'use strict'


angular.module('app',['ui.router','ngCookies']);

'use strict'

angular.module('app').controller('companyCtrl',function($scope,$http,$state){
	$http.get('data/company.json?id='+$state.params.id).then(function(resp){
		$scope.company = resp.data;
		// console.log(resp.data);
	});
});
'use strict'

angular.module('app').controller('mainCtrl',function($scope,$http){



	$http.get('/data/positionList.json').then(function(resp){
		$scope.list = resp.data;
		// console.log(resp);
	});
	// $scope.list = [{
	// 	id:'1',
	// 	name:'销售',
	// 	imgSrc:'image/company-3.png',
	// 	companyName:'千度',
	// 	city:'上海',
	// 	industry:'互联网',
	// 	time:'2016-06-01 11:05'
	// },{
	// 	id:'2',
	// 	name:'web前端',
	// 	imgSrc:'image/company-1.png',
	// 	companyName:'慕课网',
	// 	city:'北京',
	// 	industry:'互联网',
	// 	time:'2016-06-01 01:05'
	// },{
	// 	id:'3',
	// 	name:'销售',
	// 	imgSrc:'image/company-3.png',
	// 	companyName:'千度',
	// 	city:'上海',
	// 	industry:'互联网',
	// 	time:'2016-06-01 11:05'
	// }];
});
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
'use strict'

angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url:'/main',
		templateUrl:'view/main.html',
		controller:'mainCtrl'
	}).state('position',{
		url:'/position/:id',
		templateUrl:'view/position.html',
		controller:'positionCtrl'
	}).state('company',{
		url:'/company/:id',
		templateUrl:'view/company.html',
		controller:'companyCtrl'
	});
	$urlRouterProvider.otherwise('main');
}]);
'use strict'

angular.module('app').directive('appCompany',function(){
	return {
		restrict:'A',
		replace:true,
		scope:{
			com:'='
		},
		templateUrl:'view/template/company.html'
	}

});
'use strict'

angular.module('app').directive('appFooter',function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/footer.html'
	}
});
'use strict'

angular.module('app').directive('appHead',function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/head.html'
	};
});
'use strict'

angular.module('app').directive('appHeadBar',function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/headBar.html',
		scope:{
			text:'@'
		},
		link:function($scope){
			$scope.back = function(){
				window.history.back();
			}
		}
	};
});
'use strict'

angular.module('app').directive('appPositionClass',function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionClass.html',
		scope:{
			com:'='
		},
		link:function($scope){
			$scope.showPositionList = function(idx){
				$scope.positionList = $scope.com.positionClass[idx].positionList;

				$scope.isActive = idx;
			}
			$scope.$watch('com',function(newVal){
				if(newVal) $scope.showPositionList(0);
			});
		}
		
	};
});
'use strict'

angular.module('app').directive('appPositionInfo',function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionInfo.html',
		scope:{
			isActive:'=',
			isLogin: '=',
			pos: '='
		},
		link:function($scope){
			$scope.imagePath = $scope.isActive?'image/star-active.png':'image/star.png';
		}
	};
});
'use strict'

angular.module('app').directive('appPositionList',function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionList.html',
		scope:{
			data:'='
		}
	};
});
'use strict'

angular.module('app')
// .service('cache',function($cookies){
// 	this.put = function (key,value){
// 		$cookies.put(key,value);
// 	};
// 	this.get = function(key){
// 		return $cookies.get(key);
// 	}
// 	this.remove = function(key){
// 		$cookies.remove(key);
// 	}
// });



.factory('cache',function($cookies){
	return {
		get:function(key,value){
			return $cookies.get(key);
		},
		put:function(key,value){
			$cookies.put(key,value);
		}

	}
});