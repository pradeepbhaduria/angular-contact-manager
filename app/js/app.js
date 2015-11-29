/*globals angular */
angular.module('app', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        'use strict';
        $routeProvider.
            when('/contacts', {
                templateUrl: 'js/contact/views/contact-list.html',
                controller: 'ContactListCtrl'
            }).
            when('/contacts/edit/:id', {
                templateUrl: 'js/contact/views/manage-contact.html',
                controller: 'ManageContactCtrl'
            }).
            when('/contacts/new', {
                templateUrl: 'js/contact/views/manage-contact.html',
                controller: 'ManageContactCtrl'
            }).
            otherwise({
                redirectTo: '/contacts'
            });
    }]);