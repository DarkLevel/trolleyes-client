'use strict'

moduleTipousuario.controller('tipousuarioEditController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        $scope.id = $routeParams.id;
        $scope.ruta = $location.path();
        $scope.var1 = "Hola mundo";
        $scope.var2 = "Hola qué tal";
        $scope.mostrar = false;
        $scope.activar = true;
        $scope.ajaxData = "";
        $scope.toggle = function () {
            $scope.mostrar = !$scope.mostrar;
        }
        $scope.enable = function () {
            $scope.activar = !$scope.activar;
        }
        $scope.usuarios = function () {
            $http({
                method: 'GET',
                //withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=getpage&rpp=10&page=1'
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataUsuarios = response.data.message;
            }, function (response) {
                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        }
        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=2'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
        }, function (response) {
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
        $scope.isActive = toolService.isActive;

    }]);