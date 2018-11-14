/* global moduleTipoproducto */

'use strict';

moduleTipoproducto.controller('tipoproductoUpdateController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        $scope.botones = true;
        $scope.alerta = false;

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=get&id=' + $routeParams.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.id = response.data.message.id;
            $scope.desc = response.data.message.desc;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });

        $scope.volver = function () {
            window.history.back();
        };

        $scope.editar = function () {
            var json = {
                id: $scope.id,
                desc: $scope.desc
            };
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=update',
                params: {json: JSON.stringify(json)}
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