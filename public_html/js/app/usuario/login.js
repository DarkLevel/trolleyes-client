/* global moduleUsuario */

'use strict';

moduleUsuario.controller('usuarioLoginController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.botones = true;
        $scope.alerta = false;
        $scope.login = "";
        $scope.pass = "";

        $scope.volverPrincipio = function () {
            $location.url('/');
        };

        $scope.iniciarSesion = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=login&user=' + $scope.login + '&pass=' + $scope.pass
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
                oSessionService.setSessionActive;
                $scope.botones = false;
                $scope.alerta = true;
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        };
        $scope.isActive = toolService.isActive;
    }
]);