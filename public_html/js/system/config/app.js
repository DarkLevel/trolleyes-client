'use strict'

var trolleyes = angular.module('MyApp', [
    'ngRoute',
    'services',
    'commonControllers',
    'facturaControllers',
    'lineaControllers',
    'productoControllers',
    'tipoproductoControllers',
    'usuarioControllers',
    'tipousuarioControllers'
]);


var moduleCommon = angular.module ('commonControllers',[]);
var moduleService = angular.module ('services',[]);
var moduleTipofactura = angular.module ('facturaControllers',[]);
var moduleLinea = angular.module ('lineaControllers',[]);
var moduleProducto = angular.module ('productoControllers',[]);
var moduleTipoproducto = angular.module ('tipoproductoControllers',[]);
var moduleUsuario = angular.module ('usuarioControllers',[]);
var moduleTipousuario = angular.module ('tipousuarioControllers',[]);
