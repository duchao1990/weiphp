angular.module('fo.services', ['ngResource'])

  .factory('UserSer', ['$resource','$rootScope',function ($resource,$rootScope) {
    var uid=localStorage.getItem('uid');
    var MobileApp=$rootScope.serUrl;
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
    wxlogin:{method: 'GET',params:{fun:'wxlogin'},isArray: false},
    //用户信息
    uinfo:{method: 'GET',params:{fun:'uinfo'},isArray: false},
    //愿望列表
    Ylist:{method: 'GET',params:{fun:'Ylist'},isArray: false},
    //还愿
    Hyuan:{method: 'GET',params:{fun:'Hyuan'},isArray: false},
    //祈愿墙
    allyuan:{method: 'GET',params:{fun:'allyuan'},isArray: false},
    //签到加积分
    qiandao:{method: 'GET',params:{fun:'qiandao'},isArray: false},
  })
}])

  //藏经阁
  .factory('YuanSer', ['$resource','$rootScope',function ($resource,$rootScope) {

    var uid=localStorage.getItem('uid');
    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+'Yuan/:fun', {}, {

      allyuan: {method: 'GET',params:{fun:'allyuan'},isArray: false},
      //denglu
      qiyuan:{method: 'POST',params:{fun:'qiyuan'},isArray: false},
      //验证手机
      Ylist:{method: 'GET',params:{fun:'myuan'},isArray: false},
      //设置密码
      addview: {method: 'GET',params:{fun:'addview'},isArray: false},
      //还愿
      changeStatus: {method: 'GET',params:{fun:'changeStatus'},isArray: false},
      //得到愿望
      getyuan: {method: 'GET',params:{fun:'getyuan'},isArray: false},
      //得到介绍
      getdesc:{method: 'GET',params:{fun:'getdesc'},isArray: false},

    })
  }])
