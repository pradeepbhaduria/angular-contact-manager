/*globals angular, console */
angular.module("app").controller("ManageContactCtrl", function ($scope, $rootScope, $location, $routeParams, contactService) {
    'use strict';
    var CREATE_CONTACT = "Create Contact",
        EDIT_CONTACT = "Edit Contact",
        addContact = function () {
            $scope.contact.poster = Math.floor((Math.random() * 15) + 1) + '.jpg';
            $scope.contact.id = new Date().getTime();
            $rootScope.$emit("contact-added", $scope.contact);
            $location.path('/contacts');
        },
        editContact = function () {
            $rootScope.$emit("contact-edited", $scope.contact);
            $location.path('/contacts');
        };

    $scope.header = $routeParams.id ? EDIT_CONTACT : CREATE_CONTACT;
    $scope.contact = contactService.getContact($routeParams.id) || {};
    $scope.handleContact = function () {
        if ($routeParams.id) {
            editContact();
        } else {
            addContact();
        }
    };
});