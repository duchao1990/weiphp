angular.module('fo.controllers')
  .controller('ActionCtrl', ['$scope','$state','$rootScope','ionicToast', function($scope,$state,$rootScope,ionicToast){

  }])

  .controller('QiufoCtrl', ['$scope','$stateParams','$state','$timeout','BaifoSer','HuaSer','GuoSer','XiangSer','ionicToast','$ionicPopup','$ionicModal','PaySer','$rootScope','IntefoSer',
   function($scope,$stateParams,$state,$timeout,BaifoSer,HuaSer,GuoSer,XiangSer,ionicToast,$ionicPopup,$ionicModal,PaySer,$rootScope,IntefoSer){
    	$scope.toid=$stateParams.toid;
      var foid=$stateParams.toid;
      $scope.hua="image/action/huaping.png";
      $scope.guo="image/action/guopan.png";
      $scope.showxiang=false;
      $scope.foguang=false;
      $scope.qfinfo=BaifoSer.get($scope.toid);
      IntefoSer.getInfo({foid:foid}).$promise.then(
        function(succ) {
          if (succ.code===1) {
              $scope.hua=succ.data.hua;
              $scope.xiang=succ.data.xiang;
              $scope.guo=succ.data.guo;
              $scope.showxiang=succ.data.showxiang;
              $scope.foguang=succ.data.foguang;
              
          }else{
            ionicToast.show(succ.msg,'middle', false, 2500);
          }
        
      }, function (error) {
        ionicToast.show('服务其错误','middle', false, 2500);
      })


      $scope.fodesc=function() {
        $scope.gongtype='fo';
            angular.forEach($scope.folist, function(value, key) {
                $scope.newfolist.push(value);
            });
        $scope.modal.show();
      }
      $scope.gong=function(type) {
        $scope.gongtype=type;
        $scope.newfolist=[];
        if (type===1) {//贡花
           $scope.folist=HuaSer.all();
        } else if(type===2){//供佛
          $scope.folist=BaifoSer.getgroup($scope.toid);
        } else if(type===3){//供果
          $scope.folist=GuoSer.all();
        } else if(type===4){//上香
          $scope.folist=XiangSer.all();
        }
        angular.forEach($scope.folist, function(value, key) {
            $scope.newfolist.push(value);
        });
        $scope.modal.show();
      }

      $scope.setfo=function (id) {
       
        if ($scope.gongtype===1) {//贡花
          $scope.huainfo=HuaSer.get(id);
        IntefoSer.incScore({foid:foid,field:'hua',score:$scope.huainfo.jifen,gong:$scope.huainfo.id}).$promise.then(
            function(succ) {
              if (succ.code===1) {
                  $scope.hua=$scope.huainfo.face;
                  $scope.foguang=succ.foguang;
              }
            ionicToast.show(succ.msg,'middle', false, 2500);
          }, function (error) {
            ionicToast.show(error,'middle', false, 2500);
          })
        } else if($scope.gongtype===2){//供佛
          $scope.qfinfo=BaifoSer.get(id);
          IntefoSer.getInfo({foid:id}).$promise.then(
            function(succ) {
              if (succ.code===1) {
                  $scope.hua=succ.data.hua;
                  $scope.xiang=succ.data.xiang;
                  $scope.guo=succ.data.guo;
                  $scope.showxiang=succ.data.showxiang;
                  $scope.foguang=succ.data.foguang;

              }else{
               ionicToast.show(succ.msg,'middle', false, 2500);
              }

          }, function (error) {
            ionicToast.show(error,'middle', false, 2500);
          })

        } else if($scope.gongtype===3){//供果
          $scope.guoinfo=GuoSer.get(id);
          IntefoSer.incScore({foid:foid,field:'guo',score:$scope.guoinfo.jifen,gong:$scope.guoinfo.id}).$promise.then(
            function(succ) {
              if (succ.code===1) {
                $scope.guo=$scope.guoinfo.face;
                $scope.foguang=succ.foguang;
              }
            ionicToast.show(succ.msg,'middle', false, 2500);
          }, function (error) {
            ionicToast.show(error,'middle', false, 2500);
          })
        } else if($scope.gongtype===4){//上香
          $scope.xianginfo=XiangSer.get(id);
          IntefoSer.incScore({foid:foid,field:'xiang',score:$scope.xianginfo.jifen,gong:$scope.xianginfo.id}).$promise.then(
            function(succ) {
              if (succ.code===1) {
                $scope.xiang=$scope.xianginfo.xiang;
                $scope.foguang=succ.foguang;
                $scope.showxiang=true;
              }
            ionicToast.show(succ.msg,'middle', false, 2500);
          }, function (error) {
            ionicToast.show(error,'middle', false, 2500);
          })
        }
        $scope.modal.hide();
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

        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modal = modal;
          });
        $scope.toid=$stateParams.toid;
      	$scope.qfinfo=BaifoSer.get($scope.toid);
    
  }])
  .controller('MyfoCtrl', ['$scope','$rootScope','$stateParams','$state','BenmingSer','HuaSer','GuoSer','XiangSer','IntefoSer','ionicToast','$ionicModal','$ionicPopup','PaySer', 
        function($scope,$rootScope,$stateParams,$state,BenmingSer,HuaSer,GuoSer,XiangSer,IntefoSer,ionicToast,$ionicModal,$ionicPopup,PaySer,$cordovaNetwork){
         
         $scope.bmfid=localStorage.getItem('bmf');
          
          $scope.hua="image/action/huaping.png";
          $scope.guo="image/action/guopan.png";
          $scope.showxiang=false;
          if (angular.isUndefined($scope.bmfid)||$scope.bmfid===null) {
                $scope.bmfid=101;
          } 
      $rootScope.bmfinfo=BenmingSer.get($scope.bmfid);
      var foid=$scope.bmfid;
      IntefoSer.getInfo({foid:$scope.bmfid}).$promise.then(
        function(succ) {
          if (succ.code===1) {
              $scope.hua=succ.data.hua;
              $scope.xiang=succ.data.xiang;
              $scope.guo=succ.data.guo;
              $scope.showxiang=succ.data.showxiang;
              $scope.foguang=succ.data.foguang;

          }
        ionicToast.show(succ.msg,'middle', false, 2500);
      }, function (error) {
        ionicToast.show(error,'middle', false, 2500);
      })

        $ionicModal.fromTemplateUrl('templates/modal.html', {
              scope: $scope
            }).then(function(modal) {
              $scope.modal = modal;
            });

      $scope.gong=function(type) {
        $scope.gongtype=type;
        $scope.newfolist=[];
        if (type===1) {//贡花
           $scope.allbmlist=HuaSer.all();
        } else if(type===2){//供佛
          $scope.allbmlist=BenmingSer.all();
        } else if(type===3){//供果
          $scope.allbmlist=GuoSer.all();
        } else if(type===4){//上香
          $scope.allbmlist=XiangSer.all();
        }
        $scope.modal.show();
      }

      $scope.setbmf=function (id) {
      if ($scope.gongtype===1) {//贡花
          $scope.huainfo=HuaSer.get(id);
          IntefoSer.incScore({foid:$scope.bmfid,field:'hua',score:$scope.huainfo.jifen,gong:$scope.huainfo.id}).$promise.then(
            function(succ) {
              if (succ.code===1) {
              $scope.hua=$scope.huainfo.face;
              $scope.foguang=succ.foguang;
            }
            ionicToast.show(succ.msg,'middle', false, 2500);
          }, function (error) {
            ionicToast.show(error,'middle', false, 2500);
          })
        } else if($scope.gongtype===2){//供佛
          $scope.bmfinfo=BenmingSer.get(id);
          $scope.bmfid=id;
          localStorage.setItem('bmf',id);
          IntefoSer.getInfo({foid:id}).$promise.then(function(succ) {if (succ.code===1) {
                  $scope.hua=succ.data.hua;
                  $scope.xiang=succ.data.xiang;
                  $scope.guo=succ.data.guo;
                  $scope.showxiang=succ.data.showxiang;
                  $scope.foguang=succ.data.foguang;
              }else{
               ionicToast.show(succ.msg,'middle', false, 2500);
              }

          }, function (error) {
            ionicToast.show(error);
          })
        } else if($scope.gongtype===3){//供果
          $scope.guoinfo=GuoSer.get(id);
          IntefoSer.incScore({foid:$scope.bmfid,field:'guo',score:$scope.guoinfo.jifen,gong:$scope.guoinfo.id}).$promise.then(function(succ) {
              if (succ.code===1) {
                $scope.guo=$scope.guoinfo.face;
                $scope.foguang=succ.foguang;
              }
            ionicToast.show(succ.msg,'middle', false, 2500);
          }, function (error) {
            ionicToast.show(error,'middle', false, 2500);
          })
        } else if($scope.gongtype===4){//上香
          $scope.xianginfo=XiangSer.get(id);
          IntefoSer.incScore({foid:$scope.bmfid,field:'xiang',score:$scope.xianginfo.jifen,gong:$scope.xianginfo.id}).$promise.then(
            function(succ) {
              if (succ.code===1) {
                $scope.xiang=$scope.xianginfo.xiang;
                $scope.foguang=succ.foguang;
                $scope.showxiang=true;
              }
            ionicToast.show(succ.msg,'middle', false, 2500);
          }, function (error) {
            ionicToast.show(error,'middle', false, 2500);
          })
        }
        $scope.modal.hide();
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
      $ionicModal.fromTemplateUrl('templates/modal.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
        });
  }])

  .controller('MybminfoCtrl', ['$scope','$stateParams','$state','ApiSer','ionicToast', function($scope,$stateParams,$state,ApiSer,ionicToast){
    $scope.bmfid=$stateParams.bmid;
    ApiSer.yunshi({id:$scope.bmfid}).$promise.then(function(succ) {
      $scope.bminfo=succ.bminfo;
    }, function (error) {
        ionicToast.show('服务器错误','middle', false, 2500);
    });
  }])

  .controller('AllyuanCtrl', ['$scope','$stateParams','YuanSer','$timeout',
   function ($scope,$stateParams,YuanSer,$timeout) {
    $scope.qid=$stateParams.qid;
    YuanSer.allyuan().$promise.then(function(success) {
      $scope.yuaninid=success.ninid;
      $scope.yuanitems=success.list;
      $timeout(function(){$scope.more=success.more;},2000);
    });
    $scope.loadMore = function(){
      $timeout(function(){
        YuanSer.allyuan({ninid:$scope.yuaninid}).$promise.then(function(success) {
          angular.forEach(success.list, function(value, key) {
            $scope.yuanitems.push(value);
          });
          $timeout(function(){$scope.more=success.more;},2000);
          $scope.yuaninid=success.ninid;
          $scope.$broadcast("scroll.infiniteScrollComplete");
        });
      },500);
    }
    $scope.doRefresh = function() {
      YuanSer.allyuan().$promise.then(function(success) {
        $scope.yuaninid=success.ninid;
        $scope.yuanitems=success.list;
        $timeout(function(){$scope.more=success.more;},2000);
      });
      $scope.$broadcast("scroll.refreshComplete");
    };

  }])
  //祈愿
  .controller('SetyuanCtrl', ['$scope','$stateParams','YuanSer','$state','ionicToast','$ionicHistory','PaySer','$ionicModal',function($scope,$stateParams,YuanSer,$state,ionicToast,$ionicHistory,PaySer,$ionicModal) {
    var qid=$stateParams.qid;
    

    $scope.ishow=true;
      $scope.$watch('ishow',function(){
        if ($scope.ishow===true) {$scope.zhishow='公开'} else{$scope.zhishow='不公开'};
      });
    $scope.isPay=false;
      $scope.$watch('isPay',function(){
        if ($scope.isPay===true) {$scope.shiyong='恭请'} else{$scope.shiyong='不恭请'};
      });

      $ionicModal.fromTemplateUrl('templates/modal.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
        });
     /* YuanSer.getdesc().$promise.then(function (succ) {
        $scope.desc=succ.desc;
      }, function (error) {
        // body...
      })*/
    $scope.QYinfoForm=function () {
      var uid = localStorage.getItem('uid');
            YuanSer.qiyuan({yuan: $scope.QYinfo.qiyuan,ishow:$scope.ishow, fid: qid,}).$promise.then(function (succ) {
              if (succ.code===1){
                //$ionicHistory.goBack();
               $state.go('tab.allyuan',{},{reload:true});
              }
              ionicToast.show(succ.msg,'middle', false, 2500);
            }, function (error) {
              ionicToast.show('网络不给力!','middle', false, 2500);
            });
          }

  }])

  .controller('MuyuCtrl',['$scope','$timeout','ionicToast','ParSer',
    function($scope,$timeout,ionicToast,ParSer){
    
    $scope.bcounth=0;
    $scope.imgurl='Html/image/muyu.png';
    $scope.onefohao=function(){
        $scope.imgurl='Html/image/muyu2.png';
      $scope.bcounth++;
      $timeout(function(){
        $scope.imgurl='Html/image/muyu.png';
      },500);
    }
    $scope.baofohao=function(){
      ParSer.baohao({num:$scope.bcounth}).$promise.then(function(succ) {
        if (succ.code===1){
          ionicToast.show(succ.msg,'middle', false, 2500);
          $scope.bcounth=0;
        }else{
          ionicToast.show(succ.msg,'middle', false, 2500);
        }
      }, function (error) {
        ionicToast.show('服务器错误','middle', false, 2500);
      })
    }
  }])

