/* global moduleTipousuario */

'use strict';

moduleTipousuario.controller('tipousuarioPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.totalPages = 1;

        if (!$routeParams.order) {
            $scope.orderURLServidor = "";
            $scope.orderURLCliente = "";
        } else {
            $scope.orderURLServidor = "&order=" + $routeParams.order;
            $scope.orderURLCliente = $routeParams.order;
        }

        if (!$routeParams.rpp) {
            $scope.rpp = 5;
        } else {
            $scope.rpp = $routeParams.rpp;
        }

        if (!$routeParams.page) {
            $scope.page = 1;
        } else {
            if ($routeParams.page >= 1) {
                $scope.page = $routeParams.page;
            } else {
                $scope.page = 1;
            }
        }
        
        $scope.sesionIniciada = false;
        if (oSessionService.isSessionActive()) {
            $scope.sesionIniciada = true;
            $scope.usuario = oSessionService.getUserName();
            $scope.id = oSessionService.getId();
        }

        $scope.logout = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
            }).then(function (response) {
                if (response.data.status == 200) {
                    oSessionService.setSessionInactive();
                    $scope.sesionIniciada = false;
                    $location.url('/');
                }
            });
        };

        $scope.resetOrder = function () {
            $location.url(`tipousuario/plist/` + $scope.rpp + `/` + $scope.page);
        };
        
        $scope.crear = function () {
            $location.url('tipousuario/create');
        };

        $scope.ordenar = function (order, align) {
            if ($scope.orderURLServidor === "") {
                $scope.orderURLServidor = "&order=" + order + "," + align;
                $scope.orderURLCliente = order + "," + align;
            } else {
                $scope.orderURLServidor = $scope.orderURLServidor + "-" + order + "," + align;
                $scope.orderURLCliente = $scope.orderURLCliente + "-" + order + "," + align;
            }
            $location.url(`tipousuario/plist/` + $scope.rpp + `/` + $scope.page + `/` + $scope.orderURLCliente);
        };

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataNumber = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.update();
            }
            pagination();
        }, function (response) {
            $scope.ajaxDataNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });

        $scope.update = function () {
            $location.url(`tipousuario/plist/` + $scope.rpp + `/` + $scope.page + '/' + $scope.orderURLCliente);
        };

        function pagination() {
            $scope.list = [];
            $scope.valorNeighbourhood = 1;
            $scope.prev_1 = ($scope.page - $scope.valorNeighbourhood);
            $scope.prev_2 = ($scope.page - $scope.valorNeighbourhood-1);
            $scope.post_1 = ($scope.page - -$scope.valorNeighbourhood);
            $scope.post_2 = ($scope.page - -$scope.valorNeighbourhood+1);

            for (var i = 2; i <= $scope.totalPages-1; i++) {
                if (i >= $scope.prev_1 && i <= $scope.post_1) {
                    $scope.list.push(i);
                } else if (i === $scope.prev_2 || i === $scope.post_2) {
                    $scope.list.push("...");
                }
            }
        }
        
        $scope.sesionIniciada = false;
        if (oSessionService.isSessionActive()) {
            $scope.sesionIniciada = true;
            $scope.usuario = oSessionService.getUserName();
            $scope.id = oSessionService.getId();
        }

        $scope.isActive = toolService.isActive;
    }
]);