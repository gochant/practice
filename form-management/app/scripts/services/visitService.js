define([], function () {

    var service = ['$resource', function ($resource) {

        return $resource('mock/data/visit:visitId.json', { visitId: 's' });
    }];

    return {
        'Visit': service
    };

});