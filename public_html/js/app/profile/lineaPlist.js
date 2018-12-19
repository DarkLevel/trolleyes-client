/* global moduleLinea */

'use strict';

moduleLinea.controller('lineaPlistUserController', ['$scope', '$http', '$location', 'toolService', '$routeParams', '$anchorScroll',
    function ($scope, $http, $location, toolService, $routeParams, $anchorScroll) {
        $anchorScroll();

        $scope.totalPages = 1;
        $scope.registros = true;
        $scope.alerta = false;

        if (!$routeParams.order) {
            $scope.orderURLServidor = "";
            $scope.orderURLCliente = "";
        } else {
            $scope.orderURLServidor = "&order=" + $routeParams.order;
            $scope.orderURLCliente = $routeParams.order;
        }

        if (!$routeParams.rpp) {
            $scope.rpp = "5";
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

        if (!$routeParams.id_factura) {
            $scope.id_factura = 1;
        } else {
            $scope.id_factura = $routeParams.id_factura;
        }

        $scope.resetOrder = function () {
            $location.url('profile/factura/' + $scope.id_factura + '/linea/plist/' + $scope.rpp + '/' + $scope.page);
        };

        $scope.crear = function () {
            $location.url('profile/factura/' + $scope.id_factura + '/linea/create');
        };

        $scope.ordenar = function (order, align) {
            if ($scope.orderURLServidor === "") {
                $scope.orderURLServidor = "&order=" + order + "," + align;
                $scope.orderURLCliente = order + "," + align;
            } else {
                $scope.orderURLServidor = $scope.orderURLServidor + "-" + order + "," + align;
                $scope.orderURLCliente = $scope.orderURLCliente + "-" + order + "," + align;
            }
            $location.url('profile/factura/' + $scope.id_factura + '/linea/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.orderURLCliente);
        };

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=linea&op=getcountlineauser&id_fact=' + $scope.id_factura
        }).then(function (response) {
            $scope.statusNumber = response.data.status;
            $scope.ajaxDataNumber = response.data.message;
            if ($scope.statusNumber === 200) {
                if ($scope.ajaxDataNumber === 0) {
                    $scope.registros = false;
                    $scope.alerta = true;
                }
            } else {
                $location.url('profile/factura/plist');
            }
            $scope.totalPages = Math.ceil($scope.ajaxDataNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
            }
            pagination();
        }, function (response) {
            $scope.ajaxDataNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=linea&op=getpagelineauser&id_fact=' + $scope.id_factura + '&rpp=' + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor
        }).then(function (response) {
            $scope.status = response.data.status;
            $scope.ajaxData = response.data.message;
            if ($scope.status === 200) {
                if ($scope.ajaxData.length === 0) {
                    $scope.page = 1;
                    $location.url('profile/factura/' + $scope.id_factura + '/linea/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.orderURLCliente);
                }
            } else {
                $location.url('profile/factura/plist');
            }
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });

        $scope.update = function () {
            $scope.page = 1;
            $location.url('profile/factura/' + $scope.id_factura + '/linea/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.orderURLCliente);
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

        $scope.atras = function () {
            $location.url('profile/factura/plist');
        };

        $scope.isActive = toolService.isActive;
    }
]);