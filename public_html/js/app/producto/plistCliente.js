/* global moduleProducto */

'use strict';

moduleProducto.controller('productoPlistClienteController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.totalPages = 1;
        $scope.registros = true;
        $scope.alerta = false;
        $scope.cantidad = 0;

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
                    $location.url('home');
                }
            });
        };

        if (!$routeParams.order) {
            $scope.orderURLServidor = "";
            $scope.orderURLCliente = "";
            $scope.order = "producto.id,asc";
        } else {
            $scope.orderURLServidor = "&order=" + $routeParams.order;
            $scope.orderURLCliente = $routeParams.order;
            $scope.order = $routeParams.order;
        }

        if (!$routeParams.rpp) {
            $scope.rpp = "4";
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

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataNumber = response.data.message;
            if ($scope.ajaxDataNumber === 0) {
                $scope.registros = false;
                $scope.alerta = true;
            }
            $scope.totalPages = Math.ceil($scope.ajaxDataNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.update();
            }
            pagination();
        }, function (response) {
            $scope.ajaxDataNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
            for (var i = 0; i < $scope.ajaxData.length; i++) {
                $scope.ajaxData[i].precio = reemplazar($scope.ajaxData[i].precio);
            }
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });

        $scope.update = function () {
            $location.url(`producto/plistCliente/` + $scope.rpp + `/` + $scope.page + '/' + $scope.orderURLCliente);
        };

        $scope.ordenar = function () {
            $scope.orderURLServidor = "&order=" + $scope.order;
            $scope.orderURLCliente = $scope.order;
            $location.url('producto/plistCliente/' + $scope.rpp + '/' + $scope.page + '/' + $scope.orderURLCliente);
        };

        $scope.add = function (id_producto, cantidad) {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=add&id=' + id_producto + '&cant=' + cantidad
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataAdd = response.data.message;
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataAdd = response.data.message || 'Request failed';
            });
        };

        function pagination() {
            $scope.list = [];
            $scope.valorNeighbourhood = 1;
            $scope.prev_1 = ($scope.page - $scope.valorNeighbourhood);
            $scope.prev_2 = ($scope.page - $scope.valorNeighbourhood - 1);
            $scope.post_1 = ($scope.page - -$scope.valorNeighbourhood);
            $scope.post_2 = ($scope.page - -$scope.valorNeighbourhood + 1);

            for (var i = 2; i <= $scope.totalPages - 1; i++) {
                if (i >= $scope.prev_1 && i <= $scope.post_1) {
                    $scope.list.push(i);
                } else if (i === $scope.prev_2 || i === $scope.post_2) {
                    $scope.list.push("...");
                }
            }
        }

        function reemplazar(precio) {
            var precioString = precio.toString();
            var precioCambiado = precioString.replace(".", ",");

            return precioCambiado;
        }

        $scope.atras = function () {
            window.history.back();
        };

        $scope.isActive = toolService.isActive;
    }
]);