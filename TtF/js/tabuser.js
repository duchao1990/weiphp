angular.module('fo.controllers')
  .controller('UinfoCtrl', ['$scope','$state','UserSer','ionicToast',
  	function($scope,$state,UserSer,ionicToast){
            UserSer.uinfo().$promise.then(function(succ){
              $scope.nickname=succ.nickname;
              $scope.qian=succ.qian;
              $scope.unames=succ.unames;
              $scope.headimgurl=succ.headimgurl;
              if ($scope.qian) {
                $scope.qiantitle='已经签到';
              }else{
                $scope.qiantitle='点击签到';
              }
          },function(error){
          })


    $scope.qiandao=function() {
      UserSer.qiandao({}).$promise.then(function(succ) {
        if (succ.code===1) {
          $scope.qian=true;
          $scope.qiantitle='已签到';
          ionicToast.show(succ.msg,'middle', false, 2500);

        }else{
           ionicToast.show(succ.msg,'middle', false, 2500);
        }
      }, function(error) {
         ionicToast.show('网络服务错误','middle', false, 2500);
      })
    }

  }])
  .controller('IntegralCtrl',['$scope','$state','ionicToast','ShopSer',
  	function($scope,$state,ionicToast,ShopSer){
      
      $scope.payList = [
        { text: "5元", value:5 },
        { text: "10元", value:10},
        { text: "50元", value:50},
        { text: "100元", value:100},
      ];

    ShopSer.getInte().$promise.then(function(succ) {
          $scope.have=succ.score;
          $scope.payList=succ.payList;
    }, function (error) {
      ionicToast.show('网络服务错误!','middle', false, 2500);
    })
    $scope.goPay=function(money) {
      ShopSer.chargeInte({money:money}).$promise.then(function(succ) {
      if (succ.code===1) {
        pingpp.createPayment(succ.charge, function (success) {
              alert(success);
              $state.go('tab.integral',{},{reload:true});
          }, function (err) {
               ionicToast.show('支付错误','middle', false, 2500);
          });
        }else{
          ionicToast.show('没有生成有效的订单','middle', false, 2500);
        }

      }, function (error) {
        ionicToast.show('服务器错误','middle', false, 2500);
      })
    }
  }])
  .controller('MyuanCtrl', ['$scope','$stateParams','YuanSer','$timeout','ionicToast', 
    function ($scope,$stateParams,YuanSer,$timeout,ionicToast) {
      $scope.qid=$stateParams.qid;
      YuanSer.Ylist({}).$promise.then(function(success) {
        $scope.myuaninid=success.ninid;
        $scope.myuanitems=success.list;
        $timeout(function(){$scope.more=success.more;},2000);
      });

      $scope.loadMore = function(){
        $timeout(function(){
          YuanSer.Ylist({ninid:$scope.myuaninid,}).$promise.then(function(success) {
            angular.forEach(success.list, function(value, key) {
              $scope.myuanitems.push(value);
            });
            $timeout(function(){$scope.more=success.more;},2000);
            $scope.myuaninid=success.ninid;
            $scope.$broadcast("scroll.infiniteScrollComplete");
          });
        },500);
      }
      $scope.doRefresh = function() {
        YuanSer.Ylist({}).$promise.then(function(success) {
          $scope.myuaninid=success.ninid;
          $scope.myuanitems=success.list;
          $timeout(function(){$scope.more=success.more;},2000);
        });
        $scope.$broadcast("scroll.refreshComplete");
      };

      $scope.changeStatus=function(yid){
        YuanSer.changeStatus({yid:yid}).$promise.then(function(success){
          if(success.code===1){
            document.getElementById('item'+yid).innerHTML='已还愿';
            document.getElementById('item'+yid).setAttribute("disabled","disabled");
          }else{
             ionicToast.show(success.msg,'middle', false, 2500);
          }

        },function(error){

        })
      }
  }])
//地址管里
 .controller('AddressCtrl', ['$scope','$state','MyAddressSer','ionicToast','$stateParams','$ionicHistory',
    function($scope,$state,MyAddressSer,ionicToast,$stateParams,$ionicHistory) {
        
      $scope.AddressForm = function () {
        MyAddressSer.adds({truename: $scope.setAddress.truename, mobile: $scope.setAddress.mobile,city: $scope.setAddress.city,address: $scope.setAddress.address}).$promise.then(function (succ) {
          if (succ.code == 0) {
            ionicToast.show(succ.msg,'middle', false, 2500);
          } else {
            ionicToast.show(succ.msg,'middle', false, 2500);
            $ionicHistory.goBack();
           // $state.go('tab.myaddress',{},{reload:true});
          }
        }, function (error) {
          ionicToast.show('网络服务错误!','middle', false, 2500);
        })
    }
    MyAddressSer.addresslist().$promise.then(function(succ){
          if (succ.code == 1) {
               $scope.items=succ.result;
             }else{
               ionicToast.show(succ.msg,'middle', false, 2500);
             }
     },function(error){
         ionicToast.show('网络服务错误!','middle', false, 2500);
     })
     $scope.del = function ($id) {
      MyAddressSer.del({id: $id}).$promise.then(function (succ) {
          if (succ.code == 0) {
            ionicToast.show(succ.msg,'middle', false, 2500);
          } else {
            ionicToast.show(succ.msg,'middle', false, 2500);
            $state.go('tab.myaddress',{},{reload:true});
            //$scope.items.splice($scope.items.indexOf($id), 1);
          }
        }, function (error) {
          ionicToast.show('网络服务错误!','middle', false, 2500);
        })
      }
      $scope.setmoren=function($id){
        MyAddressSer.setmoren({id: $id}).$promise.then(function (succ) {
          if (succ.code == 0) {
            ionicToast.show(succ.msg,'middle', false, 2500);
          } else {
            ionicToast.show(succ.msg,'middle', false, 2500);
            $state.go('tab.myaddress',{},{reload:true});
          }
        }, function (error) {
          ionicToast.show('网络服务错误!','middle', false, 2500);
        })
    }
  }])
//订单列表
  .controller('OrderListCtrl', ['$scope','$state','ShopSer','ionicToast',
    function($scope,$state,ShopSer,ionicToast){
      ShopSer.orderList().$promise.then(function (succ) {
        $scope.buyList=succ.buyList;
        }, function (error) {
          ionicToast.show('网络服务错误!','middle', false, 2500);
        })
      //确认收货
      $scope.queryOrder=function(orderId,$index) {
        ShopSer.queryOrder({orderId:orderId}).$promise.then(function (succ) {
          if (succ.code===1) {
            $scope.buyList.senedList.splice($index,1);
          }
        ionicToast.show(succ.msg,'middle', false, 2500);
        }, function (error) {
          ionicToast.show('网络服务错误!','middle', false, 2500);
        })
      }
  }])
  //物流信息
  .controller('PostListCtrl', ['$scope','$state','ShopSer','$stateParams',
    function($scope,$state,ShopSer,$stateParams){

        ShopSer.getSendInfo({orderId:$stateParams.orderId}).$promise.then(function (succ) {
            console.log(succ);
          if (succ.code==1) {
            $scope.postLine=succ.postLine;
            console.log($scope.postLine);
          }else{
            $scope.msg=succ.msg;
          }

        }, function (error) {
          console.log(error);
        })
  }])