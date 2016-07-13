angular.module('fo.filter', [])
	.filter('to_trusted', ['$sce', function ($sce) {
		return function (text) {
		    return $sce.trustAsHtml(text);
		};
	}])
	.filter('to_url', ['$sce', function ($sce) {
		return function (text) {
		    return $sce.trustAsResourceUrl(text);
		};
	}])