/* global moduleTipousuario */

'use strict';

moduleTipousuario.controller('tipousuarioCreateController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.botones = true;
        $scope.correcto = false;
        $scope.comprobarDesc = false;
        
        $scope.sesionIniciada = false;
        if (oSessionService.isSessionActive()) {
            $scope.sesionIniciada = true;
            $scope.usuario = oSessionService.getUserName();
            $scope.id_sesion = oSessionService.getId();
        }

        $scope.logout = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
            }).then(function (response) {
                if (response.data.status === 200) {
                    oSessionService.setSessionInactive();
                    $scope.sesionIniciada = false;
                    $location.url('/');
                }
            });
        };

        $scope.volver = function () {
            window.history.back();
        };

        $scope.crear = function () {
            var regexDesc = /^[a-zA-Z\s]*$/;
            var testDesc = regexDesc.test($scope.desc);
            if (!testDesc) {
                $scope.comprobarDesc = true;
            } else {
                var json = {
                    desc: $scope.desc
                };
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=create',
                    params: {json: JSON.stringify(json)}
                }).then(function (response) {
                    $scope.status = response.status;
                    $scope.ajaxData = response.data.message;
                    $scope.botones = false;
                    $scope.comprobarDesc = false;
                    $scope.correcto = true;
                }, function (response) {
                    $scope.status = response.status;
                    $scope.ajaxData = response.data.message || 'Request failed';
                });
            }
        };

        $scope.isActive = toolService.isActive;
    }
]);