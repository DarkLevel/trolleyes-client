/* global trolleyes */

var autenticacionAdministrador = function ($q, $location, $http, sessionService, countCarritoService) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
    }).then(function (response) {
        if (response.data.status === 200) {
            if (response.data.message.obj_tipoUsuario.id === 1) {
                sessionService.setSessionActive();
                sessionService.setAdminActive();
                sessionService.setClientInactive();
                sessionService.setUserName(response.data.message.login);
                sessionService.setId(response.data.message.id);
                countCarritoService.updateCarrito();
                deferred.resolve();
            }
        } else {
            sessionService.setSessionInactive();
            sessionService.setAdminInactive();
            sessionService.setClientInactive();
            $location.path('/home');
        }
    }, function () {
        sessionService.setSessionInactive();
        sessionService.setAdminInactive();
        sessionService.setClientInactive();
        $location.path('/home');
    });
    return deferred.promise;
};


var autenticacionCliente = function ($q, $location, $http, sessionService, countCarritoService) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
    }).then(function (response) {
        if (response.data.status === 200) {
            if (response.data.message.obj_tipoUsuario.id === 2) {
                sessionService.setSessionActive();
                sessionService.setAdminInactive();
                sessionService.setClientActive();
                sessionService.setUserName(response.data.message.login);
                sessionService.setId(response.data.message.id);
                countCarritoService.updateCarrito();
                deferred.resolve();
            }
        } else {
            sessionService.setSessionInactive();
            sessionService.setAdminInactive();
            sessionService.setClientInactive();
            $location.path('/home');
        }
    }, function () {
        sessionService.setSessionInactive();
        sessionService.setAdminInactive();
        sessionService.setClientInactive();
        $location.path('/home');
    });
    return deferred.promise;
};

var autenticacionAny = function ($q, $location, $http, sessionService, countCarritoService) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
    }).then(function (response) {
        if (response.data.status === 200) {
            if (response.data.message.obj_tipoUsuario.id === 1) {
                sessionService.setSessionActive();
                sessionService.setAdminActive();
                sessionService.setClientInactive();
                sessionService.setUserName(response.data.message.login);
                sessionService.setId(response.data.message.id);
                countCarritoService.updateCarrito();
            }
            if (response.data.message.obj_tipoUsuario.id === 2) {
                sessionService.setSessionActive();
                sessionService.setAdminInactive();
                sessionService.setClientActive();
                sessionService.setUserName(response.data.message.login);
                sessionService.setId(response.data.message.id);
                countCarritoService.updateCarrito();
            }
            deferred.resolve();
        } else {
            sessionService.setSessionInactive();
            sessionService.setAdminInactive();
            sessionService.setClientInactive();
            $location.path('/home');
        }
    }, function () {
        sessionService.setSessionInactive();
        sessionService.setAdminInactive();
        sessionService.setClientInactive();
        $location.path('/home');
    });
    return deferred.promise;
};

var noAutenticacion = function ($q, $location, $http, sessionService) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
    }).then(function (response) {
        if (response.data.status === 401) {
            sessionService.setSessionInactive();
            sessionService.setAdminInactive();
            sessionService.setClientInactive();
            deferred.resolve();
        }
    }, function () {
        sessionService.setSessionInactive();
        sessionService.setAdminInactive();
        sessionService.setClientInactive();
        $location.path('/home');
    });
    return deferred.promise;
};

var everyone = function ($q, $location, $http, sessionService, countCarritoService) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
    }).then(function (response) {
        if (response.data.status === 200) {
            if (response.data.message.obj_tipoUsuario.id === 1) {
                sessionService.setSessionActive();
                sessionService.setAdminActive();
                sessionService.setClientInactive();
                sessionService.setUserName(response.data.message.login);
                sessionService.setId(response.data.message.id);
                countCarritoService.updateCarrito();
            }
            if (response.data.message.obj_tipoUsuario.id === 2) {
                sessionService.setSessionActive();
                sessionService.setAdminInactive();
                sessionService.setClientActive();
                sessionService.setUserName(response.data.message.login);
                sessionService.setId(response.data.message.id);
                countCarritoService.updateCarrito();
            }
            deferred.resolve();
        } else {
            sessionService.setSessionInactive();
            sessionService.setAdminInactive();
            sessionService.setClientInactive();
            deferred.resolve();
        }
    }, function () {
        sessionService.setSessionInactive();
        sessionService.setAdminInactive();
        sessionService.setClientInactive();
        $location.path('/home');
    });
    return deferred.promise;
};

