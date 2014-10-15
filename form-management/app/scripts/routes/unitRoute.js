define([
    'text!views/unit/index.html'
], function (unitTpl) {
    return {
        unit: {
            title: '单位管理',
            route: '/unit',
            controller: 'unitCtrl',
            template: unitTpl
        }
    };

});