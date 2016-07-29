 angular.module('fo.controllers')
  .controller('BaseCtrl', ['$scope','$rootScope','$stateParams','$state','SiyuanSer','ionicToast','$ionicModal','$ionicPopup','PaySer',
    function($scope,$rootScope,$stateParams,$state,SiyuanSer,ionicToast,$ionicModal,$ionicPopup,PaySer){
     SiyuanSer.intro().$promise.then(function(succ) {
          $scope.intro=succ.intro;
        }, function (error) {
          ionicToast.show('服务器错误','middle', false, 2500);
        });
     

     SiyuanSer.templeUser().$promise.then(function (succ) {
      if (succ.code==1) {
               $scope.items=succ.temUser;
                $scope.temple=succ.temple;
             }else{
              $scope.msg=succ.msg;
             }

     }, function(error) {
       ionicToast.show('服务器错误','middle', false, 2500);
     });
      $scope.goPay = function() {
       $ionicPopup.alert({
            templateUrl: 'Html/html/popup/paypup.html',
            scope: $scope,
            okText:'取消',
            okType:'button-energized'
            }).then(function(res) {
              ionicToast.show('取消功德捐助','middle', false, 2500);
            });    
      };
      SiyuanSer.cateid().$promise.then(function(succ){
        $scope.cate1=succ.cate1;
        $scope.cate2=succ.cate2;
        $scope.cate3=succ.cate3;
        $scope.cate4=succ.cate4;
        $scope.cate5=succ.cate5;
       } , function(error){
          ionicToast.show('服务器错误','middle', false, 2500);
        })
  }])
  .controller('ChatInfoCtrl', ['$scope','$stateParams','ChatSer','ionicToast','$ionicLoading','$timeout','$ionicPopup', 
    function($scope,$stateParams,ChatSer,ionicToast,$ionicLoading,$timeout,$ionicPopup){
      $ionicLoading.show({template: '正在加载...'});
      $timeout(function(){$ionicLoading.hide();},1000);
      $scope.did=$stateParams.did;
      ChatSer.chatinfo({id:$scope.did}).$promise.then(function (succ) {
        $scope.chatinfo=succ;
        $scope.infoView=succ.view_count;
      }, function (error) {
        ionicToast.show('网络服务错误,请稍后再试!','middle', false, 2500);
      })
      $scope.infodis=false;
      $scope.viewAdd=function () {
        ChatSer.addView({did:$scope.did}).$promise.then(function(succ) {
          if (succ.status==1) {
            var intview=parseInt($scope.infoView);
            $scope.infoView=++intview;
            ionicToast.show('点赞成功!');
            $scope.infodis=true;
          } else{
            ionicToast.show('网络服务错误,请稍后再试!','middle', false, 2500);
          };
        }, function (error) {
          ionicToast.show('网络服务错误,请稍后再试!','middle', false, 2500);
        });

      }
      $scope.goPay = function() {
       $ionicPopup.alert({
            templateUrl: 'Html/html/popup/paypup.html',
            scope: $scope,
            okText:'取消',
            okType:'button-energized'
            }).then(function(res) {
              ionicToast.show('取消功德捐助','middle', false, 2500);
            });
      };
  }])
  .controller('BookInfoCtrl', ['$scope','$stateParams','BookSer','ionicToast','$ionicLoading','$timeout','$ionicPopup',
   function($scope,$stateParams,BookSer,ionicToast,$ionicLoading,$timeout,$ionicPopup){
      $ionicLoading.show({template: '正在加载...'});
      $scope.aaa='sdsddddd';
      $timeout(function(){$ionicLoading.hide();},1000);
      $scope.did=$stateParams.did;
  		BookSer.bookinfo({id:$scope.did}).$promise.then(function (succ) {
  			$scope.bookinfo=succ;
  			$scope.infoView=succ.view;
  		}, function (error) {
  			ionicToast.show('网络服务错误,请稍后再试!','middle', false, 2500);
  		})
  		$scope.infodis=false;
  		$scope.viewAdd=function () {
  			BookSer.addView({did:$scope.did}).$promise.then(function(succ) {
  				if (succ.status==1) {
  					var intview=parseInt($scope.infoView);
  					$scope.infoView=++intview;
  					ionicToast.show('点赞成功!','middle', false, 2500);
  					$scope.infodis=true;
  				} else{
  					ionicToast.show('网络服务错误,请稍后再试!','middle', false, 2500);
  				};
  			}, function (error) {
  				ionicToast.show('网络服务错误,请稍后再试!','middle', false, 2500);
  			});

  		}

      $scope.goPay = function() {
             $ionicPopup.alert({
                  templateUrl: 'Html/html/popup/paypup.html',
                  scope: $scope,
                  okText:'取消',
                  okType:'button-energized'
                  }).then(function(res) {
                    ionicToast.show('取消功德捐助','middle', false, 2500);
                  });
      };
  }])
  .controller('NewsInfoCtrl', ['$scope','$stateParams','NewsSer','ionicToast','$ionicLoading','$timeout','$ionicPopup', 
    function($scope,$stateParams,NewsSer,ionicToast,$ionicLoading,$timeout,$ionicPopup){
    $ionicLoading.show({template: '正在加载...'});
    $timeout(function(){$ionicLoading.hide();},1000);
    $scope.did=$stateParams.did;
    NewsSer.newsinfo({id:$scope.did}).$promise.then(function (succ) {
      $scope.newsinfo=succ;
      $scope.infoView=succ.view;
    }, function (error) {
      ionicToast.show('网络服务错误,请稍后再试!','middle', false, 2500);
    })
    $scope.infodis=false;
    $scope.viewAdd=function () {
      NewsSer.addView({did:$scope.did}).$promise.then(function(succ) {
        if (succ.status==1) {
          var intview=parseInt($scope.infoView);
          $scope.infoView=++intview;
          ionicToast.show('点赞成功!','middle', false, 2500);
          $scope.infodis=true;
        } else{
          ionicToast.show('网络服务错误,请稍后再试!','middle', false, 2500);
        };
      }, function (error) {
        ionicToast.show('网络服务错误,请稍后再试!','middle', false, 2500);
      });

    }


    $scope.goPay = function() {
       $ionicPopup.alert({
            templateUrl: 'Html/html/popup/paypup.html',
            scope: $scope,
            okText:'取消',
            okType:'button-energized'
            }).then(function(res) {
              ionicToast.show('取消功德捐助','middle', false, 2500);
            });
    };
  }])
  .controller('NewsListCtrl', ['$scope','NewsSer','$stateParams','$timeout', function ($scope,NewsSer,$stateParams,$timeout) {
    var id=$stateParams.tid;
          NewsSer.newslist({id:id}).$promise.then(function(success) {
          $scope.ntitle=success.tftitle;
          $scope.newsninid=success.ninid;
          $scope.newslist=success.list;
          $timeout(function(){$scope.more=success.more;},2000);
        });
  	$scope.loadMore = function(){
  	    $timeout(function(){
  	      NewsSer.newslist({ninid:$scope.newsninid,id:id}).$promise.then(function(success) {
  	              angular.forEach(success.list, function(value, key) {
  	                $scope.newslist.push(value);
  	              });
  	              $timeout(function(){$scope.more=success.more;},2000);
  	              $scope.newsninid=success.ninid;
  				      $scope.$broadcast("scroll.infiniteScrollComplete");
  	          });
  	    },500);
    }
    $scope.doRefresh = function() {
	   NewsSer.newslist({id:id}).$promise.then(function(success) {
      		$scope.newsmaxid=success.maxid;
      		$scope.newsninid=success.ninid;
      		$scope.newslist=success.list;
      		$timeout(function(){$scope.more=success.more;},2000);
      	});
	    $scope.$broadcast("scroll.refreshComplete");
	  };
  }])
  .controller('BookListCtrl', ['$scope','BookSer','$stateParams','$timeout', function ($scope,BookSer,$stateParams,$timeout) {
    var id=$stateParams.tid;
  	BookSer.booklist({id:id}).$promise.then(function(success) {
  		$scope.bookninid=success.ninid;
  		$scope.booklist=success.list;
      $scope.btitle=success.btitle;

  		$timeout(function(){$scope.more=success.more;},2000);
  	});

  	$scope.loadMore = function(){
  	    $timeout(function(){
  	      BookSer.booklist({ninid:$scope.bookninid,id:id}).$promise.then(function(success) {
  	              angular.forEach(success.list, function(value, key) {
  	                $scope.booklist.push(value);
  	              });
  	              $timeout(function(){$scope.more=success.more;},2000);
  	              $scope.bookninid=success.ninid;
  				$scope.$broadcast("scroll.infiniteScrollComplete");
  	          });
  	    },500);
    }
      $scope.doRefresh = function() {
  	   BookSer.booklist({id:id}).$promise.then(function(success) {
         $scope.bookninid=success.ninid;
         $scope.booklist=success.list;
  		$timeout(function(){$scope.more=success.more;},2000);
  	});
  	    $scope.$broadcast("scroll.refreshComplete");
  	  };
  }])
  .controller('ChatsCtrl', ['$scope','$timeout','ChatSer', function($scope,$timeout,ChatSer){
  	$scope.groups=ChatSer.navlist();
  }])
  .controller('ChatsListCtrl', ['$scope','$stateParams','ChatSer','$timeout', function($scope,$stateParams,ChatSer,$timeout){
  	var cid=$stateParams.cid;
  	ChatSer.chatslist({id:cid}).$promise.then(function(success) {
      $scope.chatninid=success.ninid;
  		$scope.chatslist=success.list;
  		$scope.ctitle=success.ctitle;
  		$timeout(function(){$scope.more=success.more;},2000);
  	});
  	$scope.loadMore = function(){
  	    $timeout(function(){
  	      ChatSer.chatslist({ninid:$scope.chatninid,id:cid}).$promise.then(function(success) {
  	              angular.forEach(success.list, function(value, key) {
  	                $scope.chatslist.push(value);
  	              });
  	              $timeout(function(){$scope.more=success.more;},2000);
  	              $scope.chatninid=success.ninid;
  				        $scope.$broadcast("scroll.infiniteScrollComplete");
  	          });
  	    },1000);
    }
      $scope.doRefresh = function() {
        ChatSer.chatslist({id:cid}).$promise.then(function(success) {
          $scope.chatninid=success.ninid;
          $scope.chatslist=success.list;
          $scope.title=success.ftitle;
          $timeout(function(){$scope.more=success.more;},2000);
        });
  	    $scope.$broadcast("scroll.refreshComplete");
  	  };
  }])
  .controller('SiyuanInfoCtrl', ['$scope','$stateParams','SiyuanSer','ionicToast','$ionicLoading','$ionicPopup', 
    function($scope,$stateParams,SiyuanSer,ionicToast,$ionicLoading,$ionicPopup){
      $ionicLoading.show({template: '正在加载...'});
      $scope.id=$stateParams.id;
      SiyuanSer.detail({id:$scope.id}).$promise.then(function (succ) {
        $ionicLoading.hide();
        $scope.info=succ.info;
        console.log( $scope.info);
        
      }, function (error) {
        ionicToast.show('网络服务错误,请稍后再试!','middle', false, 2500);
      })

      $scope.goPay = function() {
       $ionicPopup.alert({
            templateUrl: 'Html/html/popup/paypup.html',
            scope: $scope,
            okText:'取消',
            okType:'button-energized'
            }).then(function(res) {
              ionicToast.show('取消功德捐助','middle', false, 2500);
            });
      };
  }])
  .controller('GanwuListCtrl', ['$scope','SiyuanSer','$stateParams','$timeout','ionicToast','$ionicPopup','$rootScope',
  function ($scope,SiyuanSer,$stateParams,$timeout,ionicToast,$ionicPopup,$rootScope) {
          var id=$stateParams.id;
          SiyuanSer.ganlists({uid:id}).$promise.then(function(succ) {
            $scope.syninid=succ.ninid;
            $scope.sylists=succ.list;
            $timeout(function(){$scope.more=succ.more;},2000);
         }, function (error) {
          ionicToast.show('服务器错误','middle', false, 2500);
        });
    $scope.loadMore = function(){
        $timeout(function(){
          SiyuanSer.ganlists({ninid:$scope.syninid,id:id}).$promise.then(function(succ) {
                  angular.forEach(succ.list, function(value, key) {
                    $scope.sylists.push(value);
                  });
                  $timeout(function(){$scope.more=succ.more;},2000);
                  $scope.syninid=succ.ninid;
                $scope.$broadcast("scroll.infiniteScrollComplete");
              });
        },500);
    }
    $scope.doRefresh = function() {
     SiyuanSer.ganlists({id:id}).$promise.then(function(succ) {
          //$scope.newsmaxid=succ.maxid;
          $scope.syninid=succ.ninid;
          $scope.sylists=succ.list;
          $timeout(function(){$scope.more=succ.more;},2000);
        });
      $scope.$broadcast("scroll.refreshComplete");
    };
  }])

