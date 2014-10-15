// 管理出访相关控制器
define([
    'jquery',
    'require',
    'bootstrap'
], function ($, require) {
    return {
        // 出访列表
        'personCtrl': ['$scope', 'Person', '$location', function ($scope, Person, $location) {

            $scope.$on('selectedChange', function (e, personId) {
                $scope.$broadcast('personChange', personId);
            });

        }],
        'personListCtrl': ['$scope', 'Person', '$location', function ($scope, Person, $location) {

            var persons = Person.query(function (result) {
                if (result.length > 0) {
                    $scope.currPersonId = _(result).first().id;
                }
            });

            $scope.persons = persons;
            $scope.selectedIndex = 0;
            $scope.currPersonId = -1;

            $scope.selectRow = function (e, index, personId) {
                e.preventDefault();
                if ($scope.selectedIndex === index) return;
                $scope.selectedIndex = index;
                $scope.currPersonId = personId;

            };

            $scope.addNew = function () {
                var newPerson = new Person({
                    // 'First'
                });
            };

            $scope.$watch('currPersonId', function (personId) {
                $scope.$emit('selectedChange', personId);
            });
        }],
        // 人员详细信息
        'personDetailCtrl': ['$scope', 'Person', 'DataDictionary', '$location', '$routeParams',
            function ($scope, Person, DataDictionary, $location, $routeParams) {

                $scope.tags = {
                    1: '新添加的用户',
                    2: '已保存',
                    3: '未保存'
                };

                $scope.tag = 1;
                // 初始对象
                var defaultPerson = new Person({
                    'First': '未知'
                });
                $scope.master = defaultPerson;

                // 职业属性
                $scope.professionAttrs = DataDictionary.get({ type: 'professionAttrs' });
                // 行政等级
                $scope.adminLevels = DataDictionary.get({ type: 'adminLevels' });
                // 政治面貌
                $scope.politicalStatus = DataDictionary.get({ type: 'politicalStatus' });
                // 证件类型
                $scope.certTypes = DataDictionary.get({ type: 'certTypes' });

                $scope.$on('personChange', function (e, personId) {
                    $scope.load(personId);
                });
                $scope.load = function (personId) {
                    if (personId !== -1) {
                        $scope.person = Person.get({ personId: personId }, function (u) {
                            $scope.master = angular.copy(u);
                        }, function () {
                            $scope.master = defaultPerson;
                            $scope.person = angular.copy(person);
                        });
                    }
                };

                // --方法

                // 重置
                $scope.reset = function () {
                    $scope.person = angular.copy($scope.master);
                };


                // 更新
                $scope.update = function (person) {
                    console.log('提交');
                    // 与后台交互
                    $scope.person.$save(function () {
                        console.log('提交成功！');
                    });
                    $scope.master = angular.copy(person);
                };

            }],
        'personMemberCtrl': ['$scope', 'Person', '$modal', '$q', function ($scope, Person, $modal, $q) {
            var modalPromise = $modal({
                template: 'views/person/partials/member.html',
                persist: true,
                show: false,
                backdrop: false,
                scope: $scope
            });

            $scope.addMember = function () {
              
                $q.when(modalPromise).then(function (modalEl) {
                    modalEl.modal('show');
                });
            };
        }]
    };
});