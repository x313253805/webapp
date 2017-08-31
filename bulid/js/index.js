'use strict'


angular.module('app',['ui.router','ngCookies','validation']);

'use strict'

angular.module('app').value('dict',{}).run(function($http,dict){

	$http.get('data/city.json').then(function(resp){
		dict.city = resp.data;
	});

	$http.get('data/salary.json').then(function(resp){
		dict.salary = resp.data;
	});

	$http.get('data/scale.json').then(function(resp){
		dict.scale = resp.data;
	});

});
'use strict'

angular.module('app').config(function($provide){
	$provide.decorator('$http',['$delegate','$q',function($delegate,$q){
		var get = $delegate.get;

		$delegate.post = function(url,data,config){
			var def = $q.defer();
			get(url).then(function(resp){
				def.resolve(resp);
			},function(err){
				def.reject(err);
			});
			return {
				then:function(scb,ecb){
					def.promise.then(scb,ecb);
				}
			}

		}
		return $delegate;
	}]);
});
'use strict';

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
	}).state('search',{
		url:'/search',
		templateUrl:'view/search.html',
		controller:'searchCtrl'
	}).state('login',{
		url:'/login',
		templateUrl:'view/login.html',
		controller:'loginCtrl'
	}).state('register',{
		url:'/register',
		templateUrl:'view/register.html',
		controller:'registerCtrl'
	}).state('me',{
		url:'/me',
		templateUrl:'view/me.html',
		controller:'meCtrl'
	}).state('favorite',{
		url:'/favorite',
		templateUrl:'view/favorite.html',
		controller:'favoriteCtrl'
	}).state('post',{
		url:'/post',
		templateUrl:'view/post.html',
		controller:'postCtrl'
	});
	$urlRouterProvider.otherwise('main');
}]);
'use strict';

angular.module('app').config(function($validationProvider){
	var expression = {
		phone: /^1[\d]{10}/,
		password: function(value){
			var str = value + '';
			return str.length > 5;
		},
		required:function(value){
			return !!value;
		}

	};
	var defaultMsg = {
		phone:{
			success:'',
			error:'必须是11位手机号'
		},
		password:{
			success:'',
			error:'长度至少6位'
		},
		required:{
			success:'',
			error:'不能为空'
		}
	};
	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
});
'use strict'

angular.module('app')
.service('cache',function($cookies){
	this.put = function (key,value){
		$cookies.put(key,value);
	};
	this.get = function(key){
		return $cookies.get(key);
	}
	this.remove = function(key){
		$cookies.remove(key);
	}
});



// .factory('cache',function($cookies){
// 	return {
// 		get:function(key,value){
// 			return $cookies.get(key);
// 		},
// 		put:function(key,value){
// 			$cookies.put(key,value);
// 		}

// 	}
// });
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

angular.module('app').directive('appHead',function(cache){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/head.html',
		link:function($scope){
			$scope.name = cache.get('name');
		}
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

angular.module('app').directive('appPositionInfo',function($http){
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
			

			$scope.$watch('pos',function(newVal){
				if(newVal){
					$scope.pos.select = $scope.pos.select || false;
					$scope.imagePath = $scope.pos.select?'image/star-active.png':'image/star.png';
			
				}
			});

			

			$scope.favorite = function(){
				$http.post('data/favorite.json',{
					id:$scope.pos.id,
					select:!$scope.pos.select
				}).then(function(){
					$scope.pos.select = !$scope.pos.select;
					$scope.imagePath = $scope.pos.select?'image/star-active.png':'image/star.png';
					// console.log($scope.pos.select);
				});
			}
		}
	};
});
'use strict'

angular.module('app').directive('appPositionList',function($http){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionList.html',
		scope:{
			data:'=',
			filterObj:'=',
			isFavorite:'='
		},
		link:function($scope) {
			
			$scope.select = function(item){
				$http.post('data/favorite.json',{
					id:item.id,
					select:!item.select
				}).then(function(resp){
					item.select = !item.select;
				});
				
			}
		}
	};
});
'use strict'

