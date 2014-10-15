define([], function () {

    var service = ['$resource', function ($resource) {

        return $resource('mock/data/country:id.json', { id: 's' });
    }];

    return {
        'Country': service
    };

});