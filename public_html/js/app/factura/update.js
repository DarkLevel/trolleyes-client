/* global moduleFactura */

'use strict';

moduleFactura.controller('facturaUpdateController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        $scope.botones = true;
        $scope.alerta = false;

        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=factura&op=get&id=' + $routeParams.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.id = response.data.message.id;
            $scope.fecha = response.data.message.fecha;
            $scope.iva = response.data.message.iva;
            $scope.id_usuario = response.data.message.obj_usuario.id;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });

        $scope.volver = function () {
            window.history.back();
        };

        $scope.editar = function () {
            var json = {
                id: $scope.id,
                fecha: $scope.fecha,
                iva: $scope.iva,
                id_usuario: $scope.id_usuario
            };
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=factura&op=update',
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