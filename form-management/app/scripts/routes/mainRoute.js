// 主路由
define([
    'text!views/main.html'
], function (mainTpl) {
    return {
        home: {
            title: '主页',
            route: '/home',
            controller: 'mainCtrl',
            template: mainTpl
        }
    };
});