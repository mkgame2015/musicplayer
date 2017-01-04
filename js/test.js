var app = angular.module('testApp', ['ui.router']);
app.controller('indexCtrl',function($scope,aaa){
	$scope.name = aaa.aa;
	console.log($scope.name);
});
app.controller('homeCtrl',function($scope,aaa){
	aaa.name($scope.name);
	console.log(aaa.aa)
});
app.service('aaa',function(){
	this.aa = "123";
	this.name = function(name){
		if(name){
			this.aa = name;
			console.log(this.aa);
			return this.aa;
		}else{
			return this.aa;
		}
	};
})