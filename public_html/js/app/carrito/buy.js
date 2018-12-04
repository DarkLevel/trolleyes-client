/* global moduleCarrito */

'use strict';

moduleCarrito.controller('carritoBuyController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.botones = true;
        $scope.correcto = false;
        $scope.alerta = false;

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