/*jslint nomen:true */
/*globals describe, beforeEach, angular, module, inject, it, expect, console, spyOn, jasmine*/

describe('service', function () {
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
        rootScope = $rootScope;
        ctrl = $controller('ContactListCtrl', {
            $scope: scope
        });
    }));

    // Test service availability
    it('check the existence of contactService factory', inject(function (contactService) {
        expect(contactService).toBeDefined();
    }));
    
    it('should return contacts fetched from xhr', inject(function (contactService) {
        $httpBackend.flush();
        expect(contactService.getContacts().$$state.value).toEqualData(mockData);
    }));
    
    it('should return contact for id', inject(function (contactService) {
        $httpBackend.flush();
        expect(contactService.getContact(2)).toEqualData(mockData[1]);
    }));
    
    it('should return contact for id', inject(function (contactService) {
        spyOn(rootScope, '$emit');
        $httpBackend.flush();
        contactService.deleteContact(1);
        expect(rootScope.$emit).toHaveBeenCalledWith("contact-deleted", 0);
    }));
    
});