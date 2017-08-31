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