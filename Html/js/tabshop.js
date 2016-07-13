angular.module('fo.controllers')
.controller('ShopCtrl',['$scope','ShopSer',function($scope,ShopSer){
		$scope.shopindex=ShopSer.getShopIndex();
		console.log($scope.shopindex);

    $scope.addToCart=function(goodsid) {
      ShopSer.addToCart({goods_id:goodsid,buyCount:1}).$promise.then(function(succ) {
        console.log(succ.msg);
      }, function () {
        // body...
      })
    }
  }])
.controller('GoodsListCtrl', ['$scope','$stateParams','ShopSer','$timeout', function ($scope,$stateParams,ShopSer,$timeout) {
    $scope.cateid=$stateParams.cateid;
    ShopSer.getGoodsList({cateid:$scope.cateid}).$promise.then(function(succ) {
      console.log(succ);
      if (succ.code===1) {
        $scope.goodslist=succ.list;
        $scope.page=succ.page;
        $scope.more=succ.more;;
      }else{
         $scope.msg=succ.msg;
      }
    }, function (error) {
      // body...
    });

    $scope.loadMore = function(){
        $timeout(function(){
         ShopSer.getGoodsList({cateid:$scope.cateid,page:$scope.page}).$promise.then(function(succ) {
                  angular.forEach(succ.list, function(value, key) {
                    $scope.goodslist.push(value);
                  });
                  $scope.more=succ.more;
                  $scope.page=succ.page;
                $scope.$broadcast("scroll.infiniteScrollComplete");
              });
        },500);
    }
  //添加到购物车
    $scope.addToCart=function(goodsid) {
      ShopSer.addToCart({goods_id:goodsid,buyCount:1}).$promise.then(function(succ) {
        console.log(succ.msg);
      }, function () {
        // body...
      })
    }

}])
    .controller('GoodsInfoCtrl', ['$scope','$stateParams','ShopSer','$timeout','ionicToast', function ($scope,$stateParams,ShopSer,$timeout,ionicToast) {
      $scope.goods_id=$stateParams.goodsid;
      $scope.buyCount=1;
      ShopSer.getGoodsInfo({goods_id:$scope.goods_id}).$promise.then(function(succ) {
        if (succ.code===1) {
          $scope.goods=succ.goods;
        }else{
          $scope.msg=succ.msg;
        }
      }, function (error) {
        $scope.msg='网络错误';
      });

      $scope.addProduct = function(){
        $scope.buyCount++
      }

      $scope.removeProduct=function(){
        if ($scope.buyCount>1){
          $scope.buyCount--
        }


      }
      //添加到购物车
      $scope.addToCart=function() {
        ShopSer.addToCart({goods_id:$scope.goods_id,buyCount:$scope.buyCount}).$promise.then(function(succ) {
          //console.log(succ.msg);
          ionicToast.show(succ.msg,'middle', false, 2500);
        }, function (error) {
          ionicToast.show(error,'middle', false, 2500);
        })
      }

    }])
    .controller('CartCtrl',['$scope', 'ShopSer','$state','$rootScope', function($scope, ShopSer,$state,$rootScope){
        $scope.buyCount=0;
        $scope.goOut=[];
        $scope.isSelected=true;
        ShopSer.getMyCart().$promise.then(function(succ){
          if (succ.code==1){
            $scope.cartList=succ.list;
              $scope.buyCount=Number(succ.buyCount);
              console.log($scope.cartList);
          }else{
            $scope.msg=succ.msg;
          }
        },function(error){
          $scope.msg='网络服务错误';
        });
      $scope.addProduct=function (id) {
        $scope.cartList[id].num++;
        $scope.buyCount+= Number($scope.cartList[id].price);
      }

      $scope.removeProduct=function(id) {
        if ($scope.cartList[id].num>1){
          $scope.cartList[id].num--;
          $scope.buyCount-=Number($scope.cartList[id].price);
        }


      }
     $scope.updateSelection = function($event, id){
         var checkbox = $event.target;
         if (checkbox.checked) {
            $scope.goOut.pop();
            $scope.buyCount+=$scope.cartList[id].num*$scope.cartList[id].price;
         } else {
            $scope.goOut.push(id);
            $scope.buyCount-=$scope.cartList[id].num*$scope.cartList[id].price;
         }
         console.log($scope.goOut);
     }
 
     $scope.checkOut=function() {
       //提交订货单
       $scope.goods_ids=[];
       $scope.goodsCount=[];
       if ($scope.goOut!='') {
          angular.forEach($scope.goOut, function(val, k) {
            angular.forEach($scope.cartList, function(value, key) {
              if (key!=val) {
                $scope.goods_ids.push(val);
                $scope.goodsCount.push(value.num);
              }
            })
          });
       } else {
          angular.forEach($scope.cartList, function(value, key) {
                $scope.goods_ids.push(key);
                $scope.goodsCount.push(value.num);
            })
       }
        ShopSer.confirmOrder({goods_ids:$scope.goods_ids,goodsCount:$scope.goodsCount}).$promise.then(function (succ) {
            $state.go('tab.confirmOrder',{orderId:succ.orderId});
          }, function (error) {
            // body...
          })
     }
    }])

    .controller('ConfirmOrderCtrl',['$scope','ShopSer', '$stateParams', '$state','$rootScope','$ionicModal','MyAddressSer','ionicToast', function($scope, ShopSer,$stateParams,$state,$rootScope,$ionicModal,MyAddressSer,ionicToast){
        $scope.orderId=$stateParams.orderId;
        console.log($scope.orderId);
        ShopSer.getWpOrder({orderId:$scope.orderId}).$promise.then(function (succ) {
            if (succ.code===1){
                $scope.payGoods=succ.payGoods;
                $scope.orderAddress=succ.address;
                $scope.total_price=succ.total_price;
            }else {
                $scope.msg=succ.msg;
            }
        }, function (error) {
            $scope.msg='网络服务错误';
        });


        $scope.setAddress=function(address){
            $scope.orderAddress=address;
            $scope.modal.hide();
        }
        MyAddressSer.getMyAddress().$promise.then(function (succ) {
            if (succ.code===1){
                $scope.addressList=succ.addressList;

            }else {
                $scope.msg=succ.msg;
            }
        }, function (error) {
            $scope.msg='网络服务错误';
        })


        $scope.goPay=function(){
            ShopSer.orderToPay({address_id:$scope.orderAddress.id,orderid:$scope.orderId}).$promise.then(function (succ) {
                if (succ.code===1){
                            pingpp.createPayment(succ.charge, function (success) {
                                ionicToast.show('支付成功','middle', false, 2500);
                            }, function (err) {
                                console.log(err);
                            });

                }else {
                    $scope.msg=succ.msg;
                }
            }, function (error) {

            })
        }
        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });
    }])
