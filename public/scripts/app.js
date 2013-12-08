'use strict';

angular.module('ngApp', [
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/routes', {
                templateUrl: 'views/routes.html',
                controller: 'RoutesCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
