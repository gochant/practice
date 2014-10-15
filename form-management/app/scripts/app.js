
define([
    'routes/routes',
    'services/services',
    'controllers/controllers',
    'directives/directives',
    'filters/filters',
    'angular-resource',
    'angular-route',
    'angular-strap',
    'ui-select2',
    'angular-xeditable'
], function (routes, services, controllers, directives, filters) {

    var initialize = function () {

        var mainModule = angular.module('sufsys',
            ['ngResource', 'ngRoute', '$strap.directives', 'ui.select2', "xeditable"]);

        mainModule.value('$strapConfig', {
            datepicker: {
                language: 'zh-CN',
                format: 'yyyy-mm-dd'
            }
        });

        routes.initialize(mainModule);
        services.initialize(mainModule);
        directives.initialize(mainModule);
        filters.initialize(mainModule);
        controllers.initialize(mainModule);

        angular.bootstrap(document, ['sufsys']);
    };

    return {
        initialize: initialize
    };
});