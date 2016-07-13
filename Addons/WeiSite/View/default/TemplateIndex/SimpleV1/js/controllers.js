angular.module('fo.controllers', [])
//佛文
  .controller('BaseCtrl', ['$scope', function($scope){
  }])
  .controller('ChatInfoCtrl', ['$scope','$stateParams','ChatSer','$bottomSheet','ShareSer','$cordovaToast','$ionicLoading','$timeout','$ionicPopup','$bottomSheet', 
    function($scope,$stateParams,ChatSer,$bottomSheet,ShareSer,$cordovaToast,$ionicLoading,$timeout,$ionicPopup,$bottomSheet){
      $ionicLoading.show({template: '正在加载...'});
      $timeout(function(){$ionicLoading.hide();},1000);
      $scope.did=$stateParams.did;
      ChatSer.chatinfo({id:$scope.did}).$promise.then(function (succ) {
        $scope.chatinfo=succ;
        $scope.infoView=succ.view_count;
      }, function (error) {
        $cordovaToast.showShortCenter('网络服务错误,请稍后再试!');
      })
      $scope.infodis=false;
      $scope.viewAdd=function () {
        ChatSer.addView({did:$scope.did}).$promise.then(function(succ) {
          if (succ.status==1) {
            var intview=parseInt($scope.infoView);
            $scope.infoView=++intview;
            $cordovaToast.showShortCenter('点赞成功!');
            $scope.infodis=true;
          } else{
            $cordovaToast.showShortCenter('网络服务错误,请稍后再试!');
          };
        }, function (error) {
          $cordovaToast.showShortCenter('网络服务错误,请稍后再试!');
        });

      }

      $scope.share=function() {
          $scope.url='http://www.zhongfox.com/issue/detail_'+$scope.chatinfo.id+'.html';
          $scope.stitle=$scope.chatinfo.title;
          $scope.desc=$scope.chatinfo.title;
          $scope.imgurl=$scope.chatinfo.coverpath;
          $bottomSheet.show({
              buttons: [
              [
              {btText:"",btClass:"positive icon iconfont icon-qq1193403easyiconnet",btId:"1"},
              {btText:"",btClass:"energized icon iconfont icon-qzone1193405easyiconnet",btId:"2"},
              {btText:"",btClass:"assertive icon iconfont icon-weibo1193419easyiconnet",btId:"5"},
              ],
              [
              {btText:"",btClass:"positive icon iconfont icon-wechat1193418easyiconnet",btId:"3"},
              {btText:"",btClass:"balanced icon iconfont icon-pengyouquan1193401easyiconnet",btId:"4"},
              ],
              [
              {btText:"",btClass:"icon ion-chevron-down",btId:"hide",hideOnClick:true}, //hide the bottomSheet when click
              ]
              ],
              titleText: '',
              buttonClicked: function(button) {
                  if(button.btId=='1'){
                      ShareSer.shareToQQ($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='2'){
                      ShareSer.shareTozone($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='3'){
                      ShareSer.shareToWechat($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='4') {
                      ShareSer.shareToFriends($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='5') {
                      ShareSer.shareToWeibo($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }
              }
          });
      }
      $scope.goPay = function() {
       $ionicPopup.alert({
            templateUrl: 'html/popup/paypup.html',
            title: '广结善缘 随喜赞赏',
            subTitle:'赞赏的钱会兑换成功德积分',
            scope: $scope,
            okText:'取消',
            okType:'button-energized'
            }).then(function(res) {
              $cordovaToast.showShortCenter('取消功德捐助');
            });
      };
  }])
   .controller('IssueCtrl',['$scope','$stateParams','MusicSer','$timeout','$ionicModal','$rootScope','$ionicPopup', function ($scope,$stateParams,MusicSer,$timeout,$ionicModal,$rootScope,$ionicPopup) {
         $scope.typeid=$stateParams.id;
        MusicSer.typeList({id:$scope.typeid}).$promise.then(function(success) {
          $scope.issueninid=success.ninid;
          $scope.issueitems=success.list;
          $timeout(function(){$scope.more=success.more;},2000);
        });

        $scope.loadMore = function(){
          $timeout(function(){
            MusicSer.typeList({ninid:$scope.issueninid,id:$scope.typeid}).$promise.then(function(success) {
              angular.forEach(success.list, function(value, key) {
                $scope.issueitems.push(value);
              });
              $timeout(function(){$scope.more=success.more;},2000);
              $scope.issueninid=success.ninid;
              $scope.$broadcast("scroll.infiniteScrollComplete");
            });
          },500);
        }
        $scope.doRefresh = function() {
          MusicSer.typeList({id:$scope.typeid}).$promise.then(function(success) {
            $scope.issueninid=success.ninid;
            $scope.issueitems=success.list;
            $timeout(function(){$scope.more=success.more;},2000);
          });
          $scope.$broadcast("scroll.refreshComplete");
        };
        $scope.openModal = function() {
            if ($rootScope.isPlay) {
                $scope.modal.show();
              }
          };
          $ionicModal.fromTemplateUrl('html/say/playingmodal.html', function(modal) {
            $scope.modal = modal;
          }, {
            animation: 'slide-in-up',
            focusFirstInput: true
          });
    }])
  .controller('BookInfoCtrl', ['$scope','$stateParams','BookSer','ShareSer','$cordovaToast','$ionicLoading','$timeout','$ionicPopup','$bottomSheet',
   function($scope,$stateParams,BookSer,ShareSer,$cordovaToast,$ionicLoading,$timeout,$ionicPopup,$bottomSheet){
      $ionicLoading.show({template: '正在加载...'});
      $scope.aaa='sdsddddd';
      $timeout(function(){$ionicLoading.hide();},1000);
      $scope.did=$stateParams.did;
  		BookSer.bookinfo({id:$scope.did}).$promise.then(function (succ) {
  			$scope.bookinfo=succ;
  			$scope.infoView=succ.view;
  		}, function (error) {
  			$cordovaToast.showShortCenter('网络服务错误,请稍后再试!');
  		})
  		$scope.infodis=false;
  		$scope.viewAdd=function () {
  			BookSer.addView({did:$scope.did}).$promise.then(function(succ) {
  				if (succ.status==1) {
  					var intview=parseInt($scope.infoView);
  					$scope.infoView=++intview;
  					$cordovaToast.showShortCenter('点赞成功!');
  					$scope.infodis=true;
  				} else{
  					$cordovaToast.showShortCenter('网络服务错误,请稍后再试!');
  				};
  			}, function (error) {
  				$cordovaToast.showShortCenter('网络服务错误,请稍后再试!');
  			});

  		}
      $scope.share=function() {
          $scope.url='http://www.zhongfox.com/fo/detail_'+$scope.did+'.html';
          $scope.stitle=$scope.bookinfo.title;
          $scope.desc=$scope.bookinfo.description;
          $scope.imgurl=$scope.bookinfo.coverpath;
          $bottomSheet.show({
              buttons: [
              [
              {btText:"",btClass:"positive icon iconfont icon-qq1193403easyiconnet",btId:"1"},
              {btText:"",btClass:"energized icon iconfont icon-qzone1193405easyiconnet",btId:"2"},
              {btText:"",btClass:"assertive icon iconfont icon-weibo1193419easyiconnet",btId:"5"},
              ],
              [
              {btText:"",btClass:"positive icon iconfont icon-wechat1193418easyiconnet",btId:"3"},
              {btText:"",btClass:"balanced icon iconfont icon-pengyouquan1193401easyiconnet",btId:"4"},
              ],
              [
              {btText:"",btClass:"icon ion-chevron-down",btId:"hide",hideOnClick:true}, //hide the bottomSheet when click
              ]
              ],
              titleText: '',
              buttonClicked: function(button) {
                  if(button.btId=='1'){
                      ShareSer.shareToQQ($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='2'){
                      ShareSer.shareTozone($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='3'){
                      ShareSer.shareToWechat($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='4') {
                      ShareSer.shareToFriends($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='5') {
                      ShareSer.shareToWeibo($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }
              }
          });
      }
      $scope.goPay = function() {
             $ionicPopup.alert({
                  templateUrl: 'html/popup/paypup.html',
                  title: '广结善缘 随喜赞赏',
                  subTitle:'赞赏的钱会兑换成功德积分',
                  scope: $scope,
                  okText:'取消',
                  okType:'button-energized'
                  }).then(function(res) {
                    $cordovaToast.showShortCenter('取消功德捐助');
                  });
      };
  }])
  .controller('NewsInfoCtrl', ['$scope','$stateParams','NewsSer','$ionicActionSheet','ShareSer','$cordovaToast','$ionicLoading','$timeout','$ionicPopup','$bottomSheet', 
    function($scope,$stateParams,NewsSer,$ionicActionSheet,ShareSer,$cordovaToast,$ionicLoading,$timeout,$ionicPopup,$bottomSheet){
    $ionicLoading.show({template: '正在加载...'});
    $timeout(function(){$ionicLoading.hide();},1000);
    $scope.did=$stateParams.did;
    NewsSer.newsinfo({id:$scope.did}).$promise.then(function (succ) {
      $scope.newsinfo=succ;
      $scope.infoView=succ.view;
    }, function (error) {
      $cordovaToast.showShortCenter('网络服务错误,请稍后再试!');
    })
    $scope.infodis=false;
    $scope.viewAdd=function () {
      NewsSer.addView({did:$scope.did}).$promise.then(function(succ) {
        if (succ.status==1) {
          var intview=parseInt($scope.infoView);
          $scope.infoView=++intview;
          $cordovaToast.showShortCenter('点赞成功!');
          $scope.infodis=true;
        } else{
          $cordovaToast.showShortCenter('网络服务错误,请稍后再试!');
        };
      }, function (error) {
        $cordovaToast.showShortCenter('网络服务错误,请稍后再试!');
      });

    }
      $scope.share=function() {
          $scope.url='http://www.zhongfox.com/news/detail_'+$scope.newsinfo.id+'.html';
          $scope.stitle=$scope.newsinfo.title;
          $scope.desc=$scope.newsinfo.description;
          $scope.imgurl=$scope.newsinfo.coverpath;
          $bottomSheet.show({
              buttons: [
              [
              {btText:"",btClass:"positive icon iconfont icon-qq1193403easyiconnet",btId:"1"},
              {btText:"",btClass:"energized icon iconfont icon-qzone1193405easyiconnet",btId:"2"},
              {btText:"",btClass:"assertive icon iconfont icon-weibo1193419easyiconnet",btId:"5"},
              ],
              [
              {btText:"",btClass:"positive icon iconfont icon-wechat1193418easyiconnet",btId:"3"},
              {btText:"",btClass:"balanced icon iconfont icon-pengyouquan1193401easyiconnet",btId:"4"},
              ],
              [
              {btText:"",btClass:"icon ion-chevron-down",btId:"hide",hideOnClick:true}, //hide the bottomSheet when click
              ]
              ],
              titleText: '',
              buttonClicked: function(button) {
                  if(button.btId=='1'){
                      ShareSer.shareToQQ($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='2'){
                      ShareSer.shareTozone($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='3'){
                      ShareSer.shareToWechat($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='4') {
                      ShareSer.shareToFriends($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='5') {
                      ShareSer.shareToWeibo($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }
              }
          });
      }

    $scope.goPay = function() {
       $ionicPopup.alert({
            templateUrl: 'html/popup/paypup.html',
            title: '广结善缘 随喜赞赏',
            subTitle:'赞赏的钱会兑换成功德积分',
            scope: $scope,
            okText:'取消',
            okType:'button-energized'
            }).then(function(res) {
              $cordovaToast.showShortCenter('取消功德捐助');
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

//用户组
  .controller('UserCtrl', ['$scope', '$stateParams','$state','UserSer','$cordovaToast','$interval','ShareSer','$rootScope','$ionicLoading',function($scope,$stateParams,$state,UserSer,$cordovaToast,$interval,ShareSer,$rootScope,$ionicLoading){
    $scope.vtype=$stateParams.type;
  	$scope.LoginForm=function() {
  		UserSer.login({username:$scope.Login.mobile,password:$scope.Login.pwd}).$promise.then(function(success) {
  			if (success.code==0) {
          		$cordovaToast.showShortCenter(success.msg);
  			}else{
          localStorage.setItem('uid',success.uid);
          $cordovaToast.showShortCenter(success.msg);
  				$state.go('tab.user');
  			}
  		}, function(error) {
        		$cordovaToast.showShortCenter('网络不给力!');
  		});
  	}
  	$scope.cuntdown='发送验证码';
      $scope.sheight=60;
      $scope.isDisabled=false;
  	$scope.sendSms=function () {
      $scope.isDisabled=true;
      $interval(function(){
        $scope.sheight--;
        if ($scope.sheight>0) {
          $scope.cuntdown=$scope.sheight+'秒后可发送';
        } else {
          $scope.cuntdown='发送验证码';
          $scope.isDisabled=false;
        };
      },1000,60);

  		UserSer.sendsms({mobile:$scope.goVerify.mobile,type:$scope.vtype}).$promise.then(function(success) {
  			if (success.code==0) {
          		$cordovaToast.showShortCenter(success.msg);
  			}else{

          localStorage.setItem('mobile',$scope.goVerify.mobile);
  				$scope.vcode=success.vcode;
  				$scope.uid=success.uid;
          $cordovaToast.showShortCenter(success.msg);
  			}
  		}, function(error) {
        		$cordovaToast.showShortCenter('网络不给力!');
  		});
  	}
  	$scope.ToVcode=function() {
  		var vcode=$scope.vcode;
      var mobile=localStorage.getItem('mobile');
  		if (vcode===$scope.goVerify.vcode && mobile===$scope.goVerify.mobile) {
  			$state.go('tab.setpwd');
  		}else{
  			$cordovaToast.showShortCenter('验证码错误或者手机号和验证码不匹配!');
  		}

  	}
  	$scope.setPwdForm = function() {
        var newpwd=$scope.setPwd.newpwd;var confpwd=$scope.setPwd.confpwd;var mobile=localStorage.getItem('mobile');
        if (newpwd!==confpwd) {

        $cordovaToast.showShortCenter('两次输入密码不一样!');
        }else{
          UserSer.setpwd({pwd:newpwd,mobile:mobile}).$promise.then(function(success) {
           if (success.code==1) {
            $cordovaToast.showShortCenter(success.msg);
          	//$cordovaToast.showShortCenter(success.msg);
             localStorage.setItem('uid',success.uid);
            $state.go('tab.user');
           } else{
           $cordovaToast.showShortCenter(success.msg);
           }
          }, function(error){
          $cordovaToast.showShortCenter('网络不给力');
         });
        }
    };
    $scope.Tlogin=function(type){
            $ionicLoading.show({template: '授权中，请稍等...'});
          $timeout(function(){$ionicLoading.hide();},1000);
        if (type=='wx') {
              var scope = "snsapi_userinfo",
              state = "_" + (+new Date());
              Wechat.auth("snsapi_userinfo",state, function (response) {
              // you may use response.code to get the access token.
              var code=response.code;
              UserSer.osslogin({code:code,type:'wx'}).$promise.then(function(succ){
                if(succ.code===0){
                  $cordovaToast.showLongCenter(succ.msg);
                }else{
                  $state.go('tab.user');
                  $cordovaToast.showShortCenter('登陆成功');
                  localStorage.setItem('uid',succ.uid);
                }
              },function(error){
                $cordovaToast.showLongCenter('网络服务错误!');
              })
            }, function (reason) {
              $cordovaToast.showLongCenter(reason);
            });
        } else if(type=='qq') {
          var checkClientIsInstalled = 1;//默认值是 0,仅仅针对 iOS平台有效![]()
              YCQQ.ssoLogin(function(args){
                    UserSer.osslogin({token:args.access_token,openid:args.userid,type:'qq'}).$promise.then(function(succ){
                    if(succ.code===0){
                      $cordovaToast.showLongCenter(succ.msg);
                    }else{
                      $state.go('tab.user');
                      $cordovaToast.showShortCenter('登陆成功');
                      localStorage.setItem('uid',succ.uid);
                    }
                  },function(error){
                    $cordovaToast.showLongCenter('网络服务错误!');
                  })
                },function(failReason){
  
              },checkClientIsInstalled);
        }else if (type=='wb'){
          YCWeibo.ssoLogin(function(args){
                  UserSer.osslogin({token:args.access_token,openid:args.userid,type:'wb'}).$promise.then(function(succ){
                    if(succ.code===0){
                      $cordovaToast.showLongCenter(succ.msg);
                    }else{
                      $state.go('tab.user');
                      $cordovaToast.showShortCenter('登陆成功');
                      localStorage.setItem('uid',succ.uid);
                    }
                  },function(error){
                    $cordovaToast.showLongCenter('网络服务错误!');
                  })
                },function(failReason){
          });
        }

      }

  }])
  .controller('IntegralCtrl',['$scope','$rootScope','$stateParams','$timeout','$cordovaToast','PaySer','$ionicPopup','$ionicModal','ShopSer',function($scope,$rootScope,$stateParams,$timeout,$cordovaToast,PaySer,$ionicPopup,$ionicModal,ShopSer){
      $scope.payList = [
        { text: "5元", value:5 },
        { text: "10元", value:10},
        { text: "50元", value:50},
        { text: "100元", value:100},
      ];
      $scope.num=100;
      $scope.numChange = function(item) {
        $scope.num=item;
      };
    var uid=localStorage.getItem('uid');
    PaySer.getInte({uid:uid}).$promise.then(function(succ) {
      if (succ.code===0) {
          $cordovaToast.showShortCenter(succ.msg);
      } else {
          $scope.inteinfo=succ.inte;
          $cordovaToast.showShortCenter(succ.msg);
      }
    }, function (error) {
      $cordovaToast.showShortCenter('网络服务错误!');
    })
    $scope.goPay=function(pt) {
      PaySer.getCharge({uid:uid,amount:$scope.num,method:pt}).$promise.then(function(succ) {
      if (succ.code===1) {
        pingpp.createPayment(succ.charge, function (success) {
              if (success==='success') {
                  PaySer.changeStatus({data:succ.charge}).$promise.then(function (s) {
                    $cordovaToast.showShortCenter(s.msg);
                    if (s.code===1) {
                      $scope.inteinfo=s.inteinfo;
                    }
                  }, function(e) {
                    $cordovaToast.showShortCenter('服务器错误');
                  })
              }
          }, function (err) {
               $cordovaToast.showShortCenter('支付错误');
          });


        }else{
          $cordovaToast.showShortCenter('没有生成有效的订单');
        }

      }, function (error) {
        $cordovaToast.showShortCenter('服务器错误');
      })
    }
  }])
  .controller('UinfoCtrl', ['$scope','$state','UserSer','$cordovaToast','$ionicModal','$rootScope',function($scope,$state,UserSer,$cordovaToast,$ionicModal,$rootScope){
      var uid=localStorage.getItem('uid');
      if(angular.isUndefined(uid)|| uid==null){
        $scope.isLogin=false;
      }else{
        $scope.isLogin=true;
      }
    $scope.goLogin=function(){
      $state.go('tab.login');
    }

      $scope.refresh=function(){
        UserSer.uinfo({uid:uid}).$promise.then(function(succ){
          if(succ.nickname){
            $scope.nickname=succ.nickname;
          }else{
            $scope.nickname='';
          }
          $scope.imgurl=succ.headimgurl;
           $scope.score1=succ.score1;
        },function(error){
          $cordovaToast.showShortCenter('网络服务错误!');
        })
      }

      UserSer.uinfo({uid:uid}).$promise.then(function(succ){
        if(succ.nickname){
          $scope.nickname=succ.nickname;
        }else{
          $scope.nickname='';
        }
        $scope.imgurl=succ.headimgurl;
        $scope.score1=succ.score1;
      },function(error){
        $cordovaToast.showShortCenter('网络服务错误!');
      })
      $scope.LoginOut=function(){
        localStorage.removeItem('uid');
        $state.go('tab.login');

      }
 
      $scope.qiandao=function(){
        UserSer.qiandao({uid:uid}).$promise.then(function(succ){
           $scope.score1=succ.score1;
           $cordovaToast.showShortCenter("恭喜签到成功赠10积分!");
        },function(error){
          $cordovaToast.showShortCenter("签到失败!");
        })
      }
  }])
  .controller('MyuanCtrl', ['$scope','$stateParams','YuanSer','$timeout','$cordovaToast','ShareSer','$bottomSheet', 
    function ($scope,$stateParams,YuanSer,$timeout,$cordovaToast,ShareSer,$bottomSheet) {
    var uid=localStorage.getItem('uid');
    if(angular.isUndefined(uid)|| uid==null){
      $cordovaToast.showShortCenter('你还没登陆呢,赶快去登陆...');
    }else{
      $scope.qid=$stateParams.qid;
      YuanSer.Ylist({uid:uid}).$promise.then(function(success) {
        $scope.myuaninid=success.ninid;
        $scope.myuanitems=success.list;
        $timeout(function(){$scope.more=success.more;},2000);
      });

      $scope.loadMore = function(){
        $timeout(function(){
          YuanSer.Ylist({ninid:$scope.myuaninid,uid:uid}).$promise.then(function(success) {
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
        YuanSer.Ylist({uid:uid}).$promise.then(function(success) {
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
             $cordovaToast.showShortCenter(success.msg);
          }

        },function(error){

        })
      }
    }
    $scope.shareyuan=function(yid){
      YuanSer.getyuan({id:yid}).$promise.then(function(succ){
        $scope.url='http://www.zhongfox.com/api.php?s=/Pcweb/shareYuan/id/'+yid;
        $scope.stitle=succ.title;
        $scope.imgurl=succ.imgurl;
        $bottomSheet.show({
              buttons: [
              [
              {btText:"",btClass:"positive icon iconfont icon-qq1193403easyiconnet",btId:"1"},
              {btText:"",btClass:"energized icon iconfont icon-qzone1193405easyiconnet",btId:"2"},
              {btText:"",btClass:"assertive icon iconfont icon-weibo1193419easyiconnet",btId:"5"},
              ],
              [
              {btText:"",btClass:"positive icon iconfont icon-wechat1193418easyiconnet",btId:"3"},
              {btText:"",btClass:"balanced icon iconfont icon-pengyouquan1193401easyiconnet",btId:"4"},
              ],
              [
              {btText:"",btClass:"icon ion-chevron-down",btId:"hide",hideOnClick:true}, //hide the bottomSheet when click
              ]
              ],
              titleText: '',
              buttonClicked: function(button) {
                  if(button.btId=='1'){
                      ShareSer.shareToQQ($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='2'){
                      ShareSer.shareTozone($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='3'){
                      ShareSer.shareToWechat($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='4') {
                      ShareSer.shareToFriends($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='5') {
                      ShareSer.shareToWeibo($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }
              }
          });
      },function(error){

      })
    }
  }])

  .controller('WorkersCtrl', ['$scope','$state','ToolSer','$cordovaToast',function($scope,$state,ToolSer,$cordovaToast) {

      $scope.WorkForm = function () {
        var uid=localStorage.getItem('uid');
        if(angular.isUndefined(uid)|| uid==null){
          $cordovaToast.showShortCenter('你还没登陆呢,赶快去登陆...');
        }else {
        ToolSer.setWork({title: $scope.setWork.title, desc: $scope.setWork.desc}).$promise.then(function (succ) {
          if (succ.code == 0) {
            $cordovaToast.showShortCenter(succ.msg);
          } else {
            $cordovaToast.showShortCenter(succ.msg);
            $state.go('tab.user');
          }
        }, function (error) {
          $cordovaToast.showShortCenter('网络服务错误!');
        })
      }
    }
  }])

  .controller('AdviceCtrl', ['$scope','$state','ToolSer','$cordovaToast', function($scope,$state,ToolSer,$cordovaToast){
    //突变选择服务
      $scope.AdviceForm = function () {
        var uid=localStorage.getItem('uid');
        if(angular.isUndefined(uid)|| uid==null){
          $cordovaToast.showShortCenter('你还没登陆呢,赶快去登陆...');
        }else {
        ToolSer.setAdvice({title: $scope.setAdvice.title, desc: $scope.setAdvice.desc}).$promise.then(function (succ) {
          if (succ.code == 0) {
            $cordovaToast.showShortCenter(succ.msg);
          } else {
            $cordovaToast.showShortCenter(succ.msg);
            $state.go('tab.user');
          }
        }, function (error) {
          $cordovaToast.showShortCenter('网络服务错误!');
        })
      }
    }
  }])

//在线拜佛
  .controller('ActionCtrl', ['$scope','$state','$rootScope','$cordovaToast','ShareSer', function($scope,$state,$rootScope,$cordovaToast,ShareSer){

  }])
  .controller('qiuqianCtrl', ['$scope','$stateParams','$location','$cordovaToast','$cordovaVibration','$state','ToolSer', function($scope,$stateParams,$location,$cordovaToast,$cordovaVibration,$state,ToolSer){
     $scope.qid=$stateParams.qid;
    localStorage.setItem("qid",$scope.qid);
    var onShake = function () {
            var str=$location.path();
        if (str.indexOf('qiuqian')!=-1) {
           $cordovaVibration.vibrate(100);
            $state.go('zhuqian');
        };
      };
  shake.startWatch(onShake, 20);
  }])
  .controller('zhuqianCtrl', ['$scope','$stateParams','$state','ToolSer','$cordovaToast','ShareSer','$bottomSheet', function($scope,$stateParams,$state,ToolSer,$cordovaToast,ShareSer,$bottomSheet){
    var uid=localStorage.getItem('uid');
    var qid=localStorage.getItem("qid");
    ToolSer.qiantitle({qid:qid}).$promise.then(function(succ){
      $scope.qdid=succ.id;
      $scope.title=succ.title;
      $scope.desc1=succ.desc1;
      $scope.desc2=succ.desc2;
      $scope.content=succ.content;
      $scope.mydesc=succ.description;
    },function(error){
      $cordovaToast.showShortCenter('网络不给力');
    })
      $scope.shareQian=function () {
        $scope.url='http://www.zhongfox.com/api.php?s=/Pcweb/shareQian/id/'+$scope.qdid+'/uid/'+uid;
        $scope.stitle='我在 天天佛App 抽了一个'+$scope.title+', 快来围观吧!!!';
        $scope.desc=$scope.mydesc;
        $scope.imgurl='http://www.zhongfox.com/Uploads/Picture/2015-10-21/5627adecf039a.jpg';
        $bottomSheet.show({
              buttons: [
              [
              {btText:"",btClass:"positive icon iconfont icon-qq1193403easyiconnet",btId:"1"},
              {btText:"",btClass:"energized icon iconfont icon-qzone1193405easyiconnet",btId:"2"},
              {btText:"",btClass:"assertive icon iconfont icon-weibo1193419easyiconnet",btId:"5"},
              ],
              [
              {btText:"",btClass:"positive icon iconfont icon-wechat1193418easyiconnet",btId:"3"},
              {btText:"",btClass:"balanced icon iconfont icon-pengyouquan1193401easyiconnet",btId:"4"},
              ],
              [
              {btText:"",btClass:"icon ion-chevron-down",btId:"hide",hideOnClick:true}, //hide the bottomSheet when click
              ]
              ],
              titleText: '',
              buttonClicked: function(button) {
                  if(button.btId=='1'){
                      ShareSer.shareToQQ($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='2'){
                      ShareSer.shareTozone($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='3'){
                      ShareSer.shareToWechat($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='4') {
                      ShareSer.shareToFriends($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='5') {
                      ShareSer.shareToWeibo($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }
              }
          });
      }
  }])
  .controller('QiufoCtrl', ['$scope','$stateParams','$interval','$state','$timeout','BaifoSer','$cordovaNetwork','$cordovaToast','$ionicPopup','$ionicModal','$ionicActionSheet','PaySer','$rootScope', function($scope,$stateParams,$interval,$state,$timeout,BaifoSer,$cordovaNetwork,$cordovaToast,$ionicPopup,$ionicModal,$ionicActionSheet,PaySer,$rootScope){
    	$scope.toid=$stateParams.toid;
       var uid=localStorage.getItem('uid');
      $scope.fot=localStorage.getItem('fot'+$scope.toid);
      if (angular.isUndefined($scope.fot) || $scope.fot===null) {
         $scope.fot=$scope.toid;
      }
      $scope.newfolist=[];
      $scope.qfinfo=BaifoSer.get($scope.fot);
      $scope.fodesc=function() {
        $scope.folist=BaifoSer.getgroup($scope.toid);
            angular.forEach($scope.folist, function(value, key) {
                $scope.newfolist.push(value);
            });
        $scope.modal.show();
      }

      $scope.setfo=function (id) {
        $scope.fot=id;
        localStorage.setItem('fot'+$scope.toid,id);
        $scope.modal.hide();
       }

      $scope.$watch('fot', function(newVal, oldVal) {
        $scope.qfinfo=BaifoSer.get($scope.fot);
      });
      if ($rootScope.platform==='ios') {
        $scope.isDisabled=true;
      }else{
        $scope.isDisabled=false;
      }

      $scope.setxiang= function() {
        $scope.isDisabled=true;
          var spinner = document.getElementById("spinner");
          var spinner1 = document.getElementById("spinner1");
          var spinner2 = document.getElementById("spinner2");
          if (spinner.style.WebkitWebkitAnimationPlayState === 'running') {
              spinner.style.WebkitAnimationPlayState = 'paused';
              document.body.className = 'paused';
          } else {
              spinner.style.WebkitAnimationPlayState = 'running';
              document.body.className = '';
          }
          if (spinner1.style.WebkitAnimationPlayState === 'running') {
              spinner1.style.WebkitAnimationPlayState = 'paused';
              document.body.className = 'paused';
          } else {
              spinner1.style.WebkitAnimationPlayState = 'running';
              document.body.className = '';
          }
          if (spinner2.style.WebkitAnimationPlayState === 'running') {
              spinner2.style.WebkitAnimationPlayState = 'paused';
              document.body.className = 'paused';
          } else {
              spinner2.style.WebkitAnimationPlayState = 'running';
              document.body.className = '';
          }

          $timeout(function(){
            $scope.isDisabled=false;
            spinner.style.WebkitAnimationPlayState = 'paused';
            spinner1.style.WebkitAnimationPlayState = 'paused';
            spinner2.style.WebkitAnimationPlayState = 'paused';
          },30010);
        }
        $scope.goPay = function() {
             $ionicPopup.alert({
                  templateUrl: 'html/popup/paypup.html',
                  title: '广结善缘 随喜赞赏',
                  subTitle:'捐助的钱会兑换成功德',
                  scope: $scope,
                  okText:'取消',
                  okType:'button-energized'
                  }).then(function(res) {
                    $cordovaToast.showShortCenter('取消功德捐助');
                  });
        };

        $ionicModal.fromTemplateUrl('templates/modal.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modal = modal;
          });
        $scope.toid=$stateParams.toid;
      	$scope.qfinfo=BaifoSer.get($scope.toid);
        $scope.volume='ion-android-volume-off';
          var audio = document.getElementById('myaudio');
      	$scope.playMusic=function() {
          if(audio.paused){
              $scope.isOffline = $cordovaNetwork.isOffline();
              $scope.network=$cordovaNetwork.getNetwork();
                if ($scope.isOffline) {
                  $cordovaToast.showShortCenter('无法联网!请检查网络!');
                } else{
                if ($scope.network==='wifi') {
                  $cordovaToast.showShortCenter('即将播放音乐...');
                      $scope.volume='ion-android-volume-up';
                      audio.play();
                } else{
                        $ionicPopup.confirm({
                          title: '友情提示!',
                          content: '您目前使用的是'+$scope.network+'网络,如果点击确定将会使用您的流量!',
                          cancelText:'取消',
                          okText:'确定'
                        }).then(function(res) {
                          if(res) {
                            $cordovaToast.showShortCenter('即将播放音乐...');
                            $scope.volume='ion-android-volume-up';
                            audio.play();
                          } else {
                            $cordovaToast.showShortCenter('取消播放音乐...');
                          }
                        });
                };
                };

          }else{
            $scope.volume='ion-android-volume-off';
                  audio.pause();
          }
      	}
      	$scope.goaction=function () {
      		var audio = document.getElementById('myaudio');
          $scope.volume='ion-android-volume-off';
      		 audio.pause();
      		 $state.go('tab.action');
      	}
  }])
  .controller('MyfoCtrl', ['$scope','$rootScope','$stateParams','$state','BenmingSer','$cordovaToast','$ionicModal','$ionicPopup','PaySer', '$cordovaNetwork',function($scope,$rootScope,$stateParams,$state,BenmingSer,$cordovaToast,$ionicModal,$ionicPopup,PaySer,$cordovaNetwork){
         var uid=localStorage.getItem('uid');
        $ionicModal.fromTemplateUrl('templates/modal.html', {
              scope: $scope
            }).then(function(modal) {
              $scope.modal = modal;
            });
          $scope.bmfid=localStorage.getItem('bmf');
          if (angular.isUndefined($scope.bmfid)||$scope.bmfid==null) {
                $rootScope.bmfinfo=BenmingSer.get(1);
          } else {
                $rootScope.bmfinfo=BenmingSer.get($scope.bmfid);
          }
          $scope.allbmlist=BenmingSer.all();
          $scope.setbmf=function(bmfid) {
            localStorage.setItem('bmf',bmfid);
            $rootScope.bmfinfo=BenmingSer.get(bmfid);
            $scope.modal.hide();
            $state.go('mybminfo',{bmid: bmfid});
            }

        if ($rootScope.platform==='ios') {
          $scope.isDisabled=true;
        }else{
          $scope.isDisabled=false;
        }

        $scope.setxiang= function() {
        $scope.isDisabled=true;
          var spinner = document.getElementById("spinner");
          var spinner1 = document.getElementById("spinner1");
          var spinner2 = document.getElementById("spinner2");
          if (spinner.style.WebkitAnimationPlayState === 'running') {
              spinner.style.WebkitAnimationPlayState = 'paused';
              document.body.className = 'paused';
          } else {
              spinner.style.WebkitAnimationPlayState = 'running';
              document.body.className = '';
          }
          if (spinner1.style.WebkitAnimationPlayState === 'running') {
              spinner1.style.WebkitAnimationPlayState = 'paused';
              document.body.className = 'paused';
          } else {
              spinner1.style.WebkitAnimationPlayState = 'running';
              document.body.className = '';
          }
          if (spinner2.style.WebkitAnimationPlayState === 'running') {
              spinner2.style.WebkitAnimationPlayState = 'paused';
              document.body.className = 'paused';
          } else {
              spinner2.style.WebkitAnimationPlayState = 'running';
              document.body.className = '';
          }

          }
 
          $scope.goPay = function() {
               $ionicPopup.alert({
                    templateUrl: 'html/popup/paypup.html',
                    title: '广结善缘 随喜赞赏',
                    subTitle:'捐助的钱会兑换成功德',
                    scope: $scope,
                    okText:'取消',
                    okType:'button-energized'
                    }).then(function(res) {
                      $cordovaToast.showShortCenter('取消功德捐助');
                    });
                    
          };

          $ionicModal.fromTemplateUrl('templates/modal.html', {
              scope: $scope
            }).then(function(modal) {
              $scope.modal = modal;
            });
            $scope.volume='ion-android-volume-off';
        var audio = document.getElementById('myaudio');
        $scope.playMusic=function() {
          if(audio.paused){
              $scope.isOffline = $cordovaNetwork.isOffline();
              $scope.network=$cordovaNetwork.getNetwork();
                if ($scope.isOffline) {
                  $cordovaToast.showShortCenter('无法联网!请检查网络!');
                } else{
                if ($scope.network==='wifi') {
                  $scope.volume='ion-android-volume-up';
                      audio.play();
                } else{
                        $ionicPopup.confirm({
                          title: '友情提示!',
                          content: '您目前使用的是'+$scope.network+'网络,如果点击确定将会使用您的流量!',
                          cancelText:'取消',
                          okText:'确定'
                        }).then(function(res) {
                          if(res) {
                            $scope.volume='ion-android-volume-up';
                            $cordovaToast.showShortCenter('即将播放音乐...');
                            audio.play();
                          } else {
                            $cordovaToast.showShortCenter('取消播放音乐...');
                          }
                        });
                };
                };

          }else{
            $scope.volume='ion-android-volume-off';
            audio.pause();
          }
        }
        $scope.goaction=function () {
          var audio = document.getElementById('myaudio');
          $scope.volume='ion-android-volume-off';
           audio.pause();
           $state.go('tab.action');
        }
  }])
  .controller('MybmlistCtrl', ['$scope','$rootScope','$stateParams','$state','ShopSer','$cordovaToast','$ionicModal', function($scope,$rootScope,$stateParams,$state,ShopSer,$cordovaToast,$ionicModal){
    $ionicModal.fromTemplateUrl('html/user/cardmodal.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });
      var uid=localStorage.getItem('uid');
    $scope.showcard=function(goodsid) {
      ShopSer.cardinfo({uid:uid,goodsid:goodsid}).$promise.then(function(succ) {
        if (succ.code===0) {
          $cordovaToast.showShortCenter(succ.msg);
        }else{
          $scope.address=succ.address;
          $scope.goods=succ.goods;
          $rootScope.danjia=succ.danjia;
        }
      }, function (error) {
       $cordovaToast.showShortCenter('服务器错误');
      })
     $scope.modal.show();
    }
    var bmfid=$stateParams.bmid;
    $scope.bmlist=ShopSer.bmfList({id:bmfid});
  }])
  .controller('MybminfoCtrl', ['$scope','$stateParams','$state','ShopSer','$cordovaToast', function($scope,$stateParams,$state,ShopSer,$cordovaToast){
    $scope.bmfid=$stateParams.bmid;
    $scope.bminfo=ShopSer.bmfInfo({id:$scope.bmfid}).$promise.then(function(succ) {
      $scope.bminfo=succ.bminfo;
    }, function (error) {
        $cordovaToast.showShortCenter('服务器错误');
    });
  }])
  .controller('CardmodalCtrl',['$scope','$rootScope','$timeout','$cordovaToast','ShopSer','PaySer',function($scope,$rootScope,$timeout,$cordovaToast,ShopSer,PaySer){
    var uid=localStorage.getItem('uid');
      $scope.hideModal = function() {
          $scope.modal.hide();
        };
      $scope.isDisabled=true;
      $scope.goodsnum=1;
        $scope.$watch('goodsnum', function(newVal, oldVal) {
        if (newVal>1) {
          $scope.isDisabled=false;
        }else {
          $scope.isDisabled=true;
        }
      });
        $scope.minus=function() {
          $scope.goodsnum--;
        }
        $scope.plus=function () {
           $scope.goodsnum++;
        }
  $scope.CradForm=function() {
    PaySer.isMoney({uid:uid,goodsneed:$scope.goods.money_need,goodsnum:$scope.goodsnum}).$promise.then(function (succ) {
      if (succ.code===0) {
          //积分足够
                ShopSer.orderInfo({
                  uid:uid,
                  address:$scope.carData.address,
                  zipcode:$scope.carData.zipcode,
                  phone:$scope.carData.phone,
                  name:$scope.carData.name,
                  goodsid:$scope.goods.id,
                  goodsneed:$scope.goods.money_need,
                  goodsnum:$scope.goodsnum
                }).$promise.then(function(success) {
                  $cordovaToast.showShortCenter(success.msg);
                }, function(error) {
                  $cordovaToast.showShortCenter('服务器错误');
                })

      } else {
        //积分不足，人民币补上
            PaySer.getCharge({uid:uid,amount:succ.money,method:'alipay',goodsid:$scope.goods.id}).$promise.then(function(succ) {
                if (succ.code===1) {
                  pingpp.createPayment(succ.charge, function (success) {
                        if (success==='success') {
                          YuanSer.qiyuan({yuan: $scope.QYinfo.qiyuan,ishow:$scope.ishow, fid: qid, uid: uid,isPay:1}).$promise.then(function (succ) {
                            if (succ.code===1){
                              $ionicHistory.goBack();
                            }
                            $cordovaToast.showShortCenter(succ.msg);
                          }, function (error) {
                            $cordovaToast.showShortCenter('网络不给力!');
                          });
                        }
                    }, function (err) {
                         $cordovaToast.showShortCenter('支付失败');
                    });

                  }else{
                    $cordovaToast.showShortCenter('没有生成有效的订单');
                  }

                }, function (error) {
                  $cordovaToast.showShortCenter('服务器错误');
                })
      }
    }, function (error) {
        $cordovaToast.showShortCenter('服务器错误');
    })
  }
  }])

//佛学音乐
  .controller('SayCtrl', ['$scope','$ionicModal','$rootScope', function($scope,$ionicModal,$rootScope){
      $scope.openModal = function() {
        if ($rootScope.isPlay) {
            $scope.modal.show();
          }
      };
      $ionicModal.fromTemplateUrl('html/say/playingmodal.html', function(modal) {
        $scope.modal = modal;
      }, {
        animation: 'slide-in-up',
        focusFirstInput: true
      });
  }])
  .controller('MusicCtrl',['$scope','$stateParams','MusicSer','DataBinding','Player','Audio','$rootScope','$ionicModal','$cordovaNetwork','$cordovaToast','ShareSer','$ionicPopup','$bottomSheet',
    function ($scope,$stateParams,MusicSer,DataBinding,Player,Audio,$rootScope,$ionicModal,$cordovaNetwork,$cordovaToast,ShareSer,$ionicPopup,$bottomSheet) {
    $rootScope.mid=$stateParams.id;
      $rootScope.playing=false;
      MusicSer.musicList({id:$rootScope.mid}).$promise.then(function(success) {
          $scope.zjinfo=success.zjinfo;
          $rootScope.musicitems=success.mlist;
          $rootScope.xzimg=$scope.zjinfo.img;
          $rootScope.munum=$scope.zjinfo.count;
        });

      $scope.player = Player,
      $scope.audio = Audio,
      $scope.isSelected = function(index) {
          $scope.network=$cordovaNetwork.getNetwork();
            if ($scope.network=='wifi') {
                    $rootScope.isPlay=true;
                    $rootScope.playindex = this.$index,
                    $scope.songid = this.$index,
                    DataBinding.dataBindFunc($rootScope.musicitems[index]),
                    $scope.player.controllPlay($rootScope.musicitems[index]),
                    $scope.selectedRow = index,
                    $scope.openModal();
            } else{
                    $ionicPopup.confirm({
                      title: '友情提示!',
                      content: '您目前使用的是'+$scope.network+'网络,如果点击确定将会使用您的流量!',
                      cancelText:'取消',
                      okText:'确定'
                    }).then(function(res) {
                      if(res) {
                        $cordovaToast.showShortCenter('即将播放音乐...');
                        $rootScope.playindex = this.$index,
                        $scope.songid = this.$index,
                        DataBinding.dataBindFunc($rootScope.musicitems[index]),
                        $scope.player.controllPlay($rootScope.musicitems[index]),
                        $scope.selectedRow = index,
                        $rootScope.isPlay=true;
                        $scope.openModal();
                      } else {
                        $cordovaToast.showShortCenter('取消播放音乐...');
                      }
                    });
            };
      }

      $scope.share=function() {
          $scope.url='http://www.zhongfox.com/api.php?s=/Pcweb/shareMusic/zj/zj/mid/'+$scope.mid;
          $scope.stitle=$scope.zjinfo.title;
          $scope.desc=$scope.zjinfo.content;
          $scope.imgurl=$scope.xzimg;
          $bottomSheet.show({
              buttons: [
              [
              {btText:"",btClass:"positive icon iconfont icon-qq1193403easyiconnet",btId:"1"},
              {btText:"",btClass:"energized icon iconfont icon-qzone1193405easyiconnet",btId:"2"},
              {btText:"",btClass:"assertive icon iconfont icon-weibo1193419easyiconnet",btId:"5"},
              ],
              [
              {btText:"",btClass:"positive icon iconfont icon-wechat1193418easyiconnet",btId:"3"},
              {btText:"",btClass:"balanced icon iconfont icon-pengyouquan1193401easyiconnet",btId:"4"},
              ],
              [
              {btText:"",btClass:"icon ion-chevron-down",btId:"hide",hideOnClick:true}, //hide the bottomSheet when click
              ]
              ],
              titleText: '',
              buttonClicked: function(button) {
                  if(button.btId=='1'){
                      ShareSer.shareToQQ($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='2'){
                      ShareSer.shareTozone($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='3'){
                      ShareSer.shareToWechat($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='4') {
                      ShareSer.shareToFriends($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='5') {
                      ShareSer.shareToWeibo($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }
              }
          });
      }

        $scope.openModal = function() {
          if ($rootScope.isPlay) {
              $scope.modal.show();
            }
        };
        $ionicModal.fromTemplateUrl('html/say/playingmodal.html', function(modal) {
          $scope.modal = modal;
        }, {
          animation: 'slide-in-up',
          focusFirstInput: true
        });

  }])

  .controller('PlayModalCtrl',['$scope','$rootScope','$stateParams','Player','DataBinding','Audio','$timeout','$cordovaToast','MusicSer','ShareSer','$bottomSheet',
    function($scope,$rootScope,$stateParams,Player,DataBinding,Audio,$timeout,$cordovaToast,MusicSer,ShareSer,$bottomSheet){
    $scope.audio=Audio;
    $rootScope.status = "repeat";
      $scope.play = function() {
        Audio.play();
      };
      //暂停
      $scope.pause = function() {
        Audio.pause();
      };
      $scope.setHot=function() {
        MusicSer.setHot({musicid:$scope.musicid}).$promise.then(function(succ) {
          if (succ.code===1) {
            var intview=parseInt($scope.hot);
            $scope.hot=++intview;
            $cordovaToast.showShortCenter('点赞成功');
            $scope.infodis=true;
          } else{
            $cordovaToast.showShortCenter('网络服务错误,请稍后再试!');
          };
        },function(error) {
          $cordovaToast.showShortCenter('网络服务错误');
        })

      }
      $scope.share=function() {
          $scope.url='http://www.zhongfox.com/api.php?s=/Pcweb/shareMusic/mid/'+$scope.musicid;
          $scope.stitle= $scope.song;
          $scope.desc='佛教音乐,纯净唯美,净化心灵,我最爱听来自天天佛的音乐';
          $scope.imgurl=$scope.xzimg;
          $bottomSheet.show({
              buttons: [
              [
              {btText:"",btClass:"positive icon iconfont icon-qq1193403easyiconnet",btId:"1"},
              {btText:"",btClass:"energized icon iconfont icon-qzone1193405easyiconnet",btId:"2"},
              {btText:"",btClass:"assertive icon iconfont icon-weibo1193419easyiconnet",btId:"5"},
              ],
              [
              {btText:"",btClass:"positive icon iconfont icon-wechat1193418easyiconnet",btId:"3"},
              {btText:"",btClass:"balanced icon iconfont icon-pengyouquan1193401easyiconnet",btId:"4"},
              ],
              [
              {btText:"",btClass:"icon ion-chevron-down",btId:"hide",hideOnClick:true}, //hide the bottomSheet when click
              ]
              ],
              titleText: '',
              buttonClicked: function(button) {
                  if(button.btId=='1'){
                      ShareSer.shareToQQ($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='2'){
                      ShareSer.shareTozone($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='3'){
                      ShareSer.shareToWechat($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='4') {
                      ShareSer.shareToFriends($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='5') {
                      ShareSer.shareToWeibo($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }
              }
          });
      }

    $rootScope.$watch('mid',function(newValue,oldValue, rootScope){
        if (!angular.isUndefined($rootScope.playindex)) {
        $scope.isPlay=true;
        $scope.xzimg=$rootScope.musicitems[$rootScope.playindex].img;
        $scope.song=$rootScope.musicitems[$rootScope.playindex].name;
        $scope.hot=$rootScope.musicitems[$rootScope.playindex].hot;
        $scope.musicid=$rootScope.musicitems[$rootScope.playindex].mid;
        $scope.infodis=false;
        Player.playerSrc($rootScope.musicitems[$rootScope.playindex]);
        Player.controllPlay($rootScope.musicitems[$rootScope.playindex]);
        }
    });

    $rootScope.$watch('playindex',function(newValue,oldValue, rootScope){
        if (!angular.isUndefined($rootScope.playindex)) {
        $scope.isPlay=true;
        $scope.xzimg=$rootScope.musicitems[$rootScope.playindex].img;
        $scope.song=$rootScope.musicitems[$rootScope.playindex].name;
        $scope.hot=$rootScope.musicitems[$rootScope.playindex].hot;
        $scope.musicid=$rootScope.musicitems[$rootScope.playindex].mid;
        $scope.infodis=false;
        Player.playerSrc($rootScope.musicitems[$rootScope.playindex]);
        Player.controllPlay($rootScope.musicitems[$rootScope.playindex]);
        }
      });
      $rootScope.status = 'list';//默认播放全部
      $scope.$watch('status', function(newVal, oldVal) {
        if (newVal) {
          $rootScope.status='list';
        }
        else {
          $rootScope.status='repeat';
        }
      });
        $scope.hideModal = function() {
          $scope.modal.hide();
        };

      $scope.$watch('isPlay', function(newVal, oldVal) {
        if (newVal) {
          $rootScope.isPlay=true;
          Audio.play();
        }
        else {
          $rootScope.isPlay=false;
          Audio.pause();
        }
      });
     $scope.prev=function() {
          0 == $rootScope.playindex  ? $rootScope.playindex  = $rootScope.munum - 1 : $rootScope.playindex  -= 1,
          Player.controllPlay($rootScope.musicitems[$rootScope.playindex])
      },
      $scope.next=function() {
          $rootScope.playindex  == $rootScope.munum - 1 ? $rootScope.playindex  = 0 : $rootScope.playindex  += 1,
          Player.controllPlay($rootScope.musicitems[$rootScope.playindex])
      }

      Audio.addEventListener("ended",
        function() {
          if ("list" === $rootScope.status) {
              if ($rootScope.playindex === $rootScope.munum - 1) {
                  $rootScope.playindex = 0;
              } else {
                  $rootScope.playindex += 1;
              }
              Player.controllPlay($rootScope.musicitems[$rootScope.playindex]);
          } else {
              Player.controllPlay($rootScope.musicitems[$rootScope.playindex]);
          }

        });
  }])

// 修行
  .controller('PracticeCtrl',['$scope','$state','$rootScope','$stateParams','$timeout','$cordovaToast','ParSer','$ionicPopup','$ionicModal',function($scope,$state,$rootScope,$stateParams,$timeout,$cordovaToast,ParSer,$ionicPopup,$ionicModal){
          var uid=localStorage.getItem('uid');
              // if (angular.isUndefined(uid) || uid == null) {
              //     $cordovaToast.showShortCenter('登录之后.会有更多惊喜呦...');
              //   }
          ParSer.getop({uid:uid}).$promise.then(function (succ) {
              $scope.toplist=succ.list;
            }, function (error) {
              $cordovaToast.showShortCenter('网络服务错误');
            })
          $scope.myke = function(type) {
            ParSer.getTree({pid:type,uid:uid}).$promise.then(function (succ) {
              $scope.tlist=succ.list;
              $scope.data = {parSelect:$scope.tlist[0].id};
              $scope.pname=succ.pname;
            }, function (error) {
              $cordovaToast.showShortCenter('网络服务错误');
            })
            $ionicPopup.show({
              templateUrl: 'html/popup/kepopup.html',
              title: '今日修行登记',
              subTitle: '请先选择登记内容类型',
              scope: $scope,
              buttons: [
                { text: '取消',
                  type: 'button',
                   onTap: function(e) { return true; }
                 },
                {
                  text: '保存',
                  type: 'button-energized ',
                  onTap: function(e) {
                    return $scope.data;
                  }
                },
              ]
              }).then(function(res) {
                if (angular.isObject(res)) {
                  if (angular.isUndefined(uid) || uid == null) {
                          $cordovaToast.showShortCenter('你还没登陆呢,赶快去登陆...');
                        } else {
                          if (angular.isUndefined(res.parSelect)||angular.isUndefined(res.num)) {
                            //$cordovaToast.showShortCenter('没有选择登记选项或者没有登记数据');
                          } else {

                               ParSer.dengji({key:res.parSelect,val:res.num,uid:uid,pid:type}).$promise.then(function(succ) {
                                  $state.go('tab.pralog');
                                  $cordovaToast.showShortCenter(succ.msg);
                                }, function (error) {
                                 $cordovaToast.showShortCenter('服务器错误');
                                })
                          }
                }
                }else{
                    $cordovaToast.showShortCenter('你取消了登记');
                }

              }, function(err) {
                console.log('Err:', err);
              }, function(msg) {
                console.log('message:', msg);
              });
          };

    $scope.openModal = function() {
          $scope.modal.show();
    };
    $ionicModal.fromTemplateUrl('html/pra/pramodal.html', function(modal) {
      $scope.modal = modal;
    }, {
      animation: 'slide-in-up',
      focusFirstInput: true
    });
  }])
  .controller('AllyuanCtrl', ['$scope','$stateParams','YuanSer','$timeout','ShareSer','$bottomSheet',
   function ($scope,$stateParams,YuanSer,$timeout,ShareSer,$bottomSheet) {
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

    $scope.addview=function(yid){
     YuanSer.addview({yid:yid}).$promise.then(function(success){
       document.getElementById('item'+yid).innerHTML=success.newview;
       var newclass='button  button-small button-icon ion-ios-heart assertive fr';
       document.getElementById('item'+yid).className=newclass;
       document.getElementById('item'+yid).setAttribute("disabled","disabled");
     },function(error){

     })
    }

    $scope.shareyuan=function(yid){
      YuanSer.getyuan({id:yid}).$promise.then(function(succ){
            $scope.url='http://www.zhongfox.com/api.php?s=/Pcweb/shareYuan/id/'+yid;
            $scope.stitle=succ.title;
            $scope.desc='';
            $scope.imgurl=succ.imgurl;
            $bottomSheet.show({
              buttons: [
              [
              {btText:"",btClass:"positive icon iconfont icon-qq1193403easyiconnet",btId:"1"},
              {btText:"",btClass:"energized icon iconfont icon-qzone1193405easyiconnet",btId:"2"},
              {btText:"",btClass:"assertive icon iconfont icon-weibo1193419easyiconnet",btId:"5"},
              ],
              [
              {btText:"",btClass:"positive icon iconfont icon-wechat1193418easyiconnet",btId:"3"},
              {btText:"",btClass:"balanced icon iconfont icon-pengyouquan1193401easyiconnet",btId:"4"},
              ],
              [
              {btText:"",btClass:"icon ion-chevron-down",btId:"hide",hideOnClick:true}, //hide the bottomSheet when click
              ]
              ],
              titleText: '',
              buttonClicked: function(button) {
                  if(button.btId=='1'){
                      ShareSer.shareToQQ($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='2'){
                      ShareSer.shareTozone($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if(button.btId=='3'){
                      ShareSer.shareToWechat($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='4') {
                      ShareSer.shareToFriends($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }else if (button.btId=='5') {
                      ShareSer.shareToWeibo($scope.url, $scope.stitle, $scope.desc, $scope.imgurl);
                  }
              }
          });
      },function(error){

      })
    }

  }])
  //祈愿
  .controller('SetyuanCtrl', ['$scope','$stateParams','YuanSer','$state','$cordovaToast','$ionicHistory','PaySer','$ionicModal',function($scope,$stateParams,YuanSer,$state,$cordovaToast,$ionicHistory,PaySer,$ionicModal) {
    var qid=$stateParams.qid;
    var uid=localStorage.getItem('uid');

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
      YuanSer.getdesc().$promise.then(function (succ) {
        $scope.desc=succ.desc;
      }, function (error) {
        // body...
      })
    $scope.QYinfoForm=function () {
      var uid = localStorage.getItem('uid');
      if (angular.isUndefined(uid) || uid == null) {
        $cordovaToast.showShortCenter('你还没登陆呢,赶快去登陆...');
      } else {
        if ($scope.isPay) {
            $scope.needPay();
        } else {

            YuanSer.qiyuan({yuan: $scope.QYinfo.qiyuan,ishow:$scope.ishow, fid: qid, uid: uid,isPay:0}).$promise.then(function (succ) {
              if (succ.code===1){
                $ionicHistory.goBack();
              }
              $cordovaToast.showShortCenter(succ.msg);
            }, function (error) {
              $cordovaToast.showShortCenter('网络不给力!');
            });
          }
       }
    }
  $scope.needPay=function() {
    PaySer.isMoney({uid:uid,goodsid:27}).$promise.then(function (succ) {
      if (succ.code==1) {
          //积分足够
              YuanSer.qiyuan({yuan: $scope.QYinfo.qiyuan,ishow:$scope.ishow, fid: qid, uid: uid,isPay:1}).$promise.then(function (succ) {
                if (succ.code===1){
                  $ionicHistory.goBack();
                }
                $cordovaToast.showShortCenter(succ.msg);
              }, function (error) {
                $cordovaToast.showShortCenter('网络不给力!');
              });

      } else {
        //积分不足，人民币补上
            PaySer.getCharge({uid:uid,amount:succ.money,method:'alipay'}).$promise.then(function(succ) {
                if (succ.code===1) {
                  pingpp.createPayment(succ.charge, function (success) {
                        if (success==='success') {
                          YuanSer.qiyuan({yuan: $scope.QYinfo.qiyuan,ishow:$scope.ishow, fid: qid, uid: uid,isPay:1}).$promise.then(function (succ) {
                            if (succ.code===1){
                              $ionicHistory.goBack();
                            }
                            $cordovaToast.showShortCenter(succ.msg);
                          }, function (error) {
                            $cordovaToast.showShortCenter('网络不给力!');
                          });
                        }
                    }, function (err) {
                         $cordovaToast.showShortCenter('支付失败');
                    });

                  }else{
                    $cordovaToast.showShortCenter('没有生成有效的订单');
                  }

                }, function (error) {
                  $cordovaToast.showShortCenter('服务器错误');
                })
      }
    }, function (error) {
        $cordovaToast.showShortCenter('服务器错误');
    })
  }
  }])

  .controller('PralogCtrl',['$scope','$rootScope','$stateParams','$timeout','$cordovaToast','ParSer','$ionicPopup','$ionicModal',function($scope,$rootScope,$stateParams,$timeout,$cordovaToast,ParSer,$ionicPopup,$ionicModal){
    var uid=localStorage.getItem('uid');
    ParSer.tongji({tt:'day',uid:uid}).$promise.then(function(succ) {
      $scope.daylist=succ.list;
    }, function (error) {
      $cordovaToast.showShortCenter('网络服务错误!');
    })
  }])
  .controller('PaihangCtrl',['$scope','$rootScope','$stateParams','$timeout','$cordovaToast','ParSer','$ionicPopup','$ionicModal',function($scope,$rootScope,$stateParams,$timeout,$cordovaToast,ParSer,$ionicPopup,$ionicModal){
    var uid=localStorage.getItem('uid');
    ParSer.tongji({tt:'day',uid:uid}).$promise.then(function(succ) {
      $scope.daylist=succ.list;
    }, function (error) {
      $cordovaToast.showShortCenter('网络服务错误!');
    })
  }])
  .controller('CxLogCtrl',['$scope','$timeout','ParSer',function($scope,$timeout,ParSer){
    var uid=localStorage.getItem('uid');
        ParSer.timerList({uid:uid}).$promise.then(function (succ) {
          $scope.xiulist=succ.list;
          $scope.xiucount=succ.count;
        }, function (error) {
         $cordovaToast.showShortCenter('服务器错误');
        })
  }])
  .controller('CxphCtrl',['$scope','$timeout','ParSer',function($scope,$timeout,ParSer){
    var uid=localStorage.getItem('uid');
    ParSer.paihang({uid:uid,filed:'baoxiu'}).$promise.then(function(succ) {
      $scope.cxlist=succ.pai;
      $scope.cxmc=succ.mymc;
    }, function (error) {
      $cordovaToast.showShortCenter('网络服务错误!');
    })
  }])
  .controller('NfLogCtrl',['$scope','$timeout','ParSer','$cordovaToast',function($scope,$timeout,ParSer,$cordovaToast){
    var uid=localStorage.getItem('uid');
        ParSer.nianfoList({uid:uid}).$promise.then(function (succ) {
          $scope.nflist=succ.list;
          $scope.nfcount=succ.count;
        }, function (error) {
         $cordovaToast.showShortCenter('服务器错误');
        })
     var id=localStorage.getItem('id');
    $scope.infodis=false;
    $scope.huanjifen=function(){
        ParSer.huanjifen({uid:uid,id:id}).$promise.then(function (succ) {
           $cordovaToast.showShortCenter(succ.msg);
            $scope.infodis=true;
        }, function (error) {
           $cordovaToast.showShortCenter(error.msg);
        })
      }
  }])
  .controller('NfphCtrl',['$scope','$timeout','ParSer','$cordovaToast',function($scope,$timeout,ParSer,$cordovaToast){
    var uid=localStorage.getItem('uid');
    ParSer.paihang({uid:uid,filed:'fohao'}).$promise.then(function(succ) {
      $scope.fohaolist=succ.pai;
      $scope.fohaomc=succ.mymc;
    }, function (error) {
      $cordovaToast.showShortCenter('网络服务错误!');
    })
  }])

  .controller('ChanxiuCtrl',['$scope','$rootScope','$stateParams','$timeout','$cordovaToast','ParSer','$ionicPopup',function($scope,$rootScope,$stateParams,$timeout,$cordovaToast,ParSer,$ionicPopup){
        var uid=localStorage.getItem('uid');
        //记录
        $rootScope.xiumins=0;
        $scope.chamiao=0;
        $scope.timeList = [
          { text: "30", value:30 },
          { text: "60", value:60},
          { text: "120", value:120},
          { text: "240", value:240 },
        ];
        $scope.num=120;
        $scope.numChange = function(item) {
          $scope.num=item;
        };
          $scope.showPrompt = function() {
           $ionicPopup.prompt({
                templateUrl: 'html/popup/chxpup.html',
                title: '请输入修行时间',
                subTitle: '以分钟为单位计算',
                scope: $scope,
                buttons: [
                  { text: '取消',
                    type: 'button',
                     onTap: function(e) { return false; }
                   },
                  {
                    text: '确认',
                    type: 'button-energized ',
                    onTap: function(e) {
                      return true;
                    }
                  },
                ]
                }).then(function(res) {
                  if (res) {
                    if (angular.isUndefined(uid) || uid == null) {
                            $cordovaToast.showShortCenter('你还没登陆呢,赶快去登陆...');
                          } else {
                            $scope.miao=$scope.num*60;
                            $scope.xiutime=1;
                            $scope.selectTimer($scope.miao);
                          }
                  }else{
                      $cordovaToast.showShortCenter('你取消了本次功德');
                  }
                }, function(err) {
                  console.log('Err:', err);
                }, function(msg) {
                  console.log('message:', msg);
                });
      };


        var mytimeout = null; // the current timeoutID
        // actual timer method, counts down every second, stops on zero
        $scope.onTimeout = function() {
          if ($scope.timer === 0) {
            $rootScope.xiumins+=$scope.chamiao;
            $scope.$broadcast('timer-stopped', 0);
            $timeout.cancel(mytimeout);
            return;
          }
          $scope.timer--;
          $scope.chamiao++;
          mytimeout = $timeout($scope.onTimeout, 1000);
        };
        // functions to control the timer
        // starts the timer
        $scope.startTimer = function() {
          $scope.chamiao=0;
          mytimeout = $timeout($scope.onTimeout, 1000);
          $scope.started = true;
        };

        // stops and resets the current timer
        $scope.stopTimer = function(closingModal) {
          if (closingModal != true) {
            $scope.$broadcast('timer-stopped', $scope.timer);
          }
          $scope.chamiao=0;
          $scope.timer = $scope.timeForTimer;
          $scope.started = false;
          $scope.paused = false;
          $scope.done = false;
          $timeout.cancel(mytimeout);
        };
        // pauses the timer
        $scope.pauseTimer = function() {
          $rootScope.xiumins+=$scope.chamiao;
          $scope.$broadcast('timer-stopped', $scope.timer);
          $scope.chamiao=0;
          $scope.started = false;
          $scope.paused = true;
          $timeout.cancel(mytimeout);
        };

        // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
        $scope.$on('timer-stopped', function(event, remaining) {
          if (remaining === 0) {
            $scope.done = true;
          }
        });
        // UI
        // When you press a timer button this function is called
        $scope.selectTimer = function(val) {
          $scope.timeForTimer = val;
          $scope.timer = val
          $scope.started = false;
          $scope.paused = false;
          $scope.done = false;
        };
        $scope.baotimer=function() {
          ParSer.baotimer({uid:uid,num:$rootScope.xiumins}).$promise.then(function(succ) {
            if (succ.code===1){
              $cordovaToast.showShortCenter('保存成功');
              $rootScope.xiumins=0;
            }else{
              $cordovaToast.showShortCenter(msg);
            }
          }, function (error) {
            $cordovaToast.showShortCenter('网络服务错误!');
          })
        }
        // This function helps to display the time in a correct way in the center of the timer
        $scope.humanizeDurationTimer = function(input, units) {
          // units is a string with possible values of y, M, w, d, h, m, s, ms
          if (input == 0) {
            return 0;
          } else {
            var duration = moment().startOf('day').add(input, units);
            var format = "";
            if (duration.hour() > 0) {
              format += "H[:] ";
            }
            if (duration.minute() > 0) {
              format += "m[:] ";
            }
            if (duration.second() > 0) {
              format += "s";
            }
            return duration.format(format);
          }
        };
  }])
  .controller('MuyuCtrl',['$scope','$rootScope','$stateParams','$timeout','$cordovaToast','ParSer','$ionicPopup','$ionicModal','$cordovaNativeAudio',function($scope,$rootScope,$stateParams,$timeout,$cordovaToast,ParSer,$ionicPopup,$ionicModal,$cordovaNativeAudio){
    var uid=localStorage.getItem('uid');
    $scope.bcounth=0;
    $scope.imgurl='image/muyu.png';
      $cordovaNativeAudio.preloadComplex('click', 'image/muyu.mp3', 20, 1).then(function (msg) {
    }, function (error) {
    });
    $scope.onefohao=function(){
        $scope.imgurl='image/muyu2.png';
        $cordovaNativeAudio.play('click');
      $scope.bcounth++;
      $timeout(function(){
        $scope.imgurl='image/muyu.png';
      },500);
    }
    $scope.baofohao=function(){
      ParSer.baohao({uid:uid,num:$scope.bcounth}).$promise.then(function(succ) {
        if (succ.code===1){
          $cordovaToast.showShortCenter(succ.msg);
          $scope.bcounth=0;
        }else{
          $cordovaToast.showShortCenter(succ.msg);
        }
      }, function (error) {
        $cordovaToast.showShortCenter('网络服务错误!');
      })
    }
  }])
  .controller('PaihangmCtrl',['$scope','$rootScope','$stateParams','$timeout','$cordovaToast','ParSer','$ionicModal',function($scope,$rootScope,$stateParams,$timeout,$cordovaToast,ParSer,$ionicModal){
    var uid=localStorage.getItem('uid');
    ParSer.paihang({uid:uid,type:'m'}).$promise.then(function(succ) {
      $scope.pailist=succ.pai;
      $scope.mymc=succ.mymc;
    }, function (error) {
      $cordovaToast.showShortCenter('网络服务错误!');
    })
  }])
  .controller('PaihangdCtrl',['$scope','$rootScope','$stateParams','$timeout','$cordovaToast','ParSer','$ionicModal',function($scope,$rootScope,$stateParams,$timeout,$cordovaToast,ParSer,$ionicModal){

  }])
  .controller('MonthlogCtrl',['$scope','$rootScope','$stateParams','$timeout','$cordovaToast','ParSer','$ionicModal',function($scope,$rootScope,$stateParams,$timeout,$cordovaToast,ParSer,$ionicModal){
          var uid=localStorage.getItem('uid');
            ParSer.getop({uid:uid}).$promise.then(function (succ) {
              $scope.toplist=succ.list;
            }, function (error) {
              $cordovaToast.showShortCenter('服务器错误');
            })
            ParSer.monthlog({uid:uid,changeid:1}).$promise.then(function (succ) {
              if (succ.code===0) {
                $scope.msg=succ.msg;
              } else {
              $scope.labels=succ.labels;
              $scope.series=succ.series;
              $scope.data=succ.data;
              }

            },function (error) {
             $cordovaToast.showShortCenter('网络服务错误!');
            })

          $scope.changechart=function(changeid) {
            ParSer.monthlog({uid:uid,changeid:changeid}).$promise.then(function (succ) {
              if (succ.code===0) {
                $scope.msg=succ.msg;
              } else {
              $scope.labels=succ.labels;
              $scope.series=succ.series;
              $scope.data=succ.data;
              }

            },function (error) {
              $cordovaToast.showShortCenter('网络服务错误!');
            })
          }
  }])
  .controller('PramodalCtrl',['$scope','$rootScope','$timeout','$cordovaToast','ParSer',function($scope,$rootScope,$timeout,$cordovaToast,ParSer){
    var uid=localStorage.getItem('uid');
      $scope.hideModal = function() {
          $scope.modal.hide();
        };
        ParSer.getAllcate({uid:uid}).$promise.then(function(succ) {
          $scope.catetree=succ.list;
        }, function (error) {
          $cordovaToast.showShortCenter('网络服务错误!');
        })
        $scope.mysets=[];
        $scope.setModal=function() {
          angular.forEach($scope.catetree, function(value, key) {
              angular.forEach(value.child, function(val, k) {
                if (val.selvalue===true) {
                  $scope.mysets.push(val);
                }
              });
          });
          ParSer.setmycate({val:$scope.mysets,uid:uid}).$promise.then(function(succ) {
            if (succ.code===1) {
                $cordovaToast.showShortCenter(succ.msg);
                $scope.hideModal();
            }else{
              $cordovaToast.showShortCenter(succ.msg);
            }
          }, function (error) {
            $cordovaToast.showShortCenter('网络服务错误');
          })
        }
  }])



  //支付公用
  .controller('PaypupCrtl',['$scope','$rootScope','$timeout','$cordovaToast','PaySer',function($scope,$rootScope,$timeout,$cordovaToast,PaySer){
      var uid=localStorage.getItem('uid');
       $scope.payList = [
          { text: "5", value:5 },
          { text: "20", value:20},
          { text: "50", value:50 },
          { text: "100", value:100 },
        ];
        $scope.num=5;
        $scope.numChange = function(item) {
          $scope.num=item;
        };
        $scope.paymodel=2;
        $scope.zh_paymodel='微信支付';
        $scope.payChange = function(model) {
          $scope.paymodel=model;
          if (model===2) {
           $scope.zh_paymodel='微信支付';
           $scope.method='wx';
          }else{
            $scope.zh_paymodel='支付宝';
            $scope.method='alipay';
          }
        };

      $scope.ttfPay=function(met) {
      if (angular.isUndefined(uid) || uid == null) {
        $cordovaToast.showShortCenter('你还没登陆呢,赶快去登陆...');
      } else {
            PaySer.getCharge({uid:uid,amount:$scope.num,method:met}).$promise.then(function(succ) {
            if (succ.code===1) {
              pingpp.createPayment(succ.charge, function (success) {
                    if (success==='success') {
                        PaySer.changeStatus({data:succ.charge}).$promise.then(function (s) {
                          $cordovaToast.showShortCenter(s.msg);
                          if (s.code===1) {
                            $scope.inteinfo=s.inteinfo;
                          }
                        }, function(e) {
                          $cordovaToast.showShortCenter('网络服务错误');
                        })
                    }
                }, function (err) {
                     $cordovaToast.showShortCenter(err);
                });


              }else{
                $cordovaToast.showShortCenter('没有生成有效的订单');
              }

            }, function (error) {
              $cordovaToast.showShortCenter('网络服务错误');
            })
          }
        }
  }])

 .controller('DashiCtrl', ['$scope','$rootScope','$stateParams','$state','DashiSer','$cordovaToast','$ionicModal','$ionicPopup','PaySer', '$cordovaNetwork',function($scope,$rootScope,$stateParams,$state,DashiSer,$cordovaToast,$ionicModal,$ionicPopup,PaySer,$cordovaNetwork){
       
          $scope.items=DashiSer.all();

  }])

//定义常用全局变量
  .run(['$rootScope',function ($rootScope) {
    $rootScope.serUrl="http://www.zhongfox.com/api.php?s=/";
    $rootScope.isPlay=0;
  }]);


