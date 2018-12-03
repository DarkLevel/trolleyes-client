/* global moduleCarrito */

'use strict';

moduleCarrito.controller('carritoPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.registros = true;
        $scope.alerta = false;
        $scope.comprar = false;

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

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=show'
        }).then(function (response) {
            $scope.status = response.data.status;
            $scope.ajaxData = response.data.message;
            if ($scope.ajaxData === null) {
                $scope.registros = false;
                $scope.alerta = true;
            } else{
                for(var i=0; i<$scope.ajaxData.length; i++){
                    if($scope.ajaxData[i].cantidad > $scope.ajaxData[i].obj_producto.existencias){
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
                $scope.ajaxDataAdd = response.data.message;
                if ($scope.status === 200){
                    window.location.reload();
                }
            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataAdd = response.data.message || 'Request failed';
            });
        };
        
        $scope.reduce = function (id_producto) {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=reduce&id=' + id_producto + '&cant=' + 1
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataReduce = response.data.message;
                if ($scope.status === 200){
                    window.location.reload();
                }
            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataReduce = response.data.message || 'Request failed';
            });
        };
        
        $scope.remove = function (id_producto) {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=remove&id=' + id_producto
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataremove = response.data.message;
                if ($scope.status === 200){
                    window.location.reload();
                }
            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataremove = response.data.message || 'Request failed';
            });
        };
        
        $scope.empty = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=empty'
            }).then(function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataEmpty = response.data.message;
                if ($scope.status === 200){
                    window.location.reload();
                }
            }, function (response) {
                $scope.status = response.data.status;
                $scope.ajaxDataEmpty = response.data.message || 'Request failed';
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