angular.module('fo.services', ['ngResource'])

  .factory('UserSer', ['$resource','$rootScope',function ($resource,$rootScope) {
   
    var MobileApp=$rootScope.shopUrl;
  return $resource(MobileApp+'User/:fun', {}, {
    //denglu
    login: {method: 'GET',params:{fun:'login'},isArray: false},
    //验证手机
    vmobile: {method: 'GET',params:{fun:'vmobile'},isArray: false},
    //设置密码
    setpwd: {method: 'GET',params:{fun:'setpwd'},isArray: false},
    //发送短信
    sendsms: {method: 'GET',params:{fun:'sendsms'},isArray: false},
    //微信登陆
    ssologin: {method: 'GET',params:{fun:'ssologin'},isArray: false},
    //用户信息
    uinfo:{method: 'GET',params:{fun:'getUserInfo'},isArray: false},
    //愿望列表
    Ylist:{method: 'GET',params:{fun:'yuanList'},isArray: false},
    //还愿
    Hyuan:{method: 'GET',params:{fun:'Hyuan'},isArray: false},
    //祈愿墙
    allyuan:{method: 'GET',params:{fun:'allyuan'},isArray: false},
    //签到
    qiandao:{method: 'GET',params:{fun:'qiandao'},isArray: false},

  })
}])

  //藏经阁
  .factory('YuanSer', ['$resource','$rootScope',function ($resource,$rootScope) {
    var MobileApp=$rootScope.wxserUrl;
    return $resource(MobileApp+':ctrl/:fun', {ctrl:'Yuan'}, {

      allyuan: {method: 'GET',params:{fun:'allyuan'},isArray: false},
      //denglu
      qiyuan:{method: 'POST',params:{fun:'qiyuan'},isArray: false},
      //验证手机
      Ylist:{method: 'GET',params:{fun:'yuanList'},isArray: false},
      //设置密码
      addview: {method: 'GET',params:{fun:'addview'},isArray: false},
      //还愿
      changeStatus: {method: 'GET',params:{fun:'changeStatus'},isArray: false},
      //得到愿望
      getyuan: {method: 'GET',params:{fun:'getyuan'},isArray: false},

    })
  }])
