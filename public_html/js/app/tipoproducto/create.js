/* global moduleTipoproducto */

'use strict';

moduleTipoproducto.controller('tipoproductoCreateController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.formulario = true;
        $scope.botones = true;
        $scope.correcto = false;

        $scope.volver = function () {
            window.history.back();
        };

        $scope.crear = function () {
            var json = {
                desc: $scope.desc
            };
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
                if ($scope.status === 200) {
                    $scope.formulario = false;
                    $scope.botones = false;
                    $scope.correcto = true;
                }
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        };

        $scope.isActive = toolService.isActive;
    }
]);