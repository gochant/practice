define([], function () {

    var service = ['$resource', function ($resource) {

        return $resource('mock/data/table:visitId.json', { visitId: 's', journeyId: '' });
    }];

    return {
        'Table': service
    };

});