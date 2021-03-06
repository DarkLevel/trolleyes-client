/* global moduleUsuario */

'use strict';

moduleUsuario.controller('usuarioLoginController', ['$scope', '$http', '$location', 'sessionService', '$anchorScroll',
    function ($scope, $http, $location, oSessionService, $anchorScroll) {
        $anchorScroll();

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
                $scope.message = response.data.message;
                if ($scope.status === 200) {
                    $scope.nombreUsuario = response.data.message.login;
                    $scope.idUsuario = response.data.message.id;
                    $scope.idTipoUsuario = response.data.message.obj_tipoUsuario.id;
                    oSessionService.setSessionActive();
                    oSessionService.setUserName($scope.nombreUsuario);
                    oSessionService.setId($scope.idUsuario);
                    if ($scope.idTipoUsuario === 1) {
                        oSessionService.setAdminActive();
                        oSessionService.setClientInactive();
                    }
                    if ($scope.idTipoUsuario === 2) {
                        oSessionService.setAdminInactive();
                        oSessionService.setClientActive();
                    }
                    $scope.formulario = false;
                    $scope.incorrecto = false;
                    $scope.correcto = true;
                }
                if ($scope.status === 401) {
                    oSessionService.setSessionInactive();
                    oSessionService.setAdminInactive();
                    oSessionService.setClientActive();
                    $scope.incorrecto = true;
                }
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        };

    }
]);