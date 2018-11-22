/* global moduleUsuario */

'use strict';

moduleUsuario.controller('usuarioCreateController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.formulario = true;
        $scope.botones = true;
        $scope.correcto = false;
        $scope.obj_tipoUsuario = {"id":null, "desc": null};
        
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
                    $location.url('/');
                }
            });
        };

        $scope.crear = function () {
            var json = {
                dni: $scope.dni,
                nombre: $scope.nombre,
                ape1: $scope.ape1,
                ape2: $scope.ape2,
                login: $scope.login,
                pass: forge_sha256($scope.pass),
                id_tipoUsuario: $scope.obj_tipoUsuario.id
            };
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.data.status;
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

        $scope.tipoUsuarioRefresh = function (f, consultar) {
            var form = f;
            if (($scope.obj_tipoUsuario.id !== null) && ($scope.obj_tipoUsuario.id <= 10000)) {
                if (consultar) {
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=' + $scope.obj_tipoUsuario.id
                    }).then(function (response) {
                        $scope.obj_tipoUsuario = response.data.message;
                        form.form.obj_tipousuario.$setValidity('valid', true);
                    }, function (response) {
                        form.form.obj_tipousuario.$setValidity('valid', false);
                    });
                } else {
                    form.form.obj_tipousuario.$setValidity('valid', true);
                }
            } else {
                $scope.obj_tipoUsuario.desc = "";
            }
        };
        
        $scope.volver = function(){
            window.history.back();
        };

        $scope.isActive = toolService.isActive;
    }
]);