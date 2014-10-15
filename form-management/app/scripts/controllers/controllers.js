// controller³õÊ¼»¯Æ÷
define([
 'underscore',
 'controllers/mainCtrl',
 'controllers/visitCtrl',
 'controllers/personCtrl',
 'controllers/countryCtrl',
 'controllers/unitCtrl'
], function (_, mainCtrl, visitCtrl, personCtrl, countryCtrl, unitCtrl) {
    "use strict";

    var controllers = _.extend({}, mainCtrl, visitCtrl, personCtrl, countryCtrl, unitCtrl);

    var initialize = function (angModule) {

        _.each(controllers, function (controller, name) {
            angModule.controller(name, controller);
        });
    };

    return {
        initialize: initialize
    };
});
