/* global moduleProducto */

'use strict';

moduleProducto.controller('productoCreateController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.formulario = true;
        $scope.botones = true;
        $scope.alerta = false;
        $scope.obj_tipoProducto = {id: null, desc: null};

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

        $scope.volver = function () {
            window.history.back();
        };

        $scope.crear = function () {
            var json = {
                codigo: $scope.codigo,
                desc: $scope.desc,
                existencias: $scope.existencias,
                precio: $scope.precio.replace(',', '.'),
                foto: $scope.foto,
                id_tipoProducto: $scope.obj_tipoProducto.id
            };
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=producto&op=create',
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

        $scope.tipoProductoRefresh = function (f, consultar) {
            var form = f;
            if ($scope.obj_tipoProducto.id != null) {
                if (consultar) {
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=get&id=' + $scope.obj_tipoProducto.id
                    }).then(function (response) {
                        $scope.obj_tipoProducto = response.data.message;
                        form.form.obj_tipoProducto.$setValidity('valid', true);
                    }, function (response) {
                        form.form.obj_tipoProducto.$setValidity('valid', false);
                    });
                } else {
                    form.form.obj_tipoProducto.$setValidity('valid', true);
                }
            } else {
                $scope.obj_tipoProducto.desc = "";
            }
        };

        $scope.isActive = toolService.isActive;
    }
]);