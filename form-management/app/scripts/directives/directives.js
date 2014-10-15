// controller³õÊ¼»¯Æ÷
define([
 'underscore',
 './bootstrapDrct',
], function (_, bootstrapDrct) {
    "use strict";

    var directives = _.extend({}, bootstrapDrct);

    var initialize = function (angModule) {

        _.each(directives, function (directive, name) {

            angModule.directive(name, directive);
        });
    };

    return {
        initialize: initialize
    };
});