angular.module('app').directive('appSheet',function(){
	return {
		restrict:'A',
		replace:true,
		scope:{
			list:'=',
			visiable:'=',
			select:'&'
		},
		templateUrl:'view/template/sheet.html'
	};
});
'use strict'

angular.module('app').directive('appTab',function(){
	return {
		restrict:'A',
		replace:true,
		scope:{
			list:'=',
			tabClick:'&'
		},
		templateUrl:'view/template/tab.html',
		link:function($scope){
			$scope.click  = function(tab){
				$scope.selectId = tab.id;
				$scope.tabClick(tab);
			};
		}
	};
});
'use strict'

angular.module('app').filter('filterByObj',function(){
	return function(list,obj){
		var result = [];
		angular.forEach(list,function(item){
			var isEqual = true;
			for(var e in obj){
				if(item[e]!==obj[e]){
					isEqual = false;
				}
			}
			if(isEqual){
				result.push(item);
			}
		});
		return result;
	};
	
});
'use strict'

angular.module('app').controller('companyCtrl',function($scope,$http,$state){
	$http.get('data/company.json?id='+$state.params.id).then(function(resp){
		$scope.company = resp.data;
		// console.log(resp.data);
	});
});
'use strict'

angular.module('app').controller('favoriteCtrl',function($scope,$http){

	$http.get('data/myfavorite.json').then(function(resp){
		$scope.list = resp.data;
	});

});
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
'use strict'

angular.module('app').controller('postCtrl',function($scope,$http){

	$scope.tabList = [{
		id:'all',
		name:'全部'
	},{
		id:'pass',
		name:'面试邀请'
	},{
		id:'fail',
		name:'不适合'
	}];

	$http.get('data/mypost.json').then(function(resp){
		$scope.positionList = resp.data;
	});

	$scope.filterObj = {};
	$scope.tClick = function(id,name){
		switch(id){
			case 'all': delete $scope.filterObj.state; break;
			case 'pass': $scope.filterObj.state = '1'; break;
			case 'fail': $scope.filterObj.state = '-1'; break;
		    default:
		}
	}
});
'use strict'

angular.module('app').controller('registerCtrl',function($scope,$http,$interval,$state){

	$scope.submit = function(){
		$http.post('data/regist.json',$scope.user).then(function(resp){
			console.log(resp.data);
			$state.go('login');
		});
	}
	var count = 60;
	$scope.send = function(){
		$http.get('data/code.json').then(function(resp){
			if(resp.data.state === 1){
				count = 60;
				$scope.time = '60 s';
				var interval = $interval(function(){
					if(count <= 0){
						$interval.cancel(interval);
						$scope.time = '';
						
					}else{
						count --;
						$scope.time = count + ' s';
					}
					
				},1000);
			}
		},function(err){});
	}
});
'use strict'

angular.module('app').controller('searchCtrl',function($scope,$http,dict){
	$scope.name = '';

	$scope.search = function(){
		$http.get('data/positionList.json?name='+$scope.name).then(function(resp){
		$scope.positionList = resp.data;
	});

	}
	$scope.search();
	$scope.sheet = {};
	$scope.tabList = [{
		id:'city',
		name:'城市'
	},{
		id:'salary',
		name:'薪水'
	},{
		id:'scale',
		name:'公司规模'
	}];
	var tabId = '';
	$scope.tClick = function(id,name){
		tabId = id;
		// console.log(dict);
		$scope.sheet.list = dict[id];
		$scope.sheet.visiable = true;
		// console.log($scope.sheet);
	}
	$scope.filterObj = {};
	$scope.sClick = function(id,name){
		// console.log(id,name);
		if(id){
			angular.forEach($scope.tabList,function(item){
				if(item.id === tabId){
					item.name = name;
				}
			});
			$scope.filterObj[tabId + 'Id'] = id;
		}else{
			delete $scope.filterObj[tabId + 'Id'];
			angular.forEach($scope.tabList,function(item){
				if(item.id === tabId){
					switch(item.id){
						case 'city':
						 	item.name = "城市";
						 	break;
						 case 'salary':
						 	item.name = "薪水";
						 	break;
						 case 'scale':
						 	item.name = "公司规模";
						 	break;
						 default:
					}
				}
			});
		}
	}
});