//藏经阁
  .factory('BookSer', ['$resource','$rootScope',function ($resource,$rootScope) {

    var uid=localStorage.getItem('uid');
    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+'Book/:fun', {}, {
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

    var uid=localStorage.getItem('uid');
    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+'News/:fun', {}, {
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

    var uid=localStorage.getItem('uid');
    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+'Issue/:fun', {}, {
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
    .factory('ToolSer', ['$resource','$rootScope',function ($resource,$rootScope) {

    var uid=localStorage.getItem('uid');
    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+'Tool/:fun', {}, {
      //denglu
      qiantitle: {method: 'GET',params:{fun:'qiantitle'},isArray: false},
        //祈愿
      qiyuan:{method: 'POST',params:{fun:'qiyuan',uid:uid},isArray: false},
      //义工招募
      setWork:{method: 'POST',params:{fun:'setWork',uid:uid},isArray: false},
      //反馈建议
      setAdvice:{method: 'POST',params:{fun:'setAdvice',uid:uid},isArray: false},
    })
  }])
  .factory('MusicSer', ['$resource','$rootScope',function ($resource,$rootScope) {

    var uid=localStorage.getItem('uid');
    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+'music/:fun', {}, {
      typeList: {method: 'GET',params:{fun:'typeList'},isArray: false},
      musicList:{method: 'GET',params:{fun:'musicList'},isArray: false},
      setHot:{method: 'GET',params:{fun:'setHot'},isArray: false}
    })
  }])
  .factory('PaySer', ['$resource','$rootScope',function ($resource,$rootScope) {

    var uid=localStorage.getItem('uid');
    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+'Pay/:fun', {}, {
      getCharge: {method: 'GET',params:{fun:'getCharge'},isArray: false},
      getInte: {method: 'GET',params:{fun:'getInte'},isArray: false},
      changeStatus: {method: 'POST',params:{fun:'changeStatus'},isArray: false},
      isMoney:{method: 'GET',params:{fun:'isMoney'},isArray: false},
    })
  }])
  .factory('ShopSer', ['$resource','$rootScope',function ($resource,$rootScope) {
    var uid=localStorage.getItem('uid');

    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+'Shop/:fun', {}, {
      bmfList: {method: 'GET',params:{fun:'bmfList'},isArray: true},
      bmfInfo: {method: 'GET',params:{fun:'bmfInfo'},isArray: false},
      address: {method: 'GET',params:{fun:'address'},isArray: false},
      goodsinfo: {method: 'GET',params:{fun:'goodsinfo'},isArray: false},
      cardinfo: {method: 'GET',params:{fun:'cardinfo'},isArray: false},
      orderInfo: {method: 'POST',params:{fun:'orderInfo'},isArray: false},
    })
  }])
  .factory('ConfigSer', ['$resource','$rootScope',function ($resource,$rootScope) {
    var uid=localStorage.getItem('uid');
    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+'Test/:fun', {}, {
      configRes: {method: 'GET',params:{fun:'configRes'},isArray: false},
    })
  }])
  .factory('ParSer', ['$resource','$rootScope',function ($resource,$rootScope) {
    var MobileApp=$rootScope.serUrl;
    return $resource(MobileApp+'Pra/:fun', {}, {
      dengji: {method: 'POST',params:{fun:'dengji'},isArray: false},
      getTree:{method: 'GET',params:{fun:'getTree'},isArray: false},
      tongji:{method: 'GET',params:{fun:'tongji'},isArray: false},
      getAllcate:{method: 'GET',params:{fun:'getAllcate'},isArray: false},
      setmycate:{method: 'POST',params:{fun:'setmycate'},isArray: false},
      getop:{method: 'GET',params:{fun:'getop'},isArray: false},
      getopnav:{method: 'GET',params:{fun:'getopnav'},isArray: true},
      monthlog:{method: 'GET',params:{fun:'tongjimonth'},isArray: false},
      paihang:{method: 'GET',params:{fun:'kkpar'},isArray: false},
      baohao:{method: 'POST',params:{fun:'baohao'},isArray: false},
      baotimer:{method: 'POST',params:{fun:'baoxiu'},isArray: false},
      timerList:{method: 'GET',params:{fun:'timerList'},isArray: false},
      nianfoList:{method: 'GET',params:{fun:'nianfoList'},isArray: false},
      huanjifen:{method: 'GET',params:{fun:'huanjifen'},isArray: false},
    })
  }])
  .factory('Player',['$rootScope','$interval','Audio','DataBinding','$ionicLoading', function ($rootScope,$interval,Audio,DataBinding,$ionicLoading) {
    var player = {
       //musicLen: length,
      controllPlay: function(item) {
          player.play(),
          DataBinding.dataBindFunc(item)
      },
      playerSrc: function(item) {
        var url = item.songUrl;
        Audio.src = url
      },
      play: function() {
        $rootScope.isPlay && player.stop(),
          Audio.play(),
          $rootScope.isPlay = true
      },
      stop: function() {
        $rootScope.isPlay && Audio.pause(),
        $rootScope.isPlay = false
      },
      prev: function() {
        console.log("prev:" + $rootScope.playindex),
          0 == $rootScope.playindex  ? $rootScope.playindex  = $rootScope.munum - 1 : $rootScope.playindex  -= 1,
          player.controllPlay($rootScope.musicitems[$rootScope.playindex])
      },
      next: function() {
        console.log("next:" + $rootScope.playindex),
          $rootScope.playindex  == $rootScope.munum - 1 ? $rootScope.playindex  = 0 : $rootScope.playindex  += 1,
          console.log($rootScope.playindex);
          player.controllPlay($rootScope.musicitems[$rootScope.playindex])
      }
    };
    return player
  }])
.factory("DataBinding", ["$rootScope", function($rootScope) {
    var dataObj = {
      dataBindFunc: function(item) {
          $rootScope.xzimg = item.img,
          $rootScope.song = item.name,
          $rootScope.count = item.count
      }
    };
    return dataObj
  }])
.factory("Audio", ["$document",
  function($document) {
    var audio = $document[0].createElement("audio");
    return audio
  }])

  .factory('BaifoSer', [function () {
var chats = [{
      id: 8,
      tid: 8,
      name: '释迦摩尼佛',
      music: 'http://music.zhongfox.com/sjmn.mp3',
      face: 'image/fo/8.png',
      desc:'释迦牟尼，原名乔达摩·悉达多，佛教的创始人，公元前五百余年释迦牟尼出生于北印度迦毗罗卫国，是国主净饭王的太子。成道后，被世人尊称为“释迦牟尼”，意思为“释迦族的贤哲”。'
    },{
      id: 81,
      tid: 8,
      name: '阿弥陀佛',
      music: 'http://music.zhongfox.com/amtf.mp3',
      face: 'image/fo/81.png',
      desc:'阿弥陀，即阿弥陀佛，又名无量寿佛，是梵语Amita-buddha 的音译，为“西方极乐世界”教主，净土宗的主要信仰对象。因其能接引念佛人往生西方净土，还称其为“接引佛”。阿弥陀佛在过去久远劫时曾立大愿，建立西方净土，广度无边众生，成就无量庄严功德。'
    },{
      id: 82,
      tid: 8,
      name: '大日如来佛',
      music: 'http://music.zhongfox.com/drrl.mp3',
      face: 'image/fo/82.png',
      desc:'大日如来依梵音可译成毗卢遮那佛，“如来”即是“佛”的意思，又名比卢遮那佛，是佛的三身中的法身佛，是密宗最无上崇高的佛，是一切佛法的根本。亦是五方佛中的中方比卢遮那佛，居于世界中央位置。'
    },{
      id: 1,
      tid: 1,
      name: '虚空藏菩萨',
      music: 'http://music.zhongfox.com/xkz.mp3',
      face: 'image/fo/1.png',
      desc:'虚空藏菩萨摩诃萨是中国大乘佛教八大菩萨摩诃萨之一，在无量菩萨中专主智慧、功德和财富。因尊上智慧、功德、财富如虚空一样广阔无边，并能满足世间一切如法持戒者的善求善愿，使无量无边众生获得无穷利益，故有此虚空藏圣名。'
    },{
      id: 11,
      tid: 1,
      name: '持金刚海音如来',
      music: 'http://music.zhongfox.com/jgcxz.mp3',
      face: 'image/fo/11.png',
      desc:'持金刚海音如来菩萨如来能雨下无量财宝，住持世间安稳丰饶，因此名为持世，诵持其真言雨宝陀罗尼，更能获致无量财宝，积聚如山高。能护持世间，故名持世菩萨也。又云，能持财宝，满世人愿，故云持世也。 '
    },{
      id: 12,
      tid: 1,
      name: '财源佛母',
      music: 'http://music.zhongfox.com/cyfm.mp3',
      face: 'image/fo/12.png',
      desc:'财源佛母，梵名：巴素达喇；藏名：军玛属，藏名译音：若君玛。又称财宝佛母、财续佛母等，属密咒部作密，系瑜珈密续佛部尊，于六道中专司人道，掌世间之财富，并为五路财神之佛母。'
    },{
      id: 2,
      tid: 2,
      name: '药师如来',
      music: 'http://music.zhongfox.com/ysz.mp3',
      face: 'image/fo/2.png',
      desc:'药师佛全称药师琉璃光如来，也有人称大医王佛、医王善逝或消灾延寿药师佛，为东方琉璃净土的教主。为药师本用以比喻能治众生贪、瞋、痴的医师。在中国佛教一般用以祈求消灾延寿。'
    },{
      id: 21,
      tid: 2,
      name: '日光菩萨',
      music: 'http://music.zhongfox.com/rgps.mp3',
      face: 'image/fo/21.png',
      desc:'日光菩萨的名号，是取自‘日放千光，遍照天下，普破冥暗’的意思。此一菩萨持其慈悲本愿，普施三昧，以照法界俗尘，摧破生死之闇冥，犹如日光之遍照世间，，是东方东方净琉璃国土无量无数菩萨众的上首大菩萨摩诃萨。'
    },{
      id: 22,
      tid: 2,
      name: '月光菩萨',
      music: 'http://music.zhongfox.com/ygps.mp3',
      face: 'image/fo/22.png',
      desc:'月光菩萨是无上尊佛药师琉璃光如来的右胁侍，也是中国大乘佛教的 尊上大菩萨摩诃萨，药师经曰：“于其国中，有二菩萨摩诃萨：一名日光遍照，二名月光遍照，是无量无数菩萨之上首。'
    },{
      id: 3,
      tid: 3,
      name: '观世音菩萨',
      music: 'http://music.zhongfox.com/gyps.mp3',
      face: 'image/fo/3.png',
      desc:'观世音菩萨是西方极乐世界阿弥陀佛的辅弼，也是佛教中慈悲和智慧的象征，无论在大乘佛教还是在民间信仰，都具有极其重要的地位。以观世音菩萨为主导的大慈悲精神，被视为大乘佛教的根本。'
    },{
      id: 31,
      tid: 3,
      name: '除盖障菩萨',
      music: 'http://music.zhongfox.com/cgzps.mp3',
      face: 'image/fo/31.png',
      desc:'除盖障菩萨摩诃萨又名除一切盖障菩萨、降伏一切障碍菩萨、弃诸阴盖菩萨，佛教八大菩萨之一，此菩萨及诸眷属皆是大慈悲拔苦除障门，密教胎藏界坛城（曼荼罗）除盖障院之主尊，密号为离恼金刚。'
    },{
      id: 32,
      tid: 3,
      name: '地藏王菩萨',
      music: 'http://music.zhongfox.com/dcz.mp3',
      face: 'image/fo/32.png',
      desc:'地藏王菩萨是八大菩萨之一，因其“安忍不动，犹如大地，静虑深密，犹如秘藏”，所以得名。 地藏是佛教中一位愿力深厚的菩萨。也是十方世界一切诸佛如来的长子，其功德广如虚空、深如大海、高如须弥，即使十方诸佛在千万劫当中，也说不尽这位大菩萨的功德。'
    },{
      id: 4,
      tid: 4,
      name: '地藏王菩萨',
      music: 'http://music.zhongfox.com/dcz.mp3',
      face: 'image/fo/4.png',
      desc:'地藏菩萨，亦地藏王菩萨，梵名 Ksitigarbha，“地”是大地，“藏”是宝藏，八大菩萨之一。曾说出：“地狱不空，誓不成佛！”“我不入地狱，谁入地狱！”的坚定佛语，《地藏菩萨本愿经》也称为佛门的“孝经。'
    },{
      id: 41,
      tid: 4,
      name: '观世音菩萨',
      music: 'http://music.zhongfox.com/gyps.mp3',
      face: 'image/fo/41.png',
      desc:'观音大士（或称观音菩萨），在中国家喻户晓，妇孺皆知。“家家有弥陀，户户有观音”，这句古今流传的俗语，就充分说明了中国民众崇敬供奉观世音菩萨的盛况，以及观世音菩萨在中国民间的深远影响。印度的菩萨和中国民众结缘最深的，莫过于观音，中国民众对她的崇信远在其他佛教神祇之上。'
    },{
      id: 42,
      tid: 4,
      name: '准提菩萨',
      music: 'http://music.zhongfox.com/fmzt.mp3',
      face: 'image/fo/42.png',
      desc:'准提菩萨汉译有准胝观音、准提佛母、七俱胝佛母等名。准提菩萨为显密佛教徒所知的大菩萨，在禅宗，则称之为天人丈夫观音。在中国佛教徒的心目中，准提菩萨是一位感应甚强、对崇敬者至为关怀的大菩萨，更是三世诸佛之母。'
    },{
      id: 5,
      tid: 5,
      name: '文殊菩萨',
      music: 'http://music.zhongfox.com/wsz.mp3',
      face: 'image/fo/5.png',
      desc:'文殊菩萨，又称文殊师利，为佛教四大菩萨之一。与般若经典关系甚深，故称为大智文殊师利菩萨。亦有说文殊菩萨为诸佛菩萨之父母者，与普贤菩萨同为释迦佛之胁侍，分别表示佛智、佛慧之别德。所乘之狮子，象征其威猛。'
    },{
      id: 51,
      tid: 5,
      name: '观世音菩萨',
      music: 'http://music.zhongfox.com/gyps.mp3',
      face: 'image/fo/51.png',
      desc:'观音菩萨，梵文 Avalokite?vara，又作观世音菩萨、观自在菩萨，当人们遇到灾难时，只要念其名号，便前往救度，所以称观世音。在佛教中，他是西方极乐世界教主阿弥陀佛座下的上首菩萨，同大势至菩萨一起，是阿弥陀佛身边的胁侍菩萨，并称“西方三圣”。'
    },{
      id: 52,
      tid: 5,
      name: '地藏王菩萨',
      music: 'http://music.zhongfox.com/dcz.mp3',
      face: 'image/fo/52.png',
      desc:'地藏王菩萨为我国佛教中的八大菩萨之一，他曾经对自己许下了重誓“地狱未空誓不成佛，众生度尽方证菩提”。所以他今后就担负着超度六界众生的重任，让六界内所有的众生脱离苦海，不再犯罪过，不再进地狱，所以佛教徒常称之为大愿地藏王菩萨。'
    },{
      id: 6,
      tid: 6,
      name: '观世音菩萨',
      music: 'http://music.zhongfox.com/gyps.mp3',
      face: 'image/fo/6.png',
      desc:'观世音菩萨是娑婆世界中,与众生最有缘的菩萨。众生若有疾苦，只要诚心默念观世音菩萨名号，这位菩萨便会从声音中去寻找受苦受难的众生，以大慈大悲之心和无边的法力，助众生超脱疾苦、实现愿望。'
    },{
      id: 61,
      tid: 6,
      name: '普贤菩萨',
      music: 'http://music.zhongfox.com/pxps.mp3',
      face: 'image/fo/61.png',
      desc:'普贤菩萨多以六牙白象为坐骑，与骑乘狮子的文殊菩萨，同为毗卢遮那佛之胁士，合称为“华严三圣”。白象代表愿行殷深，辛勤不倦；六牙，表示六波罗蜜──布施、持戒、忍辱、精进、禅定、慧智。象征着普贤菩萨的笃实行履，恒以六度万行的因花，庄严无上的佛果。'
    },{
      id: 62,
      tid: 6,
      name: '绿度母',
      music: 'http://music.zhongfox.com/ldm.mp3',
      face: 'image/fo/62.png',
      desc:'绿度母在藏传佛教中为观世音菩萨的化身，度母，梵名Tara，全称圣救度佛母，度母有许多不同的化现，包括有二十一度母、五百度母等等，皆为观世音菩萨之化身，而绿度母为所有度母之主尊。她能救八种苦难，如狮难、象难、蛇难、水难、牢狱难、贼难、非人难，又称为“救八难度母”。'
    },{
      id: 63,
      tid: 6,
      name: '圣多罗菩萨',
      music: 'http://music.zhongfox.com/amtf.mp3',
      face: 'image/fo/63.png',
      desc:'圣多罗菩萨为观世音菩萨的化身，密教观音部的佛母，位于现图胎藏界曼荼罗观音院内列-观自在菩萨的西方，观自在菩萨住普光明多罗三昧，以三昧力，自眼中放大光明，多罗菩萨即从光明中生，为妙女形，以清凉光普照众生，怜悯众生犹如慈母，誓度彼等脱离生死苦海。'
    },{
      id: 7,
      tid: 7,
      name: '大势至菩萨',
      music: 'http://music.zhongfox.com/dsz.mp3',
      face: 'image/fo/7.png',
      desc:'大势至菩萨摩诃萨是西方极乐世界无上尊佛阿弥陀佛的右胁侍者，又尊称大精进菩萨，与无上尊佛阿弥陀佛尊上观世音菩萨（无上尊佛阿弥陀佛的左胁侍）佛弟子合尊称为“西方三圣”。大势至菩萨以智慧光普照一切，令众生离三途，得无上力。'
    },{
      id: 71,
      tid: 7,
      name: '金刚手菩萨',
      music: 'http://music.zhongfox.com/jgsps.mp3',
      face: 'image/fo/71.png',
      desc:'金刚手菩萨（Vajrapā?i），执金刚菩萨”（Vajradhara）、“金刚勇猛心菩萨”、“金刚手秘密主”、“金刚上首”、“金刚藏”、“秘密主”等。是佛教的大菩萨，通常身现一手持铃，一手持金刚杵之相，象征“坚固不坏",他与观世音菩萨、文殊菩萨，合称三族性尊，密宗以他为最初的起源。'
    },{
      id: 72,
      tid: 7,
      name: ' 弥勒佛',
      music: 'http://music.zhongfox.com/mlf.mp3',
      face: 'image/fo/72.png',
      desc:'弥勒佛即弥勒菩萨摩诃萨，在大乘佛教经典中，常被称为阿逸多菩萨摩诃萨，是世尊释迦牟尼的继任者，未来将在娑婆世界降生修道，成为娑婆世界的下一尊佛，即贤劫千佛中第五尊佛，常被称为“当来下生弥勒尊佛”。'
    }];

    return {
      all: function() {
        return chats;
      },
      remove: function(chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function(chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      },
      getgroup: function(chatId) {
        var grouplist=[];
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].tid === parseInt(chatId)) {
            grouplist[i]=chats[i];
          }
        }
        return grouplist;
      }
    };
  }])
