// 管理出访相关控制器
define([
    'jquery',
    'require',
    'bootstrap'
], function ($, require) {
    return {
        'countryCtrl': ['$scope', '$location', 'Country', function ($scope) {
            $scope.$on('selectedChange', function (e, id) {
                $scope.$broadcast('selectedChange:broad', id);
            });
        }],
        'countryListCtrl': ['$scope', 'Country', '$location', function ($scope, Country) {

            var entities = Country.query(function (result) {
                if (result.length > 0) {
                    $scope.selectedId = _(result).first().id;
                }
            });

            $scope.entities = entities;
            $scope.selectedIndex = 0;
            $scope.selectedId = -1;

            $scope.selectRow = function (e, index, id) {
                e.preventDefault();
                if ($scope.selectedIndex === index) return;
                $scope.selectedIndex = index;
                $scope.selectedId = id;

            };

            $scope.addNew = function () {
                var newEntity = new Country({
                    // 'First'
                });
            };

            $scope.$watch('selectedId', function (id) {
                $scope.$emit('selectedChange', id);
            });
        }],
        // 人员详细信息
        'countryDetailCtrl': ['$scope', 'Country',
            function ($scope, Country) {

                var defaults = new Country({
                    'cname': '新建国家'
                });
                $scope.master = defaults;

                $scope.$on('selectedChange:broad', function (e, id) {
                    $scope.load(id);
                });
                $scope.load = function (id) {
                    if (id !== -1) {
                        $scope.entity = Country.get({ id: id }, function (u) {
                            $scope.master = angular.copy(u);
                        }, function () {
                            $scope.master = defaults;
                        });
                    } else {
                        $scope.entity = $scope.master;
                    }
                };

                // --方法

                // 重置
                $scope.reset = function () {
                    $scope.entity = angular.copy($scope.master);
                };


                // 更新
                $scope.update = function (person) {
                    console.log('提交');
                    // 与后台交互
                    $scope.entity.$save(function () {
                        console.log('提交成功！');
                    });
                    $scope.master = angular.copy(entity);
                };

            }]
    };
});