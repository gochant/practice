define([
    'text!views/country/index.html'
], function (countryTpl) {
    return {
        countryList: {
            title: '国家管理',
            route: '/country',
            controller: 'countryCtrl',
            template: countryTpl
        }
    };

});