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