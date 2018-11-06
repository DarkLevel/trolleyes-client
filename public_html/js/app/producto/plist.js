/* global moduleProducto */

'use strict';

moduleProducto.controller('productoPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        $scope.totalPages = 1;
        if (!$routeParams.rpp) {
            $scope.rpp = 10;
        } else {
            $scope.rpp = $routeParams.rpp;
        }
        if (!$routeParams.page) {
            $scope.page = 1;
        } else {
            if ($routeParams.page >= 1) {
                $scope.page = $routeParams.page;
            } else {
                $scope.page = 1;
            }
        }
        if (!$routeParams.column) {
            $scope.column = 'id';
        } else {
            $scope.column = $routeParams.column;
        }
        if (!$routeParams.order) {
            $scope.order = 'asc';
        } else {
            $scope.order = $routeParams.order;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataNumero = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataNumero / $scope.rpp);
            $scope.list = [];
            neighbourhood();
//            for (var i = 1; i <= $scope.totalPages; i++) {
//                $scope.list.push(i);
//            }
        }, function (response) {
            $scope.ajaxDataNumero = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page + '&column=' + $scope.column + '&order=' + $scope.order
        }).then(function (response) {
            $location.url('producto/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.column + '/' + $scope.order);
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
        }, function (response) {
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $scope.cambiarRegistros = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp=' + $scope.rpp + '&page=1&column=id&order=asc'
            }).then(function (response) {
                $location.url('producto/plist/' + $scope.rpp + '/1/id/asc');
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
            }, function (response) {
                $scope.ajaxData = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };

        $scope.ordenar = function (column, order) {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp=' + $scope.rpp + '&page=1&column=' + column + '&order=' + order
            }).then(function (response) {
                $location.url('producto/plist/' + $scope.rpp + '/1/' + column + '/' + order);
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
            }, function (response) {
                $scope.ajaxData = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };

        function neighbourhood() {
            $scope.pActual = Math.ceil($scope.page);
            for (var i = 1; i <= $scope.totalPages; i++) {
                if ((i >= $scope.pActual-1) && (i <= $scope.pActual+1)){
                    $scope.list.push(i);
                } else if ((i === $scope.pActual-2) || (i === $scope.pActual+2)){
                    $scope.list.push("...");
                }
            }
        }

        $scope.isActive = toolService.isActive;
    }]);