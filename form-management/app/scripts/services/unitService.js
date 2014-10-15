define([], function () {

    var service = ['$resource', function ($resource) {

        return $resource('mock/data/unit:unitId.json', { unitId: 's' });
    }];

    return {
        'Unit': service
    };

});