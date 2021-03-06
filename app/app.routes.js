(function() {
    'use strict';

    angular
        .module('portfolioApp')
        .config(function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/login');
            $stateProvider
                .state('login',{
                    url:'/login',
                    templateUrl:'/components/login/login.html',
                    controller:'LoginController as login'
                })
                .state('forgot',{
                    url:'/forgot',
                    templateUrl:'/components/forgot/forgot.html',
                    controller:'ForgotController as forgot'
                })
                .state('frontdesk',{
                    url:'/frontdesk',
                    abstract: true,
                    resolve: {
                        token : function(AuthService) {
                            return AuthService.token;
                        },
                        ordersPrepService: function(roomOrderService) {
                            return roomOrderService.getOrders();
                        },
                        guestListPrepService: function(listService) {
                            return listService.getGuests();
                        },
                        settingsPrepService: function(settingsService) {
                            return settingsService.getSettings();
                        }
                    },
                    templateUrl: '/components/frontdesk/main/main.html',
                    controller: 'mainController',
                    controllerAs: 'frontdesk'
                })
                .state('frontdesk.guests',{
                    url:'',
                    templateUrl: '/components/frontdesk/list/list.html',
                    controller: 'GuestListController',
                    controllerAs: 'list'
                })
                .state('frontdesk.roomservice',{
                    url: '/roomservice',
                    templateUrl: '/components/frontdesk/roomservice/roomservice.html',
                    controller: 'roomserviceController',
                    controllerAs: 'roomservice'
                });
        });
})();
