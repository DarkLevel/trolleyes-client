trolleyes.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl:'js/app/common/home.html', controller: 'homeController'});
        $routeProvider.when('/factura/plist/:rpp?/:page?', {templateUrl:'js/app/factura/plist.html', controller: 'facturaPlistController'});
        $routeProvider.when('/linea/plist/:rpp?/:page?', {templateUrl:'js/app/linea/plist.html', controller: 'lineaPlistController'});
        $routeProvider.when('/producto/plist/:rpp?/:page?', {templateUrl:'js/app/producto/plist.html', controller: 'prodcutoPlistController'});
        $routeProvider.when('/tipoproducto/plist/:rpp?/:page?', {templateUrl:'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController'});
        $routeProvider.when('/usuario/plist/:rpp?/:page?', {templateUrl:'js/app/usuario/plist.html', controller: 'usuarioPlistController'});
        $routeProvider.when('/tipousuario/plist/:rpp?/:page?', {templateUrl:'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);