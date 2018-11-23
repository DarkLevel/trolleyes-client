/* global moduleLinea */

'use strict';

moduleLinea.controller('lineaUpdateController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.formulario = true;
        $scope.botones = true;
        $scope.alerta = false;

        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }
        
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
            url: 'http://localhost:8081/trolleyes/json?ob=linea&op=get&id=' + $routeParams.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.id = response.data.message.id;
            $scope.cantidad = response.data.message.cantidad;
            $scope.id_factura = response.data.message.obj_factura.id;
            
            var id_producto = response.data.message.obj_producto.id;
            var codigo_producto = response.data.message.obj_producto.codigo;
            $scope.obj_producto = {id: id_producto, codigo: codigo_producto};
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
                cantidad: $scope.cantidad,
                id_producto: $scope.obj_producto.id,
                id_factura: $scope.id_factura
            };
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=linea&op=update',
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
        
        $scope.productoRefresh = function (f, consultar) {
            var form = f;
            if ($scope.obj_producto.id != null) {
                if (consultar) {
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8081/trolleyes/json?ob=producto&op=get&id=' + $scope.obj_producto.id
                    }).then(function (response) {
                        $scope.obj_producto = response.data.message;
                        form.form.obj_producto.$setValidity('valid', true);
                    }, function (response) {
                        form.form.obj_producto.$setValidity('valid', false);
                    });
                } else {
                    form.form.obj_producto.$setValidity('valid', true);
                }
            } else {
                $scope.obj_producto.desc = "";
            }
        };

        $scope.isActive = toolService.isActive;
    }
]);