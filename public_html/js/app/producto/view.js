/* global moduleProducto */

'use strict';

moduleProducto.controller('productoViewController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=get&id=' + $scope.id
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