.controller('SiyuanListCtrl', ['$scope','SiyuanSer','$stateParams','$timeout','ionicToast','$ionicPopup','$rootScope',
  function ($scope,SiyuanSer,$stateParams,$timeout,ionicToast,$ionicPopup,$rootScope) {
          var id=$stateParams.id;
          SiyuanSer.lists({id:id}).$promise.then(function(succ) {
            $scope.syninid=succ.ninid;
            $scope.sylists=succ.list;
            $timeout(function(){$scope.more=succ.more;},2000);
         }, function (error) {
          ionicToast.show('服务器错误','middle', false, 2500);
        });
    $scope.loadMore = function(){
        $timeout(function(){
          SiyuanSer.lists({ninid:$scope.syninid,id:id}).$promise.then(function(succ) {
                  angular.forEach(succ.list, function(value, key) {
                    $scope.sylists.push(value);
                  });
                  $timeout(function(){$scope.more=succ.more;},2000);
                  $scope.syninid=succ.ninid;
                $scope.$broadcast("scroll.infiniteScrollComplete");
              });
        },500);
    }
    $scope.doRefresh = function() {
     SiyuanSer.lists({id:id}).$promise.then(function(succ) {
          //$scope.newsmaxid=succ.maxid;
          $scope.syninid=succ.ninid;
          $scope.sylists=succ.list;
          $timeout(function(){$scope.more=succ.more;},2000);
        });
      $scope.$broadcast("scroll.refreshComplete");
    };
  }]);