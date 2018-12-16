/* global moduleTipousuario */

'use strict';

moduleTipousuario.controller('tipousuarioCreateController', ['$scope', '$http', 'toolService', '$anchorScroll',
    function ($scope, $http, toolService, $anchorScroll) {
        $anchorScroll();
        
        $scope.formulario = true;
        $scope.botones = true;
        $scope.correcto = false;

        $scope.volver = function () {
            window.history.back();
        };

        $scope.crear = function () {
            var regexDesc = /^[a-zA-Z\s]*$/;
            var testDesc = regexDesc.test($scope.desc);
            if (!testDesc) {
                $scope.comprobarDesc = true;
            } else {
                var json = {
                    desc: $scope.desc
                };
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=create',
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
            }
        };

        $scope.isActive = toolService.isActive;
    }
]);