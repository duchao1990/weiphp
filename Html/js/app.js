// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('fo', ['ionic', 'fo.controllers','fo.services','tabSlideBox','fo.Dir','fo.filter','ionic-toast'])
.run(['$ionicPlatform','$rootScope','$location',function ($ionicPlatform, $rootScope) {
  $rootScope.serUrl="http://www.tiantianfo.com/index.php?s=/addon/WeiSite/Zhongfox/getApi/ctrl/";
  $rootScope.wxserUrl="http://www.tiantianfo.com/index.php?s=/addon/WeiSite/";
  $rootScope.shopUrl="http://www.tiantianfo.com/index.php?s=/addon/Shop/";
  //$rootScope.$on('$ionicView.beforeEnter', function() {
  //      //tabs中存在的主页面不需要隐藏，hidetabs=false
  //  if ($location.path() == '/tab/user' || $location.path() == '/tab/base' || $location.path() == '/tab/action'|| $location.path() == '/tab/shop'||$location.path() == '/tab/say') {
  //      $rootScope.hideTabs = false;
  //  }else{
  //      $rootScope.hideTabs = true;
  //      }
  //  });

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
    $ionicConfigProvider.views.swipeBackEnabled(false);
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'Html/html/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.action', {
      url: '/action',
      cache:false,
      views: {
        'tab-action': {
          templateUrl: 'Html/html/tab-action.html',
          controller: 'ActionCtrl'
        }
      }
    })

    .state('tab.qiufo', {
      url: '/qiufo/:toid',
      views: {
        'tab-action': {
          templateUrl: 'Html/html/act/qiufo.html',
          controller: 'QiufoCtrl'
        }
      }
    })
    .state('tab.myfo', {
      url: '/myfo',
      views: {
        'tab-action': {
          templateUrl: 'Html/html/act/myfo.html',
          controller: 'MyfoCtrl'
        }
      }
    })
    .state('tab.mybmlist', {
      url: '/mybmlist/:bmid',
      views: {
        'tab-action': {
          templateUrl: 'Html/html/act/mybmlist.html',
          controller: 'MybmlistCtrl'
        }
      }
    })
    .state('tab.mybminfo', {
      url: '/mybminfo/:bmid',
      views: {
        'tab-action': {
          templateUrl: 'Html/html/act/mybminfo.html',
          controller: 'MybminfoCtrl'
        }
      }
    })
    .state('tab.fomuyu', {
      url: '/fomuyu',
      views: {
        'tab-action': {
          templateUrl: 'Html/html/act/fomuyu.html',
          controller: 'MuyuCtrl'
        }
      }
    })
    .state('tab.allyuan', {
      url: '/allyuan/:qid',
      views: {
        'tab-action': {
          templateUrl: 'Html/html/act/allyuan.html',
          controller: 'AllyuanCtrl'
        }
      }
    })
    .state('tab.setyuan', {
      url: '/setyuan/:qid',
      cache:false,
      views: {
        'tab-action': {
          templateUrl: 'Html/html/act/qiyuan.html',
          controller: 'SetyuanCtrl'
        }
      }

    })



    .state('tab.shop', {
      url: '/shop',
      views: {
        'tab-shop': {
          templateUrl: 'Html/html/tab-shop.html',
          controller: 'ShopCtrl'
        }
      }
    })
      .state('tab.cart',{
        url: '/cart',
        cache:false,
        views: {
          'tab-shop': {
        templateUrl: 'Html/html/shop/cart.html',
        controller: 'CartCtrl'
          }
      }
      })
      .state('tab.checkout',{
        url: '/checkout',
        views: {
        'tab-shop': {
        templateUrl: 'Html/html/shop/checkout.html',
        controller: 'CheckoutCtrl'
        }
      }
      })
      .state('tab.goodslist', {
        url: '/goodslist/:cateid',
        views: {
        'tab-shop': {
        templateUrl: 'Html/html/shop/goodslist.html',
        controller: 'GoodsListCtrl'
          }
        }
      })
      .state('tab.goodsinfo', {
        url: '/goodsinfo/:goodsid',
        views: {
          'tab-shop': {
            templateUrl: 'Html/html/shop/goodsinfo.html',
            controller: 'GoodsInfoCtrl'
          }
        }
      })
      .state('tab.confirmOrder', {
        url: '/confirmOrder/:orderId',
        cache:false,
        views: {
          'tab-shop': {
            templateUrl: 'Html/html/shop/confirmOrder.html',
            controller: 'ConfirmOrderCtrl'
          }
        }
      })


    .state('tab.base', {
      url: '/base',
      views: {
        'tab-base': {
          templateUrl: 'Html/html/tab-base.html',
          controller: 'BaseCtrl'
        }
      }
    })
    .state('tab.newslist', {
      url: '/newslist/:tid',
      views: {
        'tab-base': {
          templateUrl: 'Html/html/news/list.html',
          controller: 'NewsListCtrl'
        }
      }
    })
    .state('tab.booklist', {
      url: '/booklist/:tid',
      views: {
        'tab-base': {
          templateUrl: 'Html/html/book/list.html',
          controller: 'BookListCtrl'
        }
      }
    })

    .state('tab.chatlist', {
      url: '/chatlist/:cid',
      views: {
        'tab-base': {
          templateUrl: 'Html/html/chat/list.html',
          controller: 'ChatsListCtrl'
        }
      }
    })
    .state('tab.siyuanlist', {
      url: '/siyuanlist/:id',
      views: {
        'tab-base': {
          templateUrl: 'Html/html/siyuan/list.html',
          controller: 'SiyuanListCtrl'
        }
      }
    })
    .state('tab.ganwulist', {
      url: '/ganwulist/:id',
      views: {
        'tab-base': {
          templateUrl: 'Html/html/siyuan/ganlist.html',
          controller: 'GanwuListCtrl'
        }
      }
    })
    .state('tab.siyuanInfo', {
      url: '/siyuanInfo/:id',
      views: {
        'tab-base': {
          templateUrl: 'Html/html/siyuan/info.html',
          controller: 'SiyuanInfoCtrl'
        }
      }
    })
    .state('tab.newsInfo', {
      url: '/newsInfo/:did',
      views: {
        'tab-base': {
		      templateUrl: 'Html/html/news/info.html',
		      controller: 'NewsInfoCtrl'
        }
      }
    })
    .state('tab.bookInfo', {
      url: '/bookInfo/:did',
      views: {
        'tab-base': {
          templateUrl: 'Html/html/book/info.html',
          controller: 'BookInfoCtrl'
        }
      }
  })

    .state('tab.chatInfo', {
      url: '/chatInfo/:did',
	    views: {
		  'tab-base': {
		      templateUrl: 'Html/html/chat/info.html',
		      controller: 'ChatInfoCtrl'
		      }
	   }
    })


    .state('tab.user', {
      url: '/user',
      views: {
        'tab-user': {
          templateUrl: 'Html/html/tab-user.html',
          controller: 'UinfoCtrl'
        }
      }
    })
    .state('tab.myuan', {
      url: '/myuan',
      cache:false,
      views: {
        'tab-user': {
          templateUrl: 'Html/html/user/myuan.html',
          controller: 'MyuanCtrl'
        }
      }
    })

    .state('tab.advice', {
      url: '/advice',
      cache:false,
      views: {
        'tab-user': {
          templateUrl: 'Html/html/user/advice.html',
          controller: 'AdviceCtrl'
        }
      }
    })
    .state('tab.ri', {
      url: '/ri',
      views: {
        'tab-user': {
          templateUrl: 'Html/html/user/ri.html',
        }
      }
    })
     .state('tab.myaddress', {
      url: '/myaddress',
      cache:false,
      views: {
        'tab-user': {
          templateUrl: 'Html/html/user/myaddress.html',
          controller: 'AddressCtrl'
        }
      }
    })
     .state('tab.addAddress', {
      url: '/addAddress',
      cache:false,
      views: {
        'tab-user': {
          templateUrl: 'Html/html/user/addAddress.html',
          controller: 'AddressCtrl'
        }
      }
    })
    .state('tab.buylist', {
      url: '/buylist',
      cache:false,
      views: {
        'tab-user': {
          templateUrl: 'Html/html/user/buylist.html',
          controller: 'OrderListCtrl'
        }
      }
    })
      .state('tab.post', {
        url: '/post/:orderId',
        views: {
          'tab-user': {
            templateUrl: 'Html/html/user/post.html',
            controller: 'PostListCtrl'
          }
        }
      })

    .state('tab.integral', {
      url: '/integral',
      views: {
        'tab-user': {
          templateUrl: 'Html/html/user/integral.html',
          controller: 'IntegralCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/base');

});
