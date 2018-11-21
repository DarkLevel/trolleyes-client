/* global trolleyes */

trolleyes.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'js/app/common/home.html', controller: 'homeController'});

        $routeProvider.when('/usuario/:id_user/factura/create', {templateUrl: 'js/app/factura/create.html', controller: 'facturaCreateController'});
        $routeProvider.when('/usuario/:id_user/factura/remove/:id?', {templateUrl: 'js/app/factura/remove.html', controller: 'facturaRemoveController'});
        $routeProvider.when('/usuario/:id_user/factura/update/:id?', {templateUrl: 'js/app/factura/update.html', controller: 'facturaUpdateController'});
        $routeProvider.when('/usuario/:id_user/factura/view/:id?', {templateUrl: 'js/app/factura/view.html', controller: 'facturaViewController'});
        $routeProvider.when('/usuario/:id_user/factura/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plist.html', controller: 'facturaPlistController'});
        
        $routeProvider.when('/usuario/:id_user/factura/:id_factura/linea/create', {templateUrl: 'js/app/linea/create.html', controller: 'lineaCreateController'});
        $routeProvider.when('/usuario/:id_user/factura/:id_factura/linea/remove/:id?', {templateUrl: 'js/app/linea/remove.html', controller: 'lineaRemoveController'});
        $routeProvider.when('/usuario/:id_user/factura/:id_factura/linea/update/:id?', {templateUrl: 'js/app/linea/update.html', controller: 'lineaUpdateController'});
        $routeProvider.when('/usuario/:id_user/factura/:id_factura/linea/view/:id?', {templateUrl: 'js/app/linea/view.html', controller: 'lineaViewController'});
        $routeProvider.when('/usuario/:id_user/factura/:id_factura/linea/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/linea/plist.html', controller: 'lineaPlistController'});

        $routeProvider.when('/producto/create', {templateUrl: 'js/app/producto/create.html', controller: 'productoCreateController'});
        $routeProvider.when('/producto/remove/:id?', {templateUrl: 'js/app/producto/remove.html', controller: 'productoRemoveController'});
        $routeProvider.when('/producto/update/:id?', {templateUrl: 'js/app/producto/update.html', controller: 'productoUpdateController'});
        $routeProvider.when('/producto/view/:id?', {templateUrl: 'js/app/producto/view.html', controller: 'productoViewController'});
        $routeProvider.when('/producto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/producto/plist.html', controller: 'productoPlistController'});

        $routeProvider.when('/tipoproducto/create', {templateUrl: 'js/app/tipoproducto/create.html', controller: 'tipoproductoCreateController'});
        $routeProvider.when('/tipoproducto/remove/:id?', {templateUrl: 'js/app/tipoproducto/remove.html', controller: 'tipoproductoRemoveController'});
        $routeProvider.when('/tipoproducto/update/:id?', {templateUrl: 'js/app/tipoproducto/update.html', controller: 'tipoproductoUpdateController'});
        $routeProvider.when('/tipoproducto/view/:id?', {templateUrl: 'js/app/tipoproducto/view.html', controller: 'tipoproductoViewController'});
        $routeProvider.when('/tipoproducto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController'});

        $routeProvider.when('/usuario/create', {templateUrl: 'js/app/usuario/create.html', controller: 'usuarioCreateController'});
        $routeProvider.when('/usuario/remove/:id?', {templateUrl: 'js/app/usuario/remove.html', controller: 'usuarioRemoveController'});
        $routeProvider.when('/usuario/update/:id?', {templateUrl: 'js/app/usuario/update.html', controller: 'usuarioUpdateController'});
        $routeProvider.when('/usuario/view/:id?', {templateUrl: 'js/app/usuario/view.html', controller: 'usuarioViewController'});
        $routeProvider.when('/usuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistController'});
        $routeProvider.when('/usuario/login', {templateUrl: 'js/app/usuario/login.html', controller: 'usuarioLoginController'});

        $routeProvider.when('/tipousuario/create', {templateUrl: 'js/app/tipousuario/create.html', controller: 'tipousuarioCreateController'});
        $routeProvider.when('/tipousuario/remove/:id?', {templateUrl: 'js/app/tipousuario/remove.html', controller: 'tipousuarioRemoveController'});
        $routeProvider.when('/tipousuario/update/:id?', {templateUrl: 'js/app/tipousuario/update.html', controller: 'tipousuarioUpdateController'});
        $routeProvider.when('/tipousuario/view/:id?', {templateUrl: 'js/app/tipousuario/view.html', controller: 'tipousuarioViewController'});
        $routeProvider.when('/tipousuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController'});
       
        $routeProvider.otherwise({redirectTo: '/home'});
    }]);
