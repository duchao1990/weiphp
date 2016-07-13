/**
*  Module
*
* Description
*/
angular.module('fo.Dir', [])
 .directive('repeatDone', function () {
   return function (scope, element, attrs) {
     if (scope.$last) { // all are rendered
       scope.$eval(attrs.repeatDone);
     }
   }
})
.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function() {
                scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = value;
                });
            });

            // scope.$on('$ionicView.beforeLeave', function() {
            //     $rootScope.hideTabs = false;
            // });
        }
    };
})


.directive("progressBar", ["$document", "$interval", "$rootScope","$cordovaToast",
    function($document, $interval, $rootScope,$cordovaToast) {
    return {
      restrict: "AE",
      replace: !0,
      scope: {
        player: "=",
        audio: "="
      },
      templateUrl: "html/say/progress.html",
      link: function(scope) {
          scope.surplusBar = function() {
            // if (scope.audio.error!==null) {
            //   $cordovaToast.showShortCenter('音乐加载有误..');
            // }
            if (!isNaN(scope.audio.duration)) {
              var min = parseInt(scope.audio.duration /60),second = parseInt(scope.audio.duration % 60);
              if(second<10) second = "0" + second;
              scope.allTime = min + ":" + second;
              var surplus = scope.audio.currentTime, surplusMin = parseInt(surplus / 60), surplusSecond = parseInt(surplus % 60);
              10 > surplusSecond && (surplusSecond = "0" + surplusSecond), scope.playTime = surplusMin + ":" + surplusSecond;
              var progressValue = (scope.audio.currentTime / scope.audio.duration)*100;
              scope.surplusWidth = "width:" + parseInt(progressValue) + "%"
            }
          },
          scope.bufferBar = function() {
            bufferTimer = $interval(function() {
                var bufferIndex = scope.audio.buffered.length;
                if (bufferIndex > 0 && void 0 != scope.audio.buffered) {
                  var bufferValue = scope.audio.buffered.end(bufferIndex - 1) / scope.audio.duration * 1e3;
                  scope.bufferWidth = "width:" + parseInt(bufferValue) + "px",
                  Math.abs(scope.audio.duration - scope.audio.buffered.end(bufferIndex - 1)) < 1 && (scope.bufferWidth = "width: 1000px", clearInterval(bufferTimer))
                }
              },
              1e3)
          },
          scope.audio.addEventListener("timeupdate",
            function() {
              scope.$apply(scope.surplusBar())
            }),
          scope.audio.addEventListener("canplay",
            function() {
              scope.$apply(scope.bufferBar())
            })

      }
    }
  }])
.directive('standardTimeMeridian', function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                etime: '=etime'
            },
            template: "<strong>{{stime}}</strong>",
            link: function (scope, elem, attrs) {

                scope.stime = epochParser(scope.etime, 'time');

                function prependZero(param) {
                    if (String(param).length < 2) {
                        return "0" + String(param);
                    }
                    return param;
                }

                function epochParser(val, opType) {
                    if (val === null) {
                        return "00:00";
                    } else {
                        var meridian = ['AM', 'PM'];

                        if (opType === 'time') {
                            var hours = parseInt(val / 3600);
                            var minutes = (val / 60) % 60;
                            var hoursRes = hours > 12 ? (hours - 12) : hours;

                            var currentMeridian = meridian[parseInt(hours / 12)];

                            return (prependZero(hoursRes) + ":" + prependZero(minutes) + " " + currentMeridian);
                        }
                    }
                }

                scope.$watch('etime', function (newValue, oldValue) {
                    scope.stime = epochParser(scope.etime, 'time');
                });

            }
        };
    })