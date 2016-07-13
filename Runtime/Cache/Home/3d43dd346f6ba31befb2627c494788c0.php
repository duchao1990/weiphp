<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
        <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval';media-src *">
    <title></title>

    <link href="Html/lib/ionic/css/ionic.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="Html/lib/ionic-tabslidebox/tabSlideBox.css">
    <link href="Html/css/style.css" rel="stylesheet">
    <link href="Html/css/iconfont.css" rel="stylesheet">
    <link href="Html/lib/angular-chart/dist/angular-chart.css" rel="stylesheet">
    <link href="Html/lib/ion_bottomSheet/ng_bottomSheet.css" rel="stylesheet">
    <link href="Html/lib/ionic-toast/dist/style.css" rel="stylesheet">
    <!-- IF using Sass (run gulp sass first), then uncomment below and remove the CSS includes above
    <link href="css/ionic.app.css" rel="stylesheet">
    -->

    <!-- ionic/angularjs js -->
    <script src="Html/lib/ionic/js/ionic.bundle.min.js"></script>
    <script src="Html/lib/angular-chart/dist/chart.js"></script>
    <script src="Html/lib/ionic-tabslidebox/tabSlideBox.js"></script>
    <script src="Html/lib/ionic-timepicker/dist/ionic-timepicker.bundle.min.js"></script>
    <script src="Html/lib/ion_bottomSheet/bottomSheet.js"></script>
    <script src="Html/lib/ionic-toast/dist/ionic-toast.js"></script>
    <script src="Html/lib/moment/moment.min.js"></script>
    <!-- rounded progrssbar for timer on player -->
    <script src="Html/lib/angular-svg-round-progressbar/roundProgress.min.js"></script>
    <script src="Html/lib/ionic/js/angular/angular-resource.min.js"></script>
    <script src="Html/lib/angular-chart/dist/angular-chart.min.js"></script>
    <!-- cordova script (this will be a 404 during development) -->
    <!-- your app's js -->
    <script src="Html/js/app.js"></script>
    <script src="Html/js/controllers.js"></script>
    <script src="Html/js/services.js"></script>
    <script src="Html/js/data.js"></script>
    <script src="Html/js/directive.js"></script>
    <script src="Html/js/ios9.js"></script>
    <script src="Html/js/filter.js"></script>
    <script src="Html/js/chinaSdk.js"></script>
  </head>
  <body ng-app="fo">
    <!--
      The nav bar that will be updated as we navigate between views.
    -->
    <ion-nav-bar class="bar-energized">
      <ion-nav-back-button>
      </ion-nav-back-button>
    </ion-nav-bar>
    <!--
      The views will be rendered in the <ion-nav-view> directive below
      Templates are in the /templates folder (but you could also
      have templates inline in this html file if you'd like).
    -->
    <ion-nav-view></ion-nav-view>
  </body>
</html>