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
