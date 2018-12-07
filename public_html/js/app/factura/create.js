/* global moduleFactura */

'use strict';

moduleFactura.controller('facturaCreateController', [
    '$scope',
    '$http',
    '$location',
    'toolService',
    '$routeParams',
    'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.formulario = true;
        $scope.botones = true;
        $scope.alerta = false;
        $scope.id_usuario = $routeParams.id_user;

        $scope.crear = function () {
            var json = {
                fecha: $scope.fecha,
                iva: $scope.iva,
                id_usuario: $scope.id_usuario
            };
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=factura&op=create',
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
        
        $scope.volver = function () {
            window.history.back();
        };

        $scope.isActive = toolService.isActive;
    }
]);