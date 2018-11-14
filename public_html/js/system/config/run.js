/* global trolleyes */

trolleyes.run(['$rootScope', 'sessionService', '$location', '$http',
    function ($rootScope, oSessionService, $location, $http) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            
            var nextUrl = next.$$route.originalPath;
            
            $http({
                method: 'GET',
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
            }).then(function (response) {
                if (response.data.status == 200) {
                    oSessionService.setSessionActive;
                    oSessionService.setUserName(response.data.message.nombre + " " + response.data.message.ape1);
                } else {
                    oSessionService.setSessionInactive;
                    if (nextUrl != '/' && nextUrl != '/home' && nextUrl != '/login') {
                        $location.path("/");
                    }
                }
            }, function (response) {
                oSessionService.setSessionInactive;
                if (nextUrl != '/' && nextUrl != '/home' && nextUrl != '/login') {
                    $location.path("/");
                }
            });
            
        });
    }]);