/*jslint nomen:true */
/*globals describe, beforeEach, angular, module, inject, it, expect, console, spyOn, jasmine*/
describe('ManageContactCtrl', function () {
    'use strict';
    var mockData = [
        {
            "phone": "9989789871",
            "name": "Name 1",
            "email": "name1@email.com",
            "poster": "1.jpg",
            "id": 1
        },
        {
            "phone": "9989789871",
            "name": "Name 2",
            "email": "name2@email.com",
            "poster": "2.jpg",
            "id": 2
        }],
        scope, ctrl, rootScope, $httpBackend;

    beforeEach(function () {
        this.addMatchers({
            toEqualData: function (expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });
    beforeEach(module('app'));

    describe('Add Contacts', function () {
        beforeEach(inject(function (_$httpBackend_, $rootScope, $routeParams, $controller) {
            scope = $rootScope.$new();
            rootScope = $rootScope;
            ctrl = $controller('ManageContactCtrl', {
                $scope: scope
            });
        }));

        it('should add new contact', function () {
            expect(scope.contact).toEqualData({});
            spyOn(rootScope, '$emit');
            scope.contact = {
                "phone": "9989789871",
                "name": "Name 2",
                "email": "name2@email.com"
            };
            scope.handleContact();
            expect(rootScope.$emit).toHaveBeenCalledWith("contact-added", jasmine.any(Object));
        });
    });
    describe('Edit Contacts', function () {
        var contact = mockData[1];
        beforeEach(inject(function (_$httpBackend_, $rootScope, $routeParams, $controller, contactService) {

            scope = $rootScope.$new();
            rootScope = $rootScope;
            contactService.getContact = function () {
                return contact;
            };
            $routeParams.id = 2;
            ctrl = $controller('ManageContactCtrl', {
                $scope: scope,
                $routeParams: $routeParams,
                contactService: contactService
            });
        }));

        it('should edit existing contact', function () {
            expect(scope.header).toEqual("Edit Contact");
            expect(scope.contact).toEqualData(contact);
            spyOn(rootScope, '$emit');
            scope.contact = {
                "phone": "111111",
                "name": "Edited Name 2",
                "email": "editedname2@email.com",
                "poster": "2.jpg",
                "id": 2
            };
            scope.handleContact();
            expect(rootScope.$emit).toHaveBeenCalledWith("contact-edited", scope.contact);
        });
    });
});