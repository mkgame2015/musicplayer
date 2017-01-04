var app = angular.module('ionicApp', ['ionic']);
app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('tabs', {
			url: "/tab",
			abstract: true,
			templateUrl: "tabs.html",
			controller: 'tabsCtrl'
		})
		.state('tabs.list', {
			url: "/list",
			views: {
				'list-tab': {
					templateUrl: 'list.html',
					controller:'listCtrl'
				}
			}
		})
		.state('tabs.facts', {
			url: "/facts",
			views: {
				'list-tab': {
					templateUrl: "facts.html",
					controller:'factsCtrl'
				}
			}
		})
		.state('tabs.play', {
			url: "/play",
			views: {
				'play-tab': {
					templateUrl: "play.html",
					controller:'playCtrl'
				}
			}
		})
		.state('tabs.search', {
			url: "/search",
//			abstract: true,
			views: {
				'search-tab': {
					templateUrl: "search.html",
					controller:'searchCtrl'
				}
			}
		})
		.state('tabs.search.searchlist', {
			url: "/searchlist",
			views: {
				'search-tab': {
						templateUrl: "searchlist.html",
						controller:'searchlistCtrl'
				}
			}
		
		})
		.state('tabs.contact', {
			url: "/contact",
			views: {
				'search-tab': {
					templateUrl: "contact.html"
				}
			}
		});
	$urlRouterProvider.otherwise("/tab/play");
});
//app.controller('HomeTabCtrl', function($scope) {
//	console.log('HomeTabCtrl');
//});
app.controller('tabsCtrl', function($rootScope,$scope,$http) {
	//获取audio对象
	$scope.music = document.querySelector('#ado');
	//当前歌单
	$scope.curgonglist='';
	//当前歌曲
	$scope.cursong='';
	//获取准备查看的歌单id
	$scope.$on('getSonglistId',function(event,data){
		getSonglist(data);
	})
	//获取歌单
	var getSonglist = function(topid){
		$http.get('http://route.showapi.com/213-4?',{
			params:{
				showapi_appid:'29306',
				showapi_sign:'545df128a7c84b279611932939d9a064',
	         	topid:topid
			}
		}).success(function(data){
			console.log(data);
			$scope.songlist = data.showapi_res_body.pagebean.songlist;
			$scope.curgonglist = $scope.songlist;
		});
	};
	//获取播放歌曲下标
	$scope.$on('cursong',function(event,data){
		console.log(data);
		$scope.cursong = $scope.curgonglist[data];
		playsong($scope.cursong);

	})
	//定义播放歌曲函数
	var playsong = function(song){
		$scope.music.src = song.url ;
		$scope.music.play();
	}
});
app.controller('listCtrl',function($scope,$window){
	//歌单列表
	$scope.songlists = [{
		id:3,
		listname:'欧美歌曲'
	},{
		id:5,
		listname:'内地歌曲'
	},{
		id:6,
		listname:'港台歌曲'
	},{
		id:16,
		listname:'韩国歌曲'
	},{
		id:17,
		listname:'日本歌曲'
	},{
		id:18,
		listname:'民谣歌曲'
	},{
		id:19,
		listname:'摇滚歌曲'
	},{
		id:23,
		listname:'销量歌曲'
	},{
		id:26,
		listname:'热门歌曲'
	}]
	//定义获取歌单id函数
	$scope.select = function(id){
		$scope.$emit('getSonglistId',id);
		$window.location.href = '#/tab/facts';
	}

});
app.controller('factsCtrl',function($scope){
	//发送当前歌曲id
	$scope.playsong = function(idx){
		console.log(idx);
		$scope.$emit('cursong',idx);
	}
})
app.controller('searchCtrl',function($scope,$http,$window){
	$scope.songlist="";
	$scope.bool = false;
	$scope.search = function(){
		$http.get('http://route.showapi.com/213-1',{
			params:{
				showapi_appid:'29306',
				showapi_sign:'545df128a7c84b279611932939d9a064',
	         	page:1,
	         	keyword:$scope.keyword
			}
		}).success(function(data){
			console.log(data);
			$scope.songlist = data.showapi_res_body.pagebean.songlist;
			$window.location.href = '#/tab/search';
		});
	}
})
app.controller('searchlistCtrl',function($scope){
	$scope.name = "abc";
})

app.controller('playCtrl',function($scope){
	console.log(123213123123213);

});
