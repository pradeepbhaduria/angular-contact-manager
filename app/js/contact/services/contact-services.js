/*globals angular, console */
/*jslint nomen: true, plusplus:true*/
angular.module('app').factory('contactService', function ($http, $rootScope, $q) {
    'use strict';

    var _contacts = [],
        _getContacts = function () {
            var deferred = $q.defer();
            if (_contacts.length) {
                deferred.resolve(_contacts);
            } else {
                $http.get('data/contacts.json').then(function (response) {
                    _contacts = response.data;
                    deferred.resolve(_contacts);
                });
            }
            return deferred.promise;
        },
        _getContactIndex = function (id) {
            var contactIndex,
                i;
            for (i = 0; i < _contacts.length; i++) {
                if (parseInt(id, 10) === _contacts[i].id) {
                    contactIndex = i;
                    break;
                }
            }
            return contactIndex;
        };

    $rootScope.$on("contact-added", function (event, contact) {
        _contacts.push(contact);
    });

    $rootScope.$on("contact-edited", function (event, contact) {
        var index = _getContactIndex[contact.id];
        _contacts[index] = contact;
    });

    return {
        getContacts: _getContacts,
        getContact: function (id) {
            var index = _getContactIndex(id);
            return index >= 0 ? _contacts[index] : undefined;
        },
        deleteContact: function (id) {
            var index = _getContactIndex(id);
            _contacts.splice(index, 1);
            $rootScope.$emit("contact-deleted", index);
        }
    };

});