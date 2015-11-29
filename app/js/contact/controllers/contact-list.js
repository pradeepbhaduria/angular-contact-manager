/*globals angular, console */
angular.module("app").controller("ContactListCtrl", function ($scope, $http, contactService, $rootScope) {
    'use strict';
    contactService.getContacts().then(function (response) {
        $scope.contacts = response;
    }, function (error) {
        console.log("error", error);
    });

    $scope.deleteContact = function (contact) {
        contactService.deleteContact(contact.id);
    };

});