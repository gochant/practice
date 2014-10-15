// ‘出访管理’路由
define([
    'text!views/visit/list.html',
    'text!views/visit/detail.html'
], function (visitTpl, visitDetailTpl) {
    return {
        visit: {
            title: '出访',
            route: '/visit',
            controller: 'visitCtrl',
            template: visitTpl
        },
        visitDetail: {
            title: '出访详情',
            route: '/visit/view/:visitId',
            controller: 'visitDetailCtrl',
            template: visitDetailTpl
        }
    };

});