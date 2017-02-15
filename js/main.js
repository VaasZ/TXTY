$('#myCarousel').carousel({
	interval: 3000
});
//轮播
var home = angular.module("home",["ngRoute","ngCookies"]);
home.controller("homeCtrl",["$scope","$http","$cookies",function($scope,$http,$cookies){
	$cookies.get("username")	;
	$scope.result1 = true;
	if($cookies.get("username")){
		$scope.userInfo = "欢迎"+$cookies.get("username");
		$scope.result1 = false;
	}else{
		$scope.result1 = true;
	}
	$scope.removeUser = function(){
		$cookies.remove("username");
		window.location.reload();
	}
	$http({
		url:"http://127.0.0.1/%E5%A4%A9%E9%80%89%E4%BD%93%E8%82%B2/php/goods.php",
	}).then(function(response){
		console.log(response.data);
		$scope.skateArray = [];
		$scope.shoseArray = [];
		$scope.clothesArray = [];
		$scope.newArray = [];
		$scope.newArray = [];
		for (var i = 0;i<response.data.length;i++) {
			if(i<4){
				$scope.newArray.push(response.data[i]);
			}
			if(response.data[i].category == "skate"){
				$scope.skateArray.push(response.data[i]);
			}else if(response.data[i].category == "shose"){
				$scope.shoseArray.push(response.data[i]);
			}else if(response.data[i].category == "clothes"){
				$scope.clothesArray.push(response.data[i]);
			}
		}
		$scope.goodsClick = function(){
			console.log(this.k.goods_name);
			$http({
				
			}).then(function(response){
				
			});
		}
	});
}]);
//angularjs1.6.0以上版本需要配置
home.config(["$locationProvider",function($locationProvider){
	$locationProvider.hashPrefix("");
}]);
//配置路由信息
home.config(function($routeProvider){
	$routeProvider.when("/skate",{templateUrl:"skate.html"});
	$routeProvider.when("/shose",{templateUrl:"shose.html"});
	$routeProvider.when("/clothes",{templateUrl:"clothes.html"});
	$routeProvider.when("/new",{templateUrl:"new.html"});
	$routeProvider.otherwise({templateUrl:"homelunbo.html"});
});
