// 主控制器

define(['jquery'], function ($) {

    return {
        'mainCtrl': ['$scope', function ($scope) {
            $scope.partial = {
                navbar: 'views/partials/navbar.html',
                footer: 'views/partials/footer.html',
                sidebar: 'views/partials/sidebar.html'
            };

            $scope.actions = [{
                name: '管理你的表单任务',
                href: '#',
                head: true
            }, {
                name: '人员出访申请',
                href: '#/visit'
            }, {
                name: '基础数据维护',
                head: true
            }, {
                name: '人员信息管理',
                href: '#/person'
            }, {
                name: '国家信息管理',
                href: '#/country'
            }];

            $scope.sysData = {
                name: 'Form.App',
                copyright: 'xxxxxxxxxxx'
            };



        }]
    };
});