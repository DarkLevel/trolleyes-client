/* global moduleCommon */

'use strict';

moduleCommon.controller('homeController', ['$scope', '$http', '$location', 'toolService', 'sessionService',
    function ($scope, $http, $location, toolService, oSessionService) {

        $scope.ruta = $location.path();

        $scope.isActive = toolService.isActive;

        $scope.sesionIniciada = false;
        if (oSessionService.isSessionActive()) {
            $scope.sesionIniciada = true;
            $scope.usuario = oSessionService.getUserName();
            $scope.id = oSessionService.getId();
        }

        $scope.logout = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
            }).then(function (response) {
                if (response.data.status == 200) {
                    oSessionService.setSessionInactive();
                    $scope.sesionIniciada = false;
                    $location.url('/');
                }
            });
        };

    }]);