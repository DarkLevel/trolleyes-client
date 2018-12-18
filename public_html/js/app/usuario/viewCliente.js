/* global moduleUsuario */

'use strict';

moduleUsuario.controller('usuarioViewClienteController', ['$scope', '$http', 'toolService', '$routeParams', '$anchorScroll', 'sessionService',
    function ($scope, $http, toolService, $routeParams, $anchorScroll, oSessionService) {
        $anchorScroll();
        
        if (!$routeParams.id) {
            $scope.id = oSessionService.getId();
        } else {
            $scope.id = $routeParams.id;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
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