.factory('DashiSer', [function () {
    var chats = [{
      id: 1,
      name: '玄奘',
      face: 'image/12.jpg',
      desc:'玄奘，600—664)年，陈名祎，俗称唐僧，法名玄奘，通称三藏法师。隋文帝开皇二十年(600)，玄奘诞生于洛州缑氏县凤凰台陈村(今河南省偃师市缑氏镇陈河村)。'
    },{
      id: 2,
      name: '悟空',
      face: 'image/13.jpg',
      desc:'悟空（731—812），俗名车奉朝，唐朝名僧。京兆郡云阳县（今泾阳县云阳镇一带）人。是后魏拓跋氏关系疏远的后裔。被后人认为是小说《西游记》[1]  孙悟空的原型。'
    }];
     return {
      all: function() {
        return chats;
      },
      remove: function(chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function(chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      },
      getsome: function(chatIds) {
        var grouplist=[];
        var chatids=chatIds.split(",");
        for (var i = 0; i < chats.length; i++){
               for(var j in chatids){
                    if(parseInt(chatids[j])==chats[i].id){
                        grouplist[i]=chats[i];
                    }
                }
        }
        return grouplist;
      },
      getrepet: function(chatIds) {
        var grouplist=[];
        for (var i = 0; i < chats.length; i++){
               for(var j = 0; j < chatIds.length; j++){
                    if(parseInt(chatIds[j])==chats[i].id){
                        grouplist[i]=chats[i];
                    }
                }
        }
        return grouplist;
      }

    };
  }])
  
  .factory('BenmingSer', [function () {
    var chats = [{
      id: 1,
      name: '千手观音菩萨',
      xiang: '鼠',
      music: 'http://music.zhongfox.com/qsqyps.mp3',
      face: 'image/fo/101.png',
      desc:'鼠年生人，若能虔诚佩戴或供奉千手观音菩萨之本命佛法像，必使事事顺心，心想事成。'
    },{
      id: 2,
      name: '虚空藏菩萨',
      xiang: '牛',
      music: 'http://music.zhongfox.com/xkz.mp3',
      face: 'image/fo/1.png',
      desc:'虎年生人，若能虔诚佩戴或供奉虚空藏菩萨之本命佛法像，可财源广进，不虞匮乏。'
    },{
      id: 3,
      name: '虚空藏菩萨',
      xiang: '虎',
      music: 'http://music.zhongfox.com/xkz.mp3',
      face: 'image/fo/1.png',
      desc:'虎年生人，若能虔诚佩戴或供奉虚空藏菩萨之本命佛法像，可财源广进，不虞匮乏。'
    },{
      id: 4,
      name: '文殊菩萨',
      xiang: '兔',
      music: 'http://music.zhongfox.com/wsz.mp3',
      face: 'image/fo/5.png',
      desc:'兔年生人，若能虔诚佩戴或供奉文殊菩萨之本命佛法像，能获文殊菩萨保佑加倍，增长智慧，使学业事业顺利，婚姻和谐，破除一切烦恼。'
    },{
      id: 5,
      name: '普贤菩萨',
      xiang: '龙',
      music: 'http://music.zhongfox.com/pxps.mp3',
      face: 'image/fo/61.png',
      desc:'龙年生人，若能虔诚佩戴或供奉与之缘深的普贤菩萨之本命佛法像，能获菩萨护佑，灾邪远离，延年益寿并有意外收获。'
    },{
      id: 6,
      name: '普贤菩萨',
      xiang: '蛇',
      music: 'http://music.zhongfox.com/pxps.mp3',
      face: 'image/fo/61.png',
      desc:'蛇年生人，若能虔诚佩戴或供奉与之缘深的普贤菩萨之本命佛法像，能获菩萨护佑，灾邪远离，延年益寿并有意外收获。'
    },{
      id: 7,
      name: '大势至菩萨',
      xiang: '马',
      music: 'http://music.zhongfox.com/dsz.mp3',
      face: 'image/fo/7.png',
      desc:'马年生人，若能虔诚佩戴或供奉大势至菩萨之本命佛法像，将使一生聚财守财，顺利平安。 '
    },{
      id: 8,
      name: '大日如来',
      xiang: '羊',
      music: 'http://music.zhongfox.com/drrl.mp3',
      face: 'image/fo/82.png',
      desc:'羊年生人，若能虔诚佩戴或供奉大日如来之本命佛法像，必获如来光明开启智慧，成就一切事业，使贵人来助，鸿图大展。'
    },{
      id: 9,
      name: '大日如来',
      xiang: '猴',
      music: 'http://music.zhongfox.com/drrl.mp3',
      face: 'image/fo/82.png',
      desc:'猴年生人，若能虔诚佩戴或供奉大日如来之本命佛法像，必获如来光明开启智慧，成就一切事业，使贵人来助，鸿图大展。'
    },{
      id: 10,
      name: '不动尊菩萨',
      xiang: '鸡',
      music: 'http://music.zhongfox.com/bdmw.mp3',
      face: 'image/fo/102.png',
      desc:'鸡年生人，若能虔诚佩戴或供奉不动尊菩萨之本命佛法像，必能受不动明王守护，使罪业远离，一生顺利，平安如意。'
    },{
      id: 11,
      name: '阿弥陀佛',
      xiang: '狗',
      music: 'http://music.zhongfox.com/amtf.mp3',
      face: 'image/fo/81.png',
      desc:'狗年生人，若能虔诚佩戴或供奉阿弥陀佛之本命佛法像，则一生顺利，逢凶化吉。'
    },{
      id: 12,
      name: '阿弥陀佛',
      xiang: '猪',
      music: 'http://music.zhongfox.com/amtf.mp3',
      face: 'image/fo/81.png',
      desc:'猪年生人，若能虔诚佩戴或供奉阿弥陀佛之本命佛法像，则一生顺利，逢凶化吉。'
    }];


    return {
      all: function() {
        return chats;
      },
      remove: function(chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function(chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      },
      getsome: function(chatIds) {
        var grouplist=[];
        var chatids=chatIds.split(",");
        for (var i = 0; i < chats.length; i++){
               for(var j in chatids){
                    if(parseInt(chatids[j])==chats[i].id){
                        grouplist[i]=chats[i];
                    }
                }
        }
        return grouplist;
      },
      getrepet: function(chatIds) {
        var grouplist=[];
        for (var i = 0; i < chats.length; i++){
               for(var j = 0; j < chatIds.length; j++){
                    if(parseInt(chatIds[j])==chats[i].id){
                        grouplist[i]=chats[i];
                    }
                }
        }
        return grouplist;
      }

    };
  }])
