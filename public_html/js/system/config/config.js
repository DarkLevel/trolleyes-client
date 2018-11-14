'use strict';

trolleyes.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }]);
trolleyes.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    }]);