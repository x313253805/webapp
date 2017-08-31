"use strict";angular.module("app",["ui.router","ngCookies","validation"]),angular.module("app").value("dict",{}).run(function(t,e){t.get("data/city.json").then(function(t){e.city=t.data}),t.get("data/salary.json").then(function(t){e.salary=t.data}),t.get("data/scale.json").then(function(t){e.scale=t.data})}),angular.module("app").config(function(t){t.decorator("$http",["$delegate","$q",function(t,e){var a=t.get;return t.post=function(t,n,i){var o=e.defer();return a(t).then(function(t){o.resolve(t)},function(t){o.reject(t)}),{then:function(t,e){o.promise.then(t,e)}}},t}])}),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/company.html",controller:"companyCtrl"}).state("search",{url:"/search",templateUrl:"view/search.html",controller:"searchCtrl"}).state("login",{url:"/login",templateUrl:"view/login.html",controller:"loginCtrl"}).state("register",{url:"/register",templateUrl:"view/register.html",controller:"registerCtrl"}).state("me",{url:"/me",templateUrl:"view/me.html",controller:"meCtrl"}).state("favorite",{url:"/favorite",templateUrl:"view/favorite.html",controller:"favoriteCtrl"}).state("post",{url:"/post",templateUrl:"view/post.html",controller:"postCtrl"}),e.otherwise("main")}]),angular.module("app").config(function(t){var e={phone:/^1[\d]{10}/,password:function(t){return(t+"").length>5},required:function(t){return!!t}},a={phone:{success:"",error:"必须是11位手机号"},password:{success:"",error:"长度至少6位"},required:{success:"",error:"不能为空"}};t.setExpression(e).setDefaultMsg(a)}),angular.module("app").service("cache",function(t){this.put=function(e,a){t.put(e,a)},this.get=function(e){return t.get(e)},this.remove=function(e){t.remove(e)}}),angular.module("app").directive("appCompany",function(){return{restrict:"A",replace:!0,scope:{com:"="},templateUrl:"view/template/company.html"}}),angular.module("app").directive("appFooter",function(){return{restrict:"A",replace:!0,templateUrl:"view/template/footer.html"}}),angular.module("app").directive("appHead",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/head.html",link:function(e){e.name=t.get("name")}}}),angular.module("app").directive("appHeadBar",function(){return{restrict:"A",replace:!0,templateUrl:"view/template/headBar.html",scope:{text:"@"},link:function(t){t.back=function(){window.history.back()}}}}),angular.module("app").directive("appPositionClass",function(){return{restrict:"A",replace:!0,templateUrl:"view/template/positionClass.html",scope:{com:"="},link:function(t){t.showPositionList=function(e){t.positionList=t.com.positionClass[e].positionList,t.isActive=e},t.$watch("com",function(e){e&&t.showPositionList(0)})}}}),angular.module("app").directive("appPositionInfo",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/positionInfo.html",scope:{isActive:"=",isLogin:"=",pos:"="},link:function(e){e.$watch("pos",function(t){t&&(e.pos.select=e.pos.select||!1,e.imagePath=e.pos.select?"image/star-active.png":"image/star.png")}),e.favorite=function(){t.post("data/favorite.json",{id:e.pos.id,select:!e.pos.select}).then(function(){e.pos.select=!e.pos.select,e.imagePath=e.pos.select?"image/star-active.png":"image/star.png"})}}}}),angular.module("app").directive("appPositionList",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/positionList.html",scope:{data:"=",filterObj:"=",isFavorite:"="},link:function(e){e.select=function(e){t.post("data/favorite.json",{id:e.id,select:!e.select}).then(function(t){e.select=!e.select})}}}}),angular.module("app").directive("appSheet",function(){return{restrict:"A",replace:!0,scope:{list:"=",visiable:"=",select:"&"},templateUrl:"view/template/sheet.html"}}),angular.module("app").directive("appTab",function(){return{restrict:"A",replace:!0,scope:{list:"=",tabClick:"&"},templateUrl:"view/template/tab.html",link:function(t){t.click=function(e){t.selectId=e.id,t.tabClick(e)}}}}),angular.module("app").filter("filterByObj",function(){return function(t,e){var a=[];return angular.forEach(t,function(t){var n=!0;for(var i in e)t[i]!==e[i]&&(n=!1);n&&a.push(t)}),a}}),angular.module("app").controller("companyCtrl",function(t,e,a){e.get("data/company.json?id="+a.params.id).then(function(e){t.company=e.data})}),angular.module("app").controller("favoriteCtrl",function(t,e){e.get("data/myfavorite.json").then(function(e){t.list=e.data})}),angular.module("app").controller("loginCtrl",function(t,e,a,n){t.submit=function(){e.post("data/login.json",t.user).then(function(t){console.log(t.data),a.put("id",t.data.id),a.put("name",t.data.name),a.put("image",t.data.image),n.go("main")})}}),angular.module("app").controller("mainCtrl",function(t,e){e.get("/data/positionList.json").then(function(e){t.list=e.data})}),angular.module("app").controller("meCtrl",function(t,e,a,n){a.get("name")&&(t.name=a.get("name"),t.image=a.get("image")),t.logout=function(){a.remove("id"),a.remove("name"),a.remove("image"),n.go("main")}}),angular.module("app").controller("positionCtrl",function(t,e,a,n,i,o){function r(a){e.get("data/company.json?id="+a).then(function(e){t.company=e.data})}t.isLogin=!!i.get("name"),t.message=t.isLogin?"投个简历":"去登陆",function(){var i=n.defer();return e.get("data/position.json?id="+a.params.id).then(function(e){t.position=e.data,i.resolve(e.data),e.data.posted&&(t.message="已投递")},function(t){i.reject(t.data)}),i.promise}().then(function(t){r(t.companyId)}),t.go=function(){"已投递"!==t.message&&(t.isLogin?e.post("data/handle.json",{id:t.position.id}).then(function(e){o.info(e.data),t.message="已投递"}):a.go("login"))}}),angular.module("app").controller("postCtrl",function(t,e){t.tabList=[{id:"all",name:"全部"},{id:"pass",name:"面试邀请"},{id:"fail",name:"不适合"}],e.get("data/mypost.json").then(function(e){t.positionList=e.data}),t.filterObj={},t.tClick=function(e,a){switch(e){case"all":delete t.filterObj.state;break;case"pass":t.filterObj.state="1";break;case"fail":t.filterObj.state="-1"}}}),angular.module("app").controller("registerCtrl",function(t,e,a,n){t.submit=function(){e.post("data/regist.json",t.user).then(function(t){console.log(t.data),n.go("login")})};var i=60;t.send=function(){e.get("data/code.json").then(function(e){if(1===e.data.state){i=60,t.time="60 s";var n=a(function(){i<=0?(a.cancel(n),t.time=""):(i--,t.time=i+" s")},1e3)}},function(t){})}}),angular.module("app").controller("searchCtrl",function(t,e,a){t.name="",t.search=function(){e.get("data/positionList.json?name="+t.name).then(function(e){t.positionList=e.data})},t.search(),t.sheet={},t.tabList=[{id:"city",name:"城市"},{id:"salary",name:"薪水"},{id:"scale",name:"公司规模"}];var n="";t.tClick=function(e,i){n=e,t.sheet.list=a[e],t.sheet.visiable=!0},t.filterObj={},t.sClick=function(e,a){e?(angular.forEach(t.tabList,function(t){t.id===n&&(t.name=a)}),t.filterObj[n+"Id"]=e):(delete t.filterObj[n+"Id"],angular.forEach(t.tabList,function(t){if(t.id===n)switch(t.id){case"city":t.name="城市";break;case"salary":t.name="薪水";break;case"scale":t.name="公司规模"}}))}});