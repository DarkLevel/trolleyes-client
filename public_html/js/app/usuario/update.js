/* global moduleUsuario */

'use strict';

moduleUsuario.controller('usuarioUpdateController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.botones = true;
        $scope.correcto = false;
        $scope.formulario = true;

        if (!$routeParams.id) {
            $scope.id = 1;
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
            
            var id_tipousuario = response.data.message.obj_tipoUsuario.id;
            var desc_tipousuario = response.data.message.obj_tipoUsuario.desc;
            $scope.obj_tipoUsuario = {id: id_tipousuario, desc: desc_tipousuario};
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
                id_tipoUsuario: $scope.obj_tipoUsuario.id
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
        
        $scope.tipoUsuarioRefresh = function (f, consultar) {
            var form = f;
            if ($scope.obj_tipoUsuario.id != null) {
                if (consultar) {
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=' + $scope.obj_tipoUsuario.id
                    }).then(function (response) {
                        $scope.obj_tipoUsuario = response.data.message;
                        form.form.obj_tipoUsuario.$setValidity('valid', true);
                    }, function (response) {
                        form.form.obj_tipoUsuario.$setValidity('valid', false);
                    });
                } else {
                    form.form.obj_tipoUsuario.$setValidity('valid', true);
                }
            } else {
                $scope.obj_tipoUsuario.desc = "";
            }
        };

        $scope.isActive = toolService.isActive;
    }
]);