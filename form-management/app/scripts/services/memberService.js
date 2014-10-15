define([], function () {

    var service = ['$resource', function ($resource) {

        return $resource('mock/data/member:visitId-:memberId.json', { visitId: '1', memeberId: '' });
    }];

    return {
        'Member': service
    };

});