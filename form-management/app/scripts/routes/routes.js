define([
  'underscore',
  './mainRoute',
  './visitRoute',
  './personRoute',
 './countryRoute',
 './unitRoute'
// �ֶ���д�µ�·��
], function (_, mainRoute, visitRoute, personRoute, countryRoute, unitRoute) {

    // �������·��
    var routes = _.extend({}, mainRoute, visitRoute, personRoute, countryRoute, unitRoute);

    var setUpRoutes = function (angModule) {

        angModule.config(function ($routeProvider) {

            _.each(routes, function (value, key) {
                $routeProvider.when(value.route, {
                    template: value.template,
                    controller: value.controller,
                    title: value.title
                });
            });

            //  $routeProvider.otherwise({ redirectTo: routes.home.route });
        });

        //angModule.run(function ($rootScope) {
        //    $rootScope.$on('$routeChangeSuccess', function (next, last) {
        //        Console.debug("Navigating from ", last);
        //        Console.debug("Navigating to   ", next);
        //    });
        //});
    };


    return {
        initialize: setUpRoutes
    };
})
