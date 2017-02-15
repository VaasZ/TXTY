var register = angular.module("register",["ngCookies"]);
register.controller("registerCtrl",["$scope","$http","$cookies",function($scope,$http,$cookies){
	$scope.username = "";
	$scope.userpwd = "";
	$scope.userpwdR = "";
	$scope.email = "";
	$scope.phone = "";
	$scope.result1 = true;
	$scope.result2 = true;
	$scope.result3 = true;
	$scope.result4 = true;
	$scope.checkUserName = function(){
		var reg = /^[a-zA-z][a-zA-Z0-9_]{3,}$/;
		$scope.result1 = reg.test($scope.username); 
	}
	$scope.checkUserPwd = function(){
		var reg = /^[a-zA-Z0-9_]{6,16}$/;
		$scope.result2 = reg.test($scope.userpwd); 
	}
	$scope.checkUserEmail = function(){
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
		$scope.result3 = reg.test($scope.email); 
	}
	$scope.checkUserPhone = function(){
		var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/ ;
		$scope.result4 = reg.test($scope.phone); 
	}
	$scope.submitUser = function(){
		if ($scope.result1 && $scope.result2 && $scope.result3 && $scope.result4 && $scope.userpwd==$scope.userpwdR && $scope.userpwd!="") {
			$http({
				url:"http://127.0.0.1/天选体育/php/main.php",
				method:"POST",
				data:{user_name:$scope.username,
					  user_pwd:$scope.userpwd,
					  user_email:$scope.email,
					  user_phone:$scope.phone},
			}).then(function(response){
				console.log(response.data);
				if(response.data == "true"){
					alert("注册成功!");
					$cookies.put("username", $scope.username);
					window.location.href = "http://127.0.0.1/%E5%A4%A9%E9%80%89%E4%BD%93%E8%82%B2/home.html";
				}else if(response.data == "false"){
					
					alert("用户名已被注册");
				}
			});
		}else{
			alert("请完善您的个人信息!");
		}
	}
}]);