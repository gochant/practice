define([
  'underscore',
  './dayFilter'
// 手动填写新的路由
], function (_, dayFilter) {

    // 这里添加路由
    var filters = _.extend({}, dayFilter);

    var initialize = function (angModule) {

        _.each(filters, function (filter, name) {
            angModule.filter(name, filter);
        });
    };


    return {
        initialize: initialize
    };
})
