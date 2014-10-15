define([], function () {

    var service = ['$resource', function ($resource) {

        return $resource('mock/data/person:personId.json', { personId: 's' });
    }];

    return {
        'Person': service
    };

});