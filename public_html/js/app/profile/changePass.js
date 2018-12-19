/* global moduleUsuario */

'use strict';

moduleUsuario.controller('usuarioChangePassController', ['$scope', '$http', 'toolService', '$anchorScroll',
    function ($scope, $http, toolService, $anchorScroll) {
        $anchorScroll();

        $scope.formulario = true;
        $scope.botones = true;
        $scope.distintas = false;
        $scope.incorrecto = false;
        $scope.correcto = false;
        $scope.previousPass = false;

        $scope.crear = function () {
            var samePass = false;
            if ($scope.newPass1 === $scope.newPass2) {
                samePass = true;
            }
            if (samePass === true) {
                if ($scope.newPass1 !== $scope.oldPass) {
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=changepass&oldpass=' + forge_sha256($scope.oldPass) + "&newpass=" + forge_sha256($scope.newPass1)
                    }).then(function (response) {
                        $scope.status = response.data.status;
                        if ($scope.status === 200) {
                            $scope.formulario = false;
                            $scope.botones = false;
                            $scope.distintas = false;
                            $scope.incorrecto = false;
                            $scope.correcto = true;
                            $scope.previousPass = false;
                        } else {
                            $scope.distintas = false;
                            $scope.incorrecto = true;
                            $scope.correcto = false;
                            $scope.previousPass = false;
                        }
                    }, function (response) {
                        $scope.status = response.status;
                        $scope.ajaxData = response.data.message || 'Request failed';
                    });
                } else {
                    $scope.previousPass = true;
                }
            } else {
                $scope.distintas = true;
            }
        };

        $scope.volver = function () {
            window.history.back();
        };

        $scope.isActive = toolService.isActive;
    }
]);