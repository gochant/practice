define([
  'underscore',
  './dayFilter'
// �ֶ���д�µ�·��
], function (_, dayFilter) {

    // �������·��
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
