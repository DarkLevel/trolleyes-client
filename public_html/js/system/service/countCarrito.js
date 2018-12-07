/* global moduleService */

'use strict';

moduleService.service('countCarritoService', ['$http', 'sessionService', function ($http, sessionService) {
        return {
            updateCarrito: function () {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=show'
                }).then(function (response) {
                    var cantidad = 0;
                    if (response.data.message === null) {
                        for (var i = 0; i < response.data.message.length; i++) {
                            cantidad += response.data.message[i].cantidad;
                        }
                    }
                    sessionService.setCountCarrito(cantidad);
                });
            }
        };
    }]);