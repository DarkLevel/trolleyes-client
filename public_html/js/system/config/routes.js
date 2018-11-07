trolleyes.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl:'js/app/common/home.html', controller: 'homeController'});
        $routeProvider.when('/factura/view/:id?', {templateUrl:'js/app/factura/view.html', controller: 'facturaViewController'});
        $routeProvider.when('/factura/plist/', {templateUrl:'js/app/factura/plist.html', controller: 'facturaPlistController'});
        $routeProvider.when('/factura/plist/:rpp?/:page?', {templateUrl:'js/app/factura/plist.html', controller: 'facturaPlistController'});
        
        $routeProvider.when('/linea/view/:id?', {templateUrl:'js/app/linea/view.html', controller: 'lineaViewController'});
        $routeProvider.when('/linea/plist/', {templateUrl:'js/app/linea/plist.html', controller: 'lineaPlistController'});
        $routeProvider.when('/linea/plist/:rpp?/:page?', {templateUrl:'js/app/linea/plist.html', controller: 'lineaPlistController'});
        
        $routeProvider.when('/producto/view/:id?', {templateUrl:'js/app/producto/view.html', controller: 'productoViewController'});
        $routeProvider.when('/producto/plist/', {templateUrl:'js/app/producto/plist.html', controller: 'productoPlistController'});
        $routeProvider.when('/producto/plist/:rpp?/:page?/:order?', {templateUrl:'js/app/producto/plist.html', controller: 'productoPlistController'});
        
        $routeProvider.when('/tipoproducto/view/:id?', {templateUrl:'js/app/tipoproducto/view.html', controller: 'tipoproductoViewController'});
        $routeProvider.when('/tipoproducto/plist/', {templateUrl:'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController'});
        $routeProvider.when('/tipoproducto/plist/:rpp?/:page?', {templateUrl:'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController'});
        
        $routeProvider.when('/usuario/view/:id?', {templateUrl:'js/app/usuario/view.html', controller: 'usuarioViewController'});
        $routeProvider.when('/usuario/plist/', {templateUrl:'js/app/usuario/plist.html', controller: 'usuarioPlistController'});
        $routeProvider.when('/usuario/plist/:rpp?/:page?/:order?', {templateUrl:'js/app/usuario/plist.html', controller: 'usuarioPlistController'});
        
        $routeProvider.when('/tipousuario/view/:id?', {templateUrl:'js/app/tipousuario/view.html', controller: 'tipousuarioViewController'});
        $routeProvider.when('/tipousuario/plist/', {templateUrl:'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController'});
        $routeProvider.when('/tipousuario/plist/:rpp?/:page?', {templateUrl:'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);