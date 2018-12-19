/* global moduleUsuario */

'use strict';

moduleUsuario.controller('usuarioViewClienteController', ['$scope', '$http', 'toolService', '$anchorScroll',
    function ($scope, $http, toolService, $anchorScroll) {
        $anchorScroll();

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=getprofile'
        }).then(function (response) {
            $scope.status = response.data.status;
            $scope.ajaxData = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });
        
        $scope.volver = function () {
            window.history.back();
        };

        $scope.isActive = toolService.isActive;
    }
]);