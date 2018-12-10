/* global moduleUsuario */

'use strict';

moduleUsuario.controller('usuarioLoginController', ['$scope', '$http', '$location', 'sessionService',
    function ($scope, $http, $location, oSessionService) {
        $scope.formulario = true;
        $scope.correcto = false;
        $scope.incorrecto = false;

        $scope.volverPrincipio = function () {
            $location.url('home');
        };

        $scope.iniciarSesion = function () {
            var login = $scope.login;
            var pass = forge_sha256($scope.pass);
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=login&user=' + login + '&pass=' + pass
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.nombreUsuario = response.data.message.login;
                $scope.idUsuario = response.data.message.id;
                if ($scope.status === 200) {
                    oSessionService.setSessionActive();
                    oSessionService.setUserName($scope.nombreUsuario);
                    oSessionService.setId($scope.idUsuario);
                    $scope.formulario = false;
                    $scope.incorrecto = false;
                    $scope.correcto = true;
                }
                if ($scope.status === 401) {
                    $scope.incorrecto = true;
                }
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        };

    }
]);