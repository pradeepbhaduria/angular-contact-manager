/*jslint nomen:true */
/*globals describe, beforeEach, angular, module, inject, it, expect, console, spyOn, jasmine*/
describe('ContactListCtrl', function () {
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
    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('data/contacts.json').respond(mockData);
        scope = $rootScope.$new();
        ctrl = $controller('ContactListCtrl', {
            $scope: scope
        });
    }));

    it('should create "contacts" model with 2 contacts fetched from xhr', function () {
        $httpBackend.flush();
        expect(scope.contacts).toEqualData(mockData);
    });

    it('should create delete contact from model', function () {
        $httpBackend.flush();
        scope.deleteContact(1);
        expect(scope.contacts).toEqualData([
            {
                "phone": "9989789871",
                "name": "Name 2",
                "email": "name2@email.com",
                "poster": "2.jpg",
                "id": 2
            }]);
    });

});