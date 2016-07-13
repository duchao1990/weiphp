// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('fo', ['ionic','chart.js','ngCordova','chinaSdk', 'fo.controllers','fo.services','tabSlideBox','ngIOS9UIWebViewPatch','fo.Dir','fo.filter','ionic-timepicker','angular-svg-round-progress','ion-BottomSheet'])
.run(['$ionicPlatform','$rootScope','$location','ConfigSer', '$ionicHistory','$cordovaToast',function ($ionicPlatform, $rootScope, $location, ConfigSer, $ionicHistory,$cordovaToast) {
    $rootScope.platform=ionic.Platform.platform();
    if ($rootScope.platform==='android') {
           $rootScope.iosVery=true;
    }else{
          ConfigSer.configRes().$promise.then(function(succ) {
            $rootScope.iosVery=succ.iosVery;
          }, function (error) {
            $cordovaToast.showShortCenter('网络服务错误');
          })
    }
    $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
        //StatusBar.overlaysWebView(true);
      StatusBar.styleDefault();
    }
  });
  $rootScope.$on('$ionicView.beforeEnter', function() {
        //tabs中存在的主页面不需要隐藏，hidetabs=false
    if ($location.path() == '/tab/user' || $location.path() == '/tab/base' || $location.path() == '/tab/action'|| $location.path() == '/tab/practice'||$location.path() == '/tab/say') {
        $rootScope.hideTabs = false;
    }else{
        $rootScope.hideTabs = true;
        }
    });

  $ionicPlatform.registerBackButtonAction(function (e) {
        //判断处于哪个页面时双击退出
        if ($location.path() == '/tab/user' || $location.path() == '/tab/base' || $location.path() == '/tab/action'|| $location.path() == '/tab/practice'||$location.path() == '/tab/say') {
            if ($rootScope.backButtonPressedOnceToExit) {
                ionic.Platform.exitApp();
            } else {
                $rootScope.backButtonPressedOnceToExit = true;
                $cordovaToast.showShortCenter('再按一次退出系统');
                setTimeout(function () {
                    $rootScope.backButtonPressedOnceToExit = false;
                }, 2000);
            }
        }else if ($ionicHistory.backView()) {
            $ionicHistory.goBack();
        } else {
            $rootScope.backButtonPressedOnceToExit = true;
            $cordovaToast.showShortCenter('再按一次退出系统');
            setTimeout(function () {
                $rootScope.backButtonPressedOnceToExit = false;
            }, 2000);
        }
        e.preventDefault();
        return false;
    }, 101);
    }])

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('bottom');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'Addons/WeiSite/html/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.action', {
      url: '/action',
      cache:false,
      views: {
        'tab-action': {
          templateUrl: 'Addons/WeiSite/html/tab-action.html',
          controller: 'ActionCtrl'
        }
      }
    })
  .state('qiufo', {
    url: '/qiufo/:toid',
    cache:false,
    templateUrl: 'Addons/WeiSite/html/act/qiufo.html',
    controller: 'QiufoCtrl'
  })
  .state('myfo', {
    url: '/myfo',
    cache:false,
    templateUrl: 'Addons/WeiSite/html/act/myfo.html',
    controller: 'MyfoCtrl'
  })
  .state('mybmlist', {
    url: '/mybmlist/:bmid',
    templateUrl: 'Addons/WeiSite/html/act/mybmlist.html',
    controller: 'MybmlistCtrl'
  })
  .state('mybminfo', {
    url: '/mybminfo/:bmid',
    templateUrl: 'Addons/WeiSite/html/act/mybminfo.html',
    controller: 'MybminfoCtrl'
  })

  .state('fomuyu', {
      url: '/fomuyu',
          templateUrl: 'Addons/WeiSite/html/act/fomuyu.html',
          controller: 'MuyuCtrl'
    })
  .state('fochanxiu', {
      url: '/fochanxiu',
          templateUrl: 'Addons/WeiSite/html/act/fochanxiu.html',
          controller: 'ChanxiuCtrl'
    })
    .state('tab.base', {
      url: '/base',
      views: {
        'tab-base': {
          templateUrl: 'Addons/WeiSite/html/tab-base.html',
          controller: 'BaseCtrl'
        }
      }
    })
    .state('tab.newslist', {
      url: '/newslist/:tid',
      views: {
        'tab-base': {
          templateUrl: 'Addons/WeiSite/html/news/list.html',
          controller: 'NewsListCtrl'
        }
      }
    })
    .state('tab.booklist', {
      url: '/booklist/:tid',
      views: {
        'tab-base': {
          templateUrl: 'Addons/WeiSite/html/book/list.html',
          controller: 'BookListCtrl'
        }
      }
    })

    .state('tab.chatlist', {
      url: '/chatlist/:cid',
      views: {
        'tab-base': {
          templateUrl: 'Addons/WeiSite/html/chat/list.html',
          controller: 'ChatsListCtrl'
        }
      }
    })
    .state('tab.newsInfo', {
      url: '/newsInfo/:did',
      views: {
        'tab-base': {
		      templateUrl: 'Addons/WeiSite/html/news/info.html',
		      controller: 'NewsInfoCtrl'
        }
      }
    })
    .state('tab.bookInfo', {
      url: '/bookInfo/:did',
      views: {
        'tab-base': {
          templateUrl: 'Addons/WeiSite/html/book/info.html',
          controller: 'BookInfoCtrl'
        }
      }
  })

    .state('tab.chatInfo', {
      url: '/chatInfo/:did',
	    views: {
		  'tab-base': {
		      templateUrl: 'Addons/WeiSite/html/chat/info.html',
		      controller: 'ChatInfoCtrl'
		      }
	   }
    })


    .state('tab.user', {
      url: '/user',
      cache:false,
      views: {
        'tab-user': {
          templateUrl: 'Addons/WeiSite/html/tab-user.html',
          controller: 'UinfoCtrl'
        }
      }
    })
    .state('tab.login', {
      url: '/login',
      views: {
        'tab-user': {
          templateUrl: 'Addons/WeiSite/html/user/login.html',
          controller: 'UserCtrl'
        }
      }
    })
    .state('tab.mobile', {
      url: '/mobile/:type',
      cache:false,
      views: {
        'tab-user': {
          templateUrl: 'Addons/WeiSite/html/user/mobile.html',
          controller: 'UserCtrl'
        }
      }
    })
    .state('tab.setpwd', {
      url: '/setpwd',
      cache:false,
      views: {
        'tab-user': {
          templateUrl: 'Addons/WeiSite/html/user/setpwd.html',
          controller: 'UserCtrl'
        }
      }
    })
    .state('tab.myuan', {
      url: '/myuan',
      cache:false,
      views: {
        'tab-user': {
          templateUrl: 'Addons/WeiSite/html/user/myuan.html',
          controller: 'MyuanCtrl'
        }
      }
    })
    .state('tab.workers', {
      url: '/workers',
      cache:false,
      views: {
        'tab-user': {
          templateUrl: 'Addons/WeiSite/html/user/workers.html',
          controller: 'WorkersCtrl'
        }
      }
    })
    .state('tab.advice', {
      url: '/advice',
      cache:false,
      views: {
        'tab-user': {
          templateUrl: 'Addons/WeiSite/html/user/advice.html',
          controller: 'AdviceCtrl'
        }
      }
    })
    .state('tab.ri', {
      url: '/ri',
      views: {
        'tab-practice': {
          templateUrl: 'Addons/WeiSite/html/pra/ri.html',
        }
      }
    })
    .state('tab.muyu', {
      url: '/muyu',
      views: {
        'tab-practice': {
          templateUrl: 'Addons/WeiSite/html/pra/muyu.html',
          controller: 'MuyuCtrl'
        }
      }
    })
    .state('tab.chanxiu', {
      url: '/chanxiu',
      views: {
        'tab-practice': {
          templateUrl: 'Addons/WeiSite/html/pra/chanxiu.html',
          controller: 'ChanxiuCtrl'
        }
      }
    })
    .state('tab.paihang', {
      url: '/paihang',
      views: {
        'tab-practice': {
          templateUrl: 'Addons/WeiSite/html/pra/paihang.html',
          controller: 'PaihangCtrl'
        }
      }

    })
    .state('tab.practice', {
      url: '/practice',
      cache:false,
      views: {
        'tab-practice': {
          templateUrl: 'Addons/WeiSite/html/tab-practice.html',
          controller: 'PracticeCtrl'
        }
      }

    })
    .state('tab.pralog', {
      url: '/pralog',
      views: {
        'tab-practice': {
          templateUrl: 'Addons/WeiSite/html/pra/pralog.html',
        }
      }
    })
    .state('tab.integral', {
      url: '/integral',
      views: {
        'tab-user': {
          templateUrl: 'Addons/WeiSite/html/user/integral.html',
          controller: 'IntegralCtrl'
        }
      }
    })
    .state('allyuan', {
      url: '/allyuan/:qid',
      cache:false,
      templateUrl: 'Addons/WeiSite/html/act/allyuan.html',
      controller:'AllyuanCtrl'
    })
    .state('setyuan', {
      url: '/setyuan/:qid',
      cache:false,
      templateUrl: 'Addons/WeiSite/html/act/qiyuan.html',
      controller:'SetyuanCtrl'

    })

  .state('qiuqian', {
      url: '/qiuqian/:qid',
      cache:false,
      templateUrl: 'Addons/WeiSite/html/tool/qiuqian.html',
      controller: 'qiuqianCtrl'
    })
    .state('zhuqian', {
      url: '/zhuqian',
      cache:false,
      templateUrl: 'Addons/WeiSite/html/tool/zhuqian.html',
      controller: 'zhuqianCtrl'
    })
  .state('tab.say',{
    url:'/say',
    views:{
      'tab-say':{
        templateUrl:'Addons/WeiSite/html/tab-say.html',
        controller:'SayCtrl'
      }
    }
  })
    .state('tab.issuelist',{
      url:'/issuelist/:id',
      views:{
        'tab-say':{
          templateUrl:'Addons/WeiSite/html/say/issuelist.html',
          controller:'IssueCtrl'
        }
      }
    })
    .state('tab.musiclist',{
      url:'/musiclist/:id',
      views:{
        'tab-say':{
          templateUrl:'Addons/WeiSite/html/say/musiclist.html',
          controller:'MusicCtrl'
        }
      }
    })
    .state('tab.playing',{
      url:'/playing/:id',
      views:{
        'tab-say':{
          templateUrl:'Addons/WeiSite/html/say/playing.html',
          controller:'PlayCtrl'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/action');

});
