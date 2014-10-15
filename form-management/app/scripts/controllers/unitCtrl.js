// 管理出访相关控制器
define([
    'jquery',
    'require',
    'bootstrap',
    'underscore.string'
], function ($, require) {
    return {
        // 出访列表
        'unitCtrl': ['$scope', '$location', 'Unit', function ($scope, $location, Unit) {

            $scope.$on('selectedChange', function (e, id) {
                $scope.$broadcast('selectedChange_b', id);
            });

        }],
        'unitListCtrl': ['$scope', '$location', 'Unit', function ($scope, $location, Unit) {

            $scope.units = Unit.query(function (result) {
                if (result.length > 0) {
                    $scope.selectedId = _(result).first().id;
                }
            });

            $scope.selectedIndex = 0;
            $scope.selectRow = function (e, index, id) {
                e.preventDefault();
                $scope.selectedIndex = index;
                $scope.selectedId = id;
            };

            $scope.$watch('selectedId', function (id) {
                $scope.$emit('selectedChange', id);
            });
        }],
        'unitDetailCtrl': ['$scope', '$location', 'Unit', function ($scope, $location, Unit) {
            var newObj = new Unit({
                'id': -1,
                'name': '新建单位',
                'classes': '00000000'
            });
            $scope.classes = [{
                index: 0,
                name: '组团单位'
            }, {
                index: 1,
                name: '邀请单位'
            }, {
                index: 2,
                name: '派员单位'
            }, {
                index: 3,
                name: '审批单位'
            }];
            $scope.toggleSelection = function (cls, e) {
                if ($scope.unit.classes.length <= cls) {
                    $scope.unit.classes = _($scope.unit.classes).pad(cls + 1, '0', 'right');
                }
                _($scope.unit.classes).splice(cls, 1, $(e.target).prop('checked') === true ? '1' : '0');
            };
            $scope.master = newObj;
            $scope.unit = newObj;
            $scope.$on('selectedChange_b', function (e, id) {
                $scope.load(id);
            });
            $scope.load = function (id) {
                if (id !== -1) {
                    $scope.unit = Unit.get({ unitId: id }, function (u) {
                        $scope.master = angular.copy(u);
                    }, function () {
                        $scope.master = newObj;
                        //   $scope.unit = angular.copy(unit);
                    });
                }
            };
        }]
    };
});