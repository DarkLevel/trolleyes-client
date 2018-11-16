/* global moduleTipoproducto */

'use strict';

moduleTipoproducto.controller('tipoproductoViewController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }
        
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

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });

        $scope.volver = function () {
            window.history.back();
        };

        $scope.isActive = toolService.isActive;
    }
]);