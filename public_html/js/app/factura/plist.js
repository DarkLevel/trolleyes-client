/* global moduleFactura */

'use strict';

moduleFactura.controller('facturaPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams', '$anchorScroll',
    function ($scope, $http, $location, toolService, $routeParams, $anchorScroll) {
        $anchorScroll();

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
            $scope.rpp = "5";
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
            if ($scope.ajaxDataNumber === 0) {
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
            if($scope.ajaxData === 0){
                $scope.page = 1;
                $location.url('usuario/' + $scope.id_user + '/factura/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.orderURLCliente);
            }
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });

        $scope.update = function () {
            $scope.page = 1;
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
        
        $scope.crearPDF = function (id) {
            var usuario;
            var fecha;
            var lineasTotales;
            var iva;
            var length = $scope.ajaxData.length;

            var doc = new jsPDF();
            for (var i = 0; i < length; i++) {
                if ($scope.ajaxData[i].id === id) {
                    usuario = $scope.ajaxData[i].obj_usuario.ape1 + ' ' + $scope.ajaxData[i].obj_usuario.ape2 + ', ' + $scope.ajaxData[i].obj_usuario.nombre;
                    fecha = $scope.ajaxData[i].fecha;
                    iva = $scope.ajaxData[i].iva;
                }
            }
            ;
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=linea&op=getpageX&rpp=10000&page=1&id_fact=' + id
            }).then(function (response) {
                $scope.status = response.data.status;
                lineasTotales = response.data.message.length;
                $scope.ajaxLineasFactura = response.data.message;
                var imgData = 'data:image/jpeg;base64,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';

                //CABECERA
                doc.rect(8, 10, 195, 70);
                doc.rect(8, 10, 110, 70);
                doc.addImage(imgData, 'JPEG', 10, 12, 42, 40);
                doc.setFontSize(13);
                doc.setFontType('bold');
                doc.text(55, 20, 'TROLLEYES');
                doc.text(55, 40, 'Tel. 96 320 85 87');
                doc.text(55, 50, 'Email javi@hotmail.com');
                doc.text(55, 30, 'CIF. B45789856');
                doc.setFontType('normal');
                doc.text(14, 62, 'C/ Doctor Sumsi 33 pta. 3');
                doc.text(14, 72, '46005 Valencia (Valencia)');
                doc.setFontSize(30);
                doc.setFontType('bold');
                doc.text(125, 23, 'Factura N: ' + id);
                doc.setFontSize(13);
                doc.setFontType('normal');
                doc.text(125, 40, 'Cliente: ' + usuario);
                doc.text(125, 60, 'Fecha: ' + fecha);
                doc.rect(8, 80, 195, 210);
                doc.setFontSize(15);
                doc.text(12, 90, 'Codigo');
                doc.text(50, 90, 'Descripcion');
                doc.text(125, 90, 'Cantidad');
                doc.text(170, 90, 'Precio (EUR)');
                doc.setFillColor(156, 156, 156);
                doc.rect(9, 93, 193, 5, 'F');
                doc.setFontSize(15);

                //LINEAS DE LA FACTURA
                var linea = 107;
                var precio = 0;
                var cantidad = 0;
                for (var x = 0; x <= lineasTotales - 1; x++) {
                    if (x % 12 === 0 && x !== 0) {
                        doc.addPage('a4', 1);
                        doc.rect(8, 10, 195, 70);
                        doc.rect(8, 10, 110, 70);
                        doc.addImage(imgData, 'JPEG', 10, 12, 42, 40);
                        doc.setFontSize(13);
                        doc.setFontType('bold');
                        doc.text(55, 20, 'TROLLEYES');
                        doc.text(55, 40, 'Tel. 96 320 85 87');
                        doc.text(55, 50, 'Email javi@hotmail.com');
                        doc.text(55, 30, 'CIF. B45789856');
                        doc.setFontType('normal');
                        doc.text(14, 62, 'C/ Doctor Sumsi 33 pta. 3');
                        doc.text(14, 72, '46005 Valencia (Valencia)');
                        doc.setFontSize(30);
                        doc.setFontType('bold');
                        doc.text(125, 23, 'Factura N 25');
                        doc.setFontSize(12);
                        doc.setFontType('normal');
                        doc.text(125, 40, 'Cliente: ' + usuario);
                        doc.text(125, 60, 'Fecha: ' + fecha);
                        doc.rect(8, 80, 195, 210);
                        doc.setFontSize(15);
                        doc.text(12, 90, 'Codigo');
                        doc.text(50, 90, 'Descripcion');
                        doc.text(125, 90, 'Cantidad');
                        doc.text(170, 90, 'Precio');
                        doc.setFillColor(156, 156, 156);
                        doc.rect(9, 93, 193, 5, 'F');
                        doc.setFontSize(15);
                        linea = 107;
                    }
                    doc.text(12, linea, $scope.ajaxLineasFactura[x].obj_producto.codigo);
                    doc.text(50, linea, $scope.ajaxLineasFactura[x].obj_producto.desc);
                    doc.text(125, linea, ($scope.ajaxLineasFactura[x].cantidad).toString());
                    doc.text(170, linea, (($scope.ajaxLineasFactura[x].obj_producto.precio * $scope.ajaxLineasFactura[x].cantidad).toFixed(2).toString()));
                    linea = linea + 13;
                    precio = (precio + ($scope.ajaxLineasFactura[x].obj_producto.precio * $scope.ajaxLineasFactura[x].cantidad));
                    cantidad = cantidad + $scope.ajaxLineasFactura[x].cantidad;
                }

                //FOOTER DE FACTURA
                doc.setFillColor(156, 156, 156);
                doc.rect(9, 260, 193, 5, 'F');
                doc.text(12, 273, 'Cantidad Total');
                doc.text(70, 273, 'Precio');
                doc.text(115, 273, 'IVA');
                doc.text(150, 273, 'Precio Total');

                doc.text(23, 285, cantidad.toString());
                doc.text(70, 285, (precio.toFixed(2).toString()));
                doc.text(115, 285, (precio * (iva / 100)).toFixed(2).toString());
                doc.text(158, 285, (precio * (iva / 100 + 1)).toFixed(2).toString());

                doc.output('save', 'Factura-' + id + '-' + fecha + '.pdf');
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxLineasFactura = response.data.message || 'Request failed';
            });
        };

        $scope.isActive = toolService.isActive;
    }
]);