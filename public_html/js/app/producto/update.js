/* global moduleProducto */

'use strict';

moduleProducto.controller('productoUpdateController', ['$scope', '$http', 'toolService', '$routeParams', '$anchorScroll',
    function ($scope, $http, toolService, $routeParams, $anchorScroll) {
        $anchorScroll();

        $scope.formulario = true;
        $scope.botones = true;
        $scope.alerta = false;

        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=get&id=' + $routeParams.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.id = response.data.message.id;
            $scope.codigo = response.data.message.codigo;
            $scope.desc = response.data.message.desc;
            $scope.existencias = response.data.message.existencias;
            $scope.precio = reemplazar(response.data.message.precio);
            $scope.foto = response.data.message.foto;

            var id_tipoProducto = response.data.message.obj_tipoProducto.id;
            var desc_tipoProducto = response.data.message.obj_tipoProducto.desc;
            $scope.obj_tipoProducto = {id: id_tipoProducto, desc: desc_tipoProducto};
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message || 'Request failed';
        });

        $scope.volver = function () {
            window.history.back();
        };

        $scope.editar = function () {
            var foto;
            if ($scope.myFile !== undefined) {
                //Si el nombre de la imagen es "Default.png" significa que es la de por defecto, se le deja intacta
                if ($scope.myFile.name === "Default.png") {
                    foto = $scope.myFile.name;
                    //Si la imagen que tenía el producto era la predefinida y me suben una nueva foto diferente.
                } else if ($scope.foto === "Default.png" && $scope.myFile.name !== "Default.png") {
                    foto = guid() + $scope.myFile.name;
                } else {
                    foto = $scope.foto;
                }
                uploadPhoto(foto);
            } else {
                foto = $scope.foto;
            }

            var json = {
                id: $scope.id,
                codigo: $scope.codigo,
                desc: $scope.desc,
                existencias: $scope.existencias,
                precio: $scope.precio.replace(',', '.'),
                foto: foto,
                id_tipoProducto: $scope.obj_tipoProducto.id
            };
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=producto&op=update',
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
        };

        $scope.tipoProductoRefresh = function (f, consultar) {
            var form = f;
            if ($scope.obj_tipoProducto.id !== null) {
                if (consultar) {
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=get&id=' + $scope.obj_tipoProducto.id
                    }).then(function (response) {
                        $scope.obj_tipoProducto = response.data.message;
                        form.form.obj_tipoProducto.$setValidity('valid', true);
                    }, function (response) {
                        form.form.obj_tipoProducto.$setValidity('valid', false);
                    });
                } else {
                    form.form.obj_tipoProducto.$setValidity('valid', true);
                }
            } else {
                $scope.obj_tipoProducto.desc = "";
            }
        };

        function reemplazar(precio) {
            var precioString = precio.toString();
            var precioCambiado = precioString.replace(".", ",");

            return precioCambiado;
        }

        function uploadPhoto(name) {
            //Solucion mas cercana
            //https://stackoverflow.com/questions/37039852/send-formdata-with-other-field-in-angular
            var file = $scope.myFile;
            file = new File([file], name, {type: file.type});
            //Api FormData 
            //https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/FormData
            var oFormData = new FormData();
            oFormData.append('file', file);
            $http({
                headers: {'Content-Type': undefined},
                method: 'POST',
                data: oFormData,
                url: `http://localhost:8081/trolleyes/json?ob=producto&op=addimage`
            });
        }

        function guid() {
            return "ss-s-s-s-sss".replace(/s/g, s4);
        }

        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
        }

        $scope.isActive = toolService.isActive;
    }
]).directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);