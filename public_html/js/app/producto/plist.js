'use strict'

moduleProducto.controller('productoPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        $scope.pagina = "1";
        $scope.registrosPagina = "5";
        $scope.mostrar = false;
        $scope.activar = true;

        $scope.tabla = function () {
            $scope.pagina = "1";
            $http({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp=" + $scope.registrosPagina + "&page=" + $scope.pagina
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
            }, function (response) {
                $scope.ajaxData = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
            $http({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:8081/trolleyes/json?ob=producto&op=getcount"
            }).then(function (response) {
                $scope.status = response.status;
                $scope.numeroRegistros = response.data.message;
                $scope.numeroPaginas = Math.ceil($scope.numeroRegistros / $scope.registrosPagina);
                $scope.arrayPages = [];
                for (var i = 1; i <= $scope.numeroPaginas; i++) {
                    $scope.arrayPages.push(i);
                }
                if (!$scope.mostrar) {
                    $scope.mostrar = !$scope.mostrar;
                }
                if ($scope.activar) {
                    $scope.activar = !$scope.activar;
                }
            }, function (response) {
                $scope.numeroRegistros = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.elegirPagina = function () {
            $http({
                method: 'GET',
                withCredentials: true,
                url: "http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp=" + $scope.registrosPagina + "&page=" + $scope.pagina
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
            }, function (response) {
                $scope.ajaxData = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.limpiarTabla = function () {
            $scope.pagina = "1";
            $scope.registrosPagina = "5";
            if ($scope.mostrar) {
                $scope.mostrar = !$scope.mostrar;
            }
            if (!$scope.activar) {
                $scope.activar = !$scope.activar;
            }
        };
        $scope.isActive = toolService.isActive;
    }]);