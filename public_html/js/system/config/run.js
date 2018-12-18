/* global trolleyes */

//trolleyes.run(['$rootScope', 'sessionService', '$location', '$http', 'countCarritoService',
//    function ($rootScope, oSessionService, $location, $http, countCarritoService) {
//        $rootScope.$on("$routeChangeStart", function (event, next, current) {
//            
//            var nextUrl = next.$$route.originalPath;
//            
//            $http({
//                method: 'GET',
//                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
//            }).then(function (response) {
//                if (response.data.status === 200) {
//                    oSessionService.setSessionActive();
//                    var idTipoUsuario = response.data.message.obj_tipoUsuario.id;
//                    if(idTipoUsuario === 1){
//                        oSessionService.setAdminActive();
//                    }
//                    if(idTipoUsuario === 2){
//                        oSessionService.setClientActive();
//                    }
//                    oSessionService.setUserName(response.data.message.login);
//                    oSessionService.setId(response.data.message.id);
//                    countCarritoService.updateCarrito();
//                } else {
//                    oSessionService.setSessionInactive;
//                    if (nextUrl !== 'home' && nextUrl !== '/usuario/login' && nextUrl !== '/usuario/createCliente') {
//                        $location.path("home");
//                    }
//                }
//            }, function () {
//                oSessionService.setSessionInactive();
//                if (nextUrl !== 'home' && nextUrl !== '/usuario/login' && nextUrl !== '/usuario/createCliente') {
//                    $location.path("home");
//                }
//            });
//            
//        });
//    }]);