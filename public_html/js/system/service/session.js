/* global moduleService, observerCallbacks */

'use strict';

moduleService.service('sessionService', [function () {
        var isSessionActive = false;
        var userName = "";
        var userId = "";
        var productosCarrito = 0;
        var observerCallbacks = [];
        return {
            getUserName: function () {
                return userName;
            },
            setUserName: function (name) {
                userName = name;
                
                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });
            },
            getId: function () {
                return userId;
            },
            setId: function (id) {
                userId = id;
                
                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });
            },
            isSessionActive: function () {
                return isSessionActive;
            },
            setSessionActive: function () {
                isSessionActive = true;
                
                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });
            },
            setSessionInactive: function () {
                isSessionActive = false;
                
                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });
            },
            getCountCarrito: function(){
                return productosCarrito;
            },
            setCountCarrito: function(numeroProductos){
                productosCarrito = numeroProductos;
                
                angular.forEach(observerCallbacks, function (callback) {
                    callback();
                });
            },            
            registerObserverCallback: function (callback) {
                observerCallbacks.push(callback);
            }
        };
    }]);