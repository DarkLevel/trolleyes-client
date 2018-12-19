/* global moduleProducto */

'use strict';

moduleProducto.controller('productoCreateController', ['$scope', '$http', 'toolService', '$anchorScroll',
    function ($scope, $http, toolService, $anchorScroll) {
        $anchorScroll();
        
        $scope.formulario = true;
        $scope.botones = true;
        $scope.alerta = false;
        $scope.obj_tipoProducto = {id: null, desc: null};

        $scope.volver = function () {
            window.history.back();
        };

        $scope.crear = function () {
            if($scope.myFile === undefined){
                $scope.foto = "Default.png";
            } else{
                $scope.foto = guid()+$scope.myFile.name;
                uploadPhoto($scope.foto);
            }
            
            var json = {
                codigo: $scope.codigo,
                desc: $scope.desc,
                existencias: $scope.existencias,
                precio: $scope.precio.replace(',', '.'),
                foto: $scope.foto,
                id_tipoProducto: $scope.obj_tipoProducto.id
            };
            
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=producto&op=create',
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