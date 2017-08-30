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
});