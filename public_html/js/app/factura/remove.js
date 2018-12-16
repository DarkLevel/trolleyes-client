/* global moduleFactura */

'use strict';

moduleFactura.controller('facturaRemoveController', ['$scope', '$http', 'toolService', '$routeParams', '$anchorScroll',
    function ($scope, $http, toolService, $routeParams, $anchorScroll) {
        $anchorScroll();
        
        $scope.botones = true;
        $scope.alerta = false;
        $scope.formulario = true;
        
        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=factura&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
            $scope.ajaxData.fecha = formatDate($scope.ajaxData.fecha);
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });

        $scope.volver = function () {
            window.history.back();
        };

        $scope.borrar = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=factura&op=remove&id=' + $scope.id
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
                $scope.formulario = false;
                $scope.botones = false;
                $scope.alerta = true;
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message || 'Request failed';
            });            
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
            var segundo = horaSeparada[2];

            switch (fechaSeparada[0]) {
                case "Jan":
                    mes = "1";
                    break;
                case "Feb":
                    mes = "2";
                    break;
                case "Mar":
                    mes = "3";
                    break;
                case "Apr":
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
                case "Aug":
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
                case "Dec":
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
                if (horaSeparada[0] === "12") {
                    horaSeparada[0] = "0";
                }
                var horaAm = parseInt(horaSeparada[0]);
                hora = horaAm + 12;
            }

            var fechaFinal = dia + '/' + mes + '/' + anyo + ' ' + hora + ':' + minuto + ':' + segundo;
            return fechaFinal;
        }

        $scope.isActive = toolService.isActive;
    }
]);