trolleyes.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {templateUrl: 'js/app/common/home.html', controller: 'homeController', resolve: {auth: everyone}});



        $routeProvider.when('/usuario/:id_user/factura/create', {templateUrl: 'js/app/factura/create.html', controller: 'facturaCreateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/:id_user/factura/remove/:id?', {templateUrl: 'js/app/factura/remove.html', controller: 'facturaRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/:id_user/factura/update/:id?', {templateUrl: 'js/app/factura/update.html', controller: 'facturaUpdateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/:id_user/factura/view/:id?', {templateUrl: 'js/app/factura/view.html', controller: 'facturaViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/:id_user/factura/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/factura/plist.html', controller: 'facturaPlistController', resolve: {auth: autenticacionAdministrador}});

        $routeProvider.when('/usuario/:id_user/factura/:id_factura/linea/create', {templateUrl: 'js/app/linea/create.html', controller: 'lineaCreateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/:id_user/factura/:id_factura/linea/remove/:id?', {templateUrl: 'js/app/linea/remove.html', controller: 'lineaRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/:id_user/factura/:id_factura/linea/update/:id?', {templateUrl: 'js/app/linea/update.html', controller: 'lineaUpdateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/:id_user/factura/:id_factura/linea/view/:id?', {templateUrl: 'js/app/linea/view.html', controller: 'lineaViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/:id_user/factura/:id_factura/linea/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/linea/plist.html', controller: 'lineaPlistController', resolve: {auth: autenticacionAdministrador}});

        $routeProvider.when('/producto/create', {templateUrl: 'js/app/producto/create.html', controller: 'productoCreateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/remove/:id?', {templateUrl: 'js/app/producto/remove.html', controller: 'productoRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/update/:id?', {templateUrl: 'js/app/producto/update.html', controller: 'productoUpdateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/producto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/producto/plist.html', controller: 'productoPlistController', resolve: {auth: autenticacionAdministrador}});

        $routeProvider.when('/tipoproducto/create', {templateUrl: 'js/app/tipoproducto/create.html', controller: 'tipoproductoCreateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/remove/:id?', {templateUrl: 'js/app/tipoproducto/remove.html', controller: 'tipoproductoRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/update/:id?', {templateUrl: 'js/app/tipoproducto/update.html', controller: 'tipoproductoUpdateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/view/:id?', {templateUrl: 'js/app/tipoproducto/view.html', controller: 'tipoproductoViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipoproducto/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController', resolve: {auth: autenticacionAdministrador}});

        $routeProvider.when('/usuario/create', {templateUrl: 'js/app/usuario/create.html', controller: 'usuarioCreateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/remove/:id?', {templateUrl: 'js/app/usuario/remove.html', controller: 'usuarioRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/update/:id?', {templateUrl: 'js/app/usuario/update.html', controller: 'usuarioUpdateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/view/:id?', {templateUrl: 'js/app/usuario/view.html', controller: 'usuarioViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/profile/viewAdmin', {templateUrl: 'js/app/profile/viewAdmin.html', controller: 'usuarioViewAdminController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/usuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/usuario/plist.html', controller: 'usuarioPlistController', resolve: {auth: autenticacionAdministrador}});

        $routeProvider.when('/tipousuario/create', {templateUrl: 'js/app/tipousuario/create.html', controller: 'tipousuarioCreateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/remove/:id?', {templateUrl: 'js/app/tipousuario/remove.html', controller: 'tipousuarioRemoveController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/update/:id?', {templateUrl: 'js/app/tipousuario/update.html', controller: 'tipousuarioUpdateController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/view/:id?', {templateUrl: 'js/app/tipousuario/view.html', controller: 'tipousuarioViewController', resolve: {auth: autenticacionAdministrador}});
        $routeProvider.when('/tipousuario/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController', resolve: {auth: autenticacionAdministrador}});



        $routeProvider.when('/profile/viewCliente', {templateUrl: 'js/app/profile/viewCliente.html', controller: 'usuarioViewClienteController', resolve: {auth: autenticacionCliente}});



        $routeProvider.when('/profile/updateLogged', {templateUrl: 'js/app/profile/updateLogged.html', controller: 'usuarioUpdateLoggedController', resolve: {auth: autenticacionAny}});
        $routeProvider.when('/profile/changePass', {templateUrl: 'js/app/profile/changePass.html', controller: 'usuarioChangePassController', resolve: {auth: autenticacionAny}});
        $routeProvider.when('/profile/factura/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/profile/facturaPlist.html', controller: 'facturaPlistUserController', resolve: {auth: autenticacionAny}});
        $routeProvider.when('/profile/factura/:id_factura/linea/plist/:rpp?/:page?/:order?', {templateUrl: 'js/app/profile/lineaPlist.html', controller: 'lineaPlistUserController', resolve: {auth: autenticacionAny}});

        $routeProvider.when('/producto/plistCliente/:rpp?/:page?/:order?', {templateUrl: 'js/app/producto/plistCliente.html', controller: 'productoPlistClienteController', resolve: {auth: autenticacionAny}});
        $routeProvider.when('/producto/view/:id?', {templateUrl: 'js/app/producto/view.html', controller: 'productoViewController', resolve: {auth: autenticacionAny}});

        $routeProvider.when('/carrito/plist', {templateUrl: 'js/app/carrito/plist.html', controller: 'carritoPlistController', resolve: {auth: autenticacionAny}});
        $routeProvider.when('/carrito/buy', {templateUrl: 'js/app/carrito/buy.html', controller: 'carritoBuyController', resolve: {auth: autenticacionAny}});



        $routeProvider.when('/usuario/login', {templateUrl: 'js/app/usuario/login.html', controller: 'usuarioLoginController', resolve: {auth: noAutenticacion}});
        $routeProvider.when('/usuario/createUser', {templateUrl: 'js/app/usuario/createUser.html', controller: 'usuarioCreateUserController', resolve: {auth: noAutenticacion}});



        $routeProvider.otherwise({redirectTo: '/home'});
    }]);
