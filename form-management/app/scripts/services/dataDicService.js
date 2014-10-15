define([], function () {

    var service = ['$resource', function ($resource) {

        return $resource('mock/data/:type.json', {
            type: ''
        }, {
            get: {
                method: 'GET',
                isArray: true
            }
        });
    }];

    return {
        'DataDictionary': service
    };

});