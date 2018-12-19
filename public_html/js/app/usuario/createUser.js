/* global moduleUsuario */

'use strict';

moduleUsuario.controller('usuarioCreateUserController', ['$scope', '$http', 'toolService', '$anchorScroll',
    function ($scope, $http, toolService, $anchorScroll) {
        $anchorScroll();
        
        $scope.formulario = true;
        $scope.botones = true;
        $scope.correcto = false;

        $scope.crear = function () {
            var json = {
                dni: $scope.dni,
                nombre: $scope.nombre,
                ape1: $scope.ape1,
                ape2: $scope.ape2,
                login: $scope.login,
                pass: forge_sha256($scope.pass)
            };
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=createuser',
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

        $scope.volver = function () {
            window.history.back();
        };

        $scope.isActive = toolService.isActive;
    }
]);