//藏经阁
  .factory('BookSer', ['$resource','$rootScope',function ($resource,$rootScope) {
    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+':ctrl/fun/:fun', {ctrl:'Book'}, {
      //注册
      navlist: {method: 'GET',params:{fun:'navlist'},isArray: true},
      //denglu
      booklist: {method: 'GET',params:{fun:'booklist'},isArray: false},
      //验证手机
      bookinfo: {method: 'GET',params:{fun:'foinfo'},isArray: false},
      //设置密码
      addView: {method: 'GET',params:{fun:'addView'},isArray: false},

    })
  }])
  .factory('NewsSer', ['$resource','$rootScope',function ($resource,$rootScope) {
    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+':ctrl/fun/:fun', {ctrl:'News'}, {
      //注册
      navlist: {method: 'GET',params:{fun:'navlist'},isArray: false},
      //denglu
      newslist: {method: 'GET',params:{fun:'newslist'},isArray: false},
      //验证手机
      newsinfo: {method: 'GET',params:{fun:'newinfo'},isArray: false},

      addView: {method: 'GET',params:{fun:'addView'},isArray: false},
    })
  }])
    .factory('ChatSer', ['$resource','$rootScope',function ($resource,$rootScope) {
    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+':ctrl/fun/:fun', {ctrl:'Issue'}, {
      //注册
      navlist: {method: 'GET',params:{fun:'navlist'},isArray: true},
      //denglu
      chatslist: {method: 'GET',params:{fun:'chatslist'},isArray: false},
      //验证手机
      chatinfo: {method: 'GET',params:{fun:'chatinfo'},isArray: false},
      //
      addView: {method: 'GET',params:{fun:'addView'},isArray: false},
    })
  }])
    .factory('ApiSer', ['$resource','$rootScope',function ($resource,$rootScope) {
    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+':ctrl/fun/:fun', {}, {
      //注册
      yunshi: {method: 'GET',params:{ctrl:'shop',fun:'bmfInfo'},isArray: false},
    })
  }])
  .factory('MusicSer', ['$resource','$rootScope',function ($resource,$rootScope) {
    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+'music/:fun', {}, {
      typeList: {method: 'GET',params:{fun:'typeList'},isArray: false},
      musicList:{method: 'GET',params:{fun:'musicList'},isArray: false},
      setHot:{method: 'GET',params:{fun:'setHot'},isArray: false}
    })
  }])
  .factory('PaySer', ['$resource','$rootScope',function ($resource,$rootScope) {
    var MobileApp=$rootScope.wxserUrl;
    return $resource(MobileApp+'Pay/:fun', {}, {
      getCharge: {method: 'GET',params:{fun:'payOrder'},isArray: false},
      getInte: {method: 'GET',params:{fun:'getInte'},isArray: false},
      changeStatus: {method: 'POST',params:{fun:'changeStatus'},isArray: false},
      isMoney:{method: 'GET',params:{fun:'isMoney'},isArray: false},
      payList:{method: 'GET',params:{fun:'payList'},isArray: true}
    })
  }])
  .factory('ShopSer', ['$resource','$rootScope',function ($resource,$rootScope) {
    var MobileApp=$rootScope.shopUrl;
    return $resource(MobileApp+'Api/:fun', {}, {
      //商城首页
      getShopIndex: {method: 'GET',params:{fun:'getShopIndex'},isArray: false},
      //商品列表
      getGoodsList:{method: 'GET',params:{fun:'getGoodsList'},isArray: false},
      //商品详情
      getGoodsInfo:{method: 'GET',params:{fun:'getGoodsInfo'},isArray: false},
      //添加到购物车
      addToCart:{method: 'GET',params:{fun:'addToCart'},isArray: false},
      //我的购物车
      getMyCart:{method: 'GET',params:{fun:'getMyCart'},isArray: false},
      //确定
      confirmOrder:{method: 'POST',params:{fun:'confirmOrder'},isArray: false},
      //添加订单
      getWpOrder:{method: 'GET',params:{fun:'getWpOrder'},isArray: false},
      //调用支付
      orderToPay:{method: 'GET',params:{fun:'orderToPay'},isArray: false},
      //支付成功
      payOk:{method: 'POST',params:{fun:'payOk'},isArray: false},
      //订单列表
      orderList:{method: 'GET',params:{fun:'orderList'},isArray: false},
      //快递信息:
      getSendInfo:{method: 'GET',params:{fun:'getSendInfo'},isArray: false},
      //确认收货
      queryOrder:{method: 'GET',params:{fun:'queryOrder'},isArray: false},
      //充功德值
      chargeInte:{method: 'GET',params:{fun:'chargeInte'},isArray: false},
      //得到功德
      getInte:{method: 'GET',params:{fun:'getInte'},isArray: false}
    })
  }])
  .factory('IntefoSer', ['$resource','$rootScope',function ($resource,$rootScope) {
   
    var MobileApp=$rootScope.wxserUrl;
    return $resource(MobileApp+'Intefo/:fun', {}, {
      incScore: {method: 'GET',params:{fun:'incscore'},isArray: false},
      getInfo: {method: 'GET',params:{fun:'getinfo'},isArray: false}
    })
  }])


  .factory('TempleSer', ['$resource','$rootScope',function ($resource,$rootScope) {
    var MobileApp=$rootScope.wxserUrl;
  return $resource(MobileApp+'Temple/:fun', {}, {
    //寺院介绍
    intro:{method: 'GET',params:{fun:'intro'},isArray: false},
    //入驻大师
    templeUser:{method: 'GET',params:{fun:'templeUser'},isArray: false},
    //得到省份
    getProvince:{method: 'GET',params:{fun:'getProvince'},isArray: false},
    //得到市区
    getCity:{method: 'GET',params:{fun:'getCity'},isArray: false},
    //得到县区
    getDistrict:{method: 'GET',params:{fun:'getDistrict'},isArray: false}, 
    //筛选出大师
    getTempleOfMaster:{method: 'GET',params:{fun:'getTempleOfMaster'},isArray: false},    
    //分类
    cate:{method: 'GET',params:{fun:'cate'},isArray: true},
    //列表
    newsList:{method: 'GET',params:{fun:'newsList'},isArray: false},
    //详情
    detail:{method: 'GET',params:{fun:'detail'},isArray: false},

    addView: {method: 'GET',params:{fun:'addView'},isArray: false},
    //分类相关
    cateid: {method: 'GET' ,params:{fun:'cateid'},isArray: false},
    ganlists:{method: 'GET',params:{fun:'ganlists'},isArray: false},
  })
}])
    .factory('MyAddressSer', ['$resource','$rootScope',function ($resource,$rootScope) {
    var MobileApp=$rootScope.shopUrl;
  return $resource(MobileApp+'Address/:fun', {}, {
    //列表
    getMyAddress:{method: 'GET',params:{fun:'myAddress'},isArray: false},
    //添加
    addAddress:{method: 'GET',params:{fun:'add_address'},isArray: false},
    //删除
    del: {method: 'GET',params:{fun:'del'},isArray: false},
    //设置默认
    setmoren:{method: 'GET',params:{fun:'setmoren'},isArray:false},
    addresslist:{method: 'GET',params:{fun:'addresslist'},isArray:false},
    adds:{method: 'GET',params:{fun:'adds'},isArray:false},
    del:{method: 'GET',params:{fun:'del'},isArray:false},
  })
}])