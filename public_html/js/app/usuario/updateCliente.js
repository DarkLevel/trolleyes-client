/* global moduleUsuario */

'use strict';

moduleUsuario.controller('usuarioUpdateClienteController', ['$scope', '$http', 'toolService', '$routeParams', '$anchorScroll', 'sessionService',
    function ($scope, $http, toolService, $routeParams, $anchorScroll, oSessionService) {
        $anchorScroll();
        
        $scope.botones = true;
        $scope.correcto = false;
        $scope.formulario = true;

        if (!$routeParams.id) {
            $scope.id = oSessionService.getId();
        } else {
            $scope.id = $routeParams.id;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=get&id=' + $routeParams.id
        }).then(function (response) {
            $scope.ajaxDataUsuario = response.data.message;
            $scope.status = response.status;
            $scope.id = response.data.message.id;
            $scope.dni = response.data.message.dni;
            $scope.nombre = response.data.message.nombre;
            $scope.ape1 = response.data.message.ape1;
            $scope.ape2 = response.data.message.ape2;
            $scope.login = response.data.message.login;
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
                dni: $scope.dni,
                nombre: $scope.nombre,
                ape1: $scope.ape1,
                ape2: $scope.ape2,
                login: $scope.login,
                id_tipoUsuario: 2
            };
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
                if ($scope.status === 200) {
                    $scope.botones = false;
                    $scope.correcto = true;
                    $scope.formulario = false;
                }
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });
        };

        $scope.isActive = toolService.isActive;
    }
]);