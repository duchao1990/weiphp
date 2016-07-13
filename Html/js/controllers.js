angular.module('fo.controllers', [])
  //支付公用
  .controller('PaypupCrtl',['$scope','$rootScope','$timeout','ionicToast','ShopSer',
    function($scope,$rootScope,$timeout,ionicToast,ShopSer){
      
       $scope.payList = [
          { text: "1", value:1 },
          { text: "2", value:2},
          { text: "5", value:5 },
          { text: "10", value:10 }
        ];
        $scope.num=5;
        $scope.numChange = function(item) {
          $scope.num=item;
        };
        //$scope.paymodel=2;
        //$scope.zh_paymodel='微信支付';
        //$scope.payChange = function(model) {
        //  $scope.paymodel=model;
        //  if (model===2) {
        //   $scope.zh_paymodel='微信支付';
        //   $scope.method='wx';
        //  }else{
        //    $scope.zh_paymodel='支付宝';
        //    $scope.method='alipay';
        //  }
        //};

    $scope.goPay=function() {
      ShopSer.chargeInte({money:$scope.num}).$promise.then(function(succ) {
      if (succ.code===1) {
        pingpp.createPayment(succ.charge, function (success) {
              alert(success);
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
