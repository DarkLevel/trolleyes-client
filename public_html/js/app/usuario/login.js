/* global moduleUsuario */

'use strict';

moduleUsuario.controller('usuarioLoginController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.botones = true;
        $scope.alerta = false;
        $scope.login = "";
        $scope.pass = "";

        $scope.volverPrincipio = function () {
            $location.url('/');
        };

        $scope.iniciarSesion = function () {
            
            var login = $scope.login;
            var pass = forge_sha256($scope.pass);
            
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=login&user=' + login + '&pass=' + pass
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
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