define([], function () {

    var service = ['$resource', function ($resource) {

        return $resource('mock/data/journey:visitId:journeyId.json', { visitId: 's', journeyId: '' });
    }];

    return {
        'Journey': service
    };

});