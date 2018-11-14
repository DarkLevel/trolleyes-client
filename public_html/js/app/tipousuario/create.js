/* global moduleTipousuario */

'use strict';

moduleTipousuario.controller('tipousuarioCreateController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        $scope.botones = true;
        $scope.alerta = false;

        $scope.volver = function () {
            window.history.back();
        };

        $scope.crear = function () {
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
                $scope.alerta = true;
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        };
        $scope.isActive = toolService.isActive;
    }
]);