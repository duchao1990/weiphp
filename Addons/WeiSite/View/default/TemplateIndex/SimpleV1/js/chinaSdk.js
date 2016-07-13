/**
* chinaSdk Module
*
* Description
*/
angular.module('chinaSdk', [])
.factory('ShareSer', ['$rootScope','$cordovaToast',function ($rootScope,$cordovaToast) {
	return {
	   	shareToFriends : function(surl,title, desc,imgurl) {
        // 创建消息体
		    Wechat.share({
		          message: {
		             title: title,
		             description: desc,
		             mediaTagName: "Media Tag Name(optional)",
		             thumb: imgurl,
		             media: {
		                type: Wechat.Type.WEBPAGE,   // webpage
		                webpageUrl: surl    // webpage
		             }
		         },
		         scene: Wechat.Scene.TIMELINE   // share to Timeline
		      }, function (succ) {
				$cordovaToast.showShortCenter(succ);
		      }, function (reason) {
		      });
		},

		   shareToWechat : function(surl,title, desc,imgurl) {
        // 创建消息体
		    Wechat.share({
		          message: {
		             title: title,
		             description: desc,
		             mediaTagName: "Media Tag Name(optional)",
		             thumb: imgurl,
		             media: {
		                type: Wechat.Type.WEBPAGE,   // webpage
		                webpageUrl: surl    // webpage
		             }
		         },
		         scene: Wechat.Scene.SESSION   // share to Timeline
		      }, function (succ) {
				$cordovaToast.showShortCenter(succ);
		      }, function (reason) {
		      });
			},
		shareToQQ : function(surl,title, desc,imgurl) {
        // 创建消息体
		      var args = {};
		            args.url = surl;
		            args.title = title;
		            args.description = desc;
		            args.imageUrl = imgurl;
		          args.appName = "天天佛";
		          YCQQ.shareToQQ(function () {
		            $cordovaToast.showShortCenter("分享成功");
		          }, function (failReason) {
		          }, args);
			},
		shareTozone : function( surl,title, desc,imgurl) {
        // 创建消息体
	            args.url = surl;
	            args.title = title;
	            args.description = desc;
	            args.imageUrl = imgurl;
              YCQQ.shareToQzone(function () {
                $cordovaToast.showShortCenter("分享成功");
              }, function (failReason) {
              }, args);
			},
		shareToWeibo: function(surl,title, desc,imgurl) {
        // 创建消息体
		    var args = {};
	            args.url = surl;
	            args.title = title;
	            args.description = desc;
	            args.imageUrl = imgurl;
	            args.defaultText = desc;
	            YCWeibo.shareToWeibo(function () {
	                $cordovaToast.showShortCenter("分享成功");
	             }, function (failReason) {
	             }, args);
          		}
	}
}])

