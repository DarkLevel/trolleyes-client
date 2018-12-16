/* global moduleComponent */

moduleComponent.component('headerComponent', {
    templateUrl: 'js/app/componentes/header/header.html',
    bindings: {
        eventlistener: '&'
    },
    controllerAs: 'c',
    controller: js
});

function js(toolService, sessionService, $scope, $http, $location) {
    var self = this;

    self.logged = sessionService.isSessionActive();
    self.nameUserLogged = sessionService.getUserName();
    self.idUserLogged = sessionService.getId();
    self.idLoggedUserType = sessionService.getIdTipoUsuario();
    self.isActive = toolService.isActive;
    self.carrito = sessionService.getCountCarrito();

    sessionService.registerObserverCallback(function () {
        self.logged = sessionService.isSessionActive();
        self.nameUserLogged = sessionService.getUserName();
        self.idUserLogged = sessionService.getId();
        self.idLoggedUserType = sessionService.getIdTipoUsuario();
        self.carrito = sessionService.getCountCarrito();
    });

    $scope.logout = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
        }).then(function (response) {
            if (response.data.status === 200) {
                sessionService.setSessionInactive();
                $location.url('home');
            }
        });
    };

}