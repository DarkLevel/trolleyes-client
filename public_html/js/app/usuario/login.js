/* global moduleUsuario */

'use strict';

moduleUsuario.controller('usuarioLoginController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.botones = true;
        $scope.correcto = false;
        $scope.incorrecto = false;
        $scope.comprobarUsuario = false;
        $scope.comprobarPass = false;

        $scope.volverPrincipio = function () {
            $location.url('/');
        };

        $scope.iniciarSesion = function () {
            var regexUser = /^[a-zA-Z]*$/;
            var regexPass = /^[a-zA-Z]*$/;
            var testUser = regexUser.test($scope.login);
            var testPass = regexPass.test($scope.pass);
            
            if (!testUser) {
                $scope.comprobarUsuario = true;
            } else {
                $scope.comprobarUsuario = false;
            }
            if (!testPass) {
                $scope.comprobarPass = true;
            } else {
                $scope.comprobarPass = false;
            }
            
            if (testUser && testPass) {
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
                        $scope.botones = false;
                        $scope.incorrecto = false;
                        $scope.correcto = true;
                        oSessionService.setSessionActive();
                        oSessionService.setUserName($scope.nombreUsuario);
                        oSessionService.setId($scope.idUsuario);
                    }
                    if ($scope.status === 401) {
                        $scope.incorrecto = true;
                    }
                }, function (response) {
                    $scope.status = response.status;
                    $scope.ajaxData = response.data.message || 'Request failed';
                });
            }

        };

        $scope.isActive = toolService.isActive;
    }
]);