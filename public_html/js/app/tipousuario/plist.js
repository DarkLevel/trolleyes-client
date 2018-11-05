'use strict'

moduleTipousuario.controller('tipousuarioPlistController', ['$scope', '$http', '$location', 'toolService',
        function ($scope, $http, $location, toolService) {
            //$scope.ruta = $location.path();

      
         
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
            
//            $http({
//                method: 'GET',
//                //withCredentials: true,
//                url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=2'
//            }).then(function (response) {
//                $scope.status = response.status;
//                $scope.ajaxData = response.data.message;
//            }, function (response) {
//                $scope.ajaxData = response.data.message || 'Request failed';
//                $scope.status = response.status;
//            });
            $scope.isActive = toolService.isActive;

        }
]);