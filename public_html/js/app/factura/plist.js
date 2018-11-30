/* global moduleFactura */

'use strict';

moduleFactura.controller('facturaPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, $location, toolService, $routeParams, oSessionService) {
        $scope.totalPages = 1;
        $scope.registros = true;
        $scope.alerta = false;

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

        if (!$routeParams.id_user) {
            $scope.id_user = 1;
        } else {
            $scope.id_user = $routeParams.id_user;
        }

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
                    $location.url('home');
                }
            });
        };

        $scope.resetOrder = function () {
            $location.url('usuario/' + $scope.id_user + '/factura/plist/' + $scope.rpp + '/' + $scope.page);
        };

        $scope.crear = function () {
            $location.url('usuario/' + $scope.id_user + '/factura/create');
        };

        $scope.ordenar = function (order, align) {
            if ($scope.orderURLServidor === "") {
                $scope.orderURLServidor = "&order=" + order + "," + align;
                $scope.orderURLCliente = order + "," + align;
            } else {
                $scope.orderURLServidor = $scope.orderURLServidor + "-" + order + "," + align;
                $scope.orderURLCliente = $scope.orderURLCliente + "-" + order + "," + align;
            }
            $location.url('usuario/' + $scope.id_user + '/factura/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.orderURLCliente);
        };

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=factura&op=getcountX&id_user=' + $scope.id_user
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataNumber = response.data.message;
            if ($scope.ajaxDataNumber == 0) {
                $scope.registros = false;
                $scope.alerta = true;
            }
            $scope.totalPages = Math.ceil($scope.ajaxDataNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
            }
            pagination();
        }, function (response) {
            $scope.ajaxDataNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=factura&op=getpageX&id_user=' + $scope.id_user + '&rpp=' + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
            for (var i = 0; i < $scope.ajaxData.length; i++) {
                $scope.ajaxData[i].fecha = formatDate($scope.ajaxData[i].fecha);
            }
            $scope.username = $scope.ajaxData[0].obj_usuario.login;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });

        $scope.update = function () {
            $location.url('usuario/' + $scope.id_user + '/factura/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.orderURLCliente);
        };

        function pagination() {
            $scope.list = [];
            $scope.valorNeighbourhood = 1;
            $scope.prev_1 = ($scope.page - $scope.valorNeighbourhood);
            $scope.prev_2 = ($scope.page - $scope.valorNeighbourhood - 1);
            $scope.post_1 = ($scope.page - -$scope.valorNeighbourhood);
            $scope.post_2 = ($scope.page - -$scope.valorNeighbourhood + 1);

            for (var i = 2; i <= $scope.totalPages - 1; i++) {
                if (i >= $scope.prev_1 && i <= $scope.post_1) {
                    $scope.list.push(i);
                } else if (i === $scope.prev_2 || i === $scope.post_2) {
                    $scope.list.push("...");
                }
            }
        }

        $scope.atras = function () {
            $location.url('usuario/plist');
        };

        function formatDate(fecha) {
            var fechaCambiada = fecha.replace(', ', ' ');
            var fechaSeparada = fechaCambiada.split(" ");
            var horaSeparada = fechaSeparada[3].split(":");

            var dia = fechaSeparada[1];
            var mes;
            var anyo = fechaSeparada[2];
            var hora;
            var minuto = horaSeparada[1];
            var segundo  = horaSeparada[2];

            switch (fechaSeparada[0]) {
                case "Ene":
                    mes = "1";
                    break;
                case "Feb":
                    mes = "2";
                    break;
                case "Mar":
                    mes = "3";
                    break;
                case "Abr":
                    mes = "4";
                    break;
                case "May":
                    mes = "5";
                    break;
                case "Jun":
                    mes = "6";
                    break;
                case "Jul":
                    mes = "7";
                    break;
                case "Ago":
                    mes = "8";
                    break;
                case "Sep":
                    mes = "9";
                    break;
                case "Oct":
                    mes = "10";
                    break;
                case "Nov":
                    mes = "11";
                    break;
                case "Dic":
                    mes = "12";
                    break;
            }

            if (fechaSeparada[4] === "AM") {
                if (horaSeparada[0] === "12") {
                    hora = "0";
                } else {
                    hora = horaSeparada[0];
                }
            } else {
                hora = horaSeparada[0];
            }

            var fechaFinal = dia + '/' + mes + '/' + anyo + ' ' + hora + ':' + minuto + ':' + segundo;
            return fechaFinal;
        }
        ;

        $scope.isActive = toolService.isActive;
    }
]);