'use strict'

moduleCommon.controller('homeController', ['$scope', '$location', 'toolService',
    function ($scope, $location, toolService) {

        $scope.ruta = $location.path();

        $scope.isActive = toolService.isActive;
    }]);