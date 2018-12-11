/* global moduleCarrito */

'use strict';

moduleCarrito.controller('carritoBuyController', ['$scope', '$http', '$location', 'countCarritoService',
    function ($scope, $http, $location, countCarritoService) {
        $scope.botones = true;
        $scope.correcto = false;
        $scope.alerta = false;

        $scope.buy = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=buy'
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxData = response.data.message;
                if ($scope.status === 200) {
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=empty'
                    }).then(function (response) {
                        $scope.status = response.data.status;
                        $scope.ajaxDataEmpty = response.data.message;
                        countCarritoService.updateCarrito();
                    }, function (response) {
                        $scope.status = response.status;
                        $scope.ajaxDataEmpty = response.data.message || 'Request failed';
                    });
                    $scope.botones = false;
                    $scope.correcto = true;
                } else {
                    $scope.botones = false;
                    $scope.alerta = true;
                }
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        };

        $scope.atras = function () {
            window.history.back();
        };

        $scope.volver = function () {
            $location.url('producto/plistCliente');
        };
    }
]);