'use strict'

var trolleyes = angular.module('MyApp', [
    'ngRoute',
    'services',
    'commonControllers',
    'tipousuarioControllers',
    'usuarioControllers'
]);


var moduleCommon = angular.module ('commonControllers',[]);
var moduleService = angular.module ('services',[]);
var moduleTipousuario = angular.module ('tipousuarioControllers',[]);
var moduleUsuario = angular.module ('usuarioControllers',[]);