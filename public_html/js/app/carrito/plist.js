/* global moduleCarrito */

'use strict';

moduleCarrito.controller('carritoPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.alerta = false;
        $scope.comprar = false;

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=show'
        }).then(function (response) {
            $scope.status = response.data.status;
            $scope.ajaxData = response.data.message;
            if ($scope.ajaxData === null) {
                $scope.alerta = true;
            } else {
                for (var i = 0; i < $scope.ajaxData.length; i++) {
                    if ($scope.ajaxData[i].cantidad > $scope.ajaxData[i].obj_producto.existencias) {
                        $scope.comprar = true;
                    }
                }
            }
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });

        $scope.add = function (id_producto) {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=add&id=' + id_producto + '&cant=' + 1
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message;
            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        };

        $scope.reduce = function (id_producto) {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=reduce&id=' + id_producto + '&cant=' + 1
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message;
                if ($scope.ajaxData === null) {
                    $scope.alerta = true;
                } else {
                    $scope.comprar = false;
                    for (var i = 0; i < $scope.ajaxData.length; i++) {
                        if ($scope.ajaxData[i].cantidad > $scope.ajaxData[i].obj_producto.existencias) {
                            $scope.comprar = true;
                        }
                    }
                }
            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        };

        $scope.remove = function (id_producto) {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=remove&id=' + id_producto
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message;
                if ($scope.ajaxData === null) {
                    $scope.alerta = true;
                } else {
                    $scope.comprar = false;
                    for (var i = 0; i < $scope.ajaxData.length; i++) {
                        if ($scope.ajaxData[i].cantidad > $scope.ajaxData[i].obj_producto.existencias) {
                            $scope.comprar = true;
                        }
                    }
                }
            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        };

        $scope.empty = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=empty'
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message;
                if ($scope.ajaxData === null) {
                    $scope.alerta = true;
                } else {
                    $scope.comprar = false;
                    for (var i = 0; i < $scope.ajaxData.length; i++) {
                        if ($scope.ajaxData[i].cantidad > $scope.ajaxData[i].obj_producto.existencias) {
                            $scope.comprar = true;
                        }
                    }
                }
            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        };

        $scope.buy = function () {
            $location.url('carrito/buy');
        };

        $scope.atras = function () {
            window.history.back();
        };
    }
]);