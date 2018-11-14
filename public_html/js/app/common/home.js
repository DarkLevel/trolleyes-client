/* global moduleCommon */

'use strict';

moduleCommon.controller('homeController', ['$scope', '$location', 'toolService', 'sessionService',
    function ($scope, $location, toolService, sessionService) {

        $scope.ruta = $location.path();

        $scope.isActive = toolService.isActive;
        
        $scope.isSessionActive = sessionService.isSessionActive;
    }]);