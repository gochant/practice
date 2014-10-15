// 管理出访相关控制器
define([
    'jquery',
    'require',
    'bootstrap',
    'select2'
], function ($, require) {
    return {
        // 出访列表
        'visitCtrl': ['$scope', 'Visit', '$location', function ($scope, Visit, $location) {

            $scope.visits = Visit.query();

            $scope.edit = function (id, e) {
                e.preventDefault();
                $location.path('/visit/view/' + id);
            };

            $scope.new = function (e) {
                e.preventDefault();
                $location.path('/visit/view/' + '-1');
            };

            $scope.refresh = function () {
                $scope.visits = Visit.query();
            };

            $scope.remove = function (id, e) {
                e.preventDefault();
                if (window.confirm('您确认删除这条记录？')) {
                    // TODO:
                    Visit.remove(id);
                }
            };
        }],
        // 出访详细信息
        'visitDetailCtrl': ['$rootScope', '$scope', 'Visit', 'Journey', 'Member', '$routeParams', '$modal', '$q', '$filter',
    function ($rootScope, $scope, Visit, Journey, Member, $routeParams, $modal, $q, $filter) {

        var modal = function (name, scope) {
            return $modal({
                template: 'views/visit/partials/' + name + '.html',
                persist: true,
                show: false,
                backdrop: false,
                scope: scope
            });
        };


        // 获取该出访的数据
        if ($routeParams.visitId === '-1') {
            $scope.visit = Visit.get({ visitId: $routeParams.visitId });
        } else {
            $scope.visit = new Visit({
                begin_date: '2013-9-5',
                end_date: '2013-9-6',
                days: 7,
                group_unit: 'xxxxx大学',
                send_unit: 'xxxxx大学',
                approval_unit: 'xxxxx大学',
                task: '',
                lead_id: '',
                cost_qz: 0,
                cost_gncl: 0,
                cost_gjjp: 0,
                cost_zs: 0,
                cost_bx: 0,
                cost_zc: 0,
                cost_hs: 0,
                cost_gz: 0,
                cost_ly: 0,
                cost_other: 0,
                cost_total: 0
            });
        }

        $scope.journeys = Journey.query({ visitId: $routeParams.visitId });

        $scope.members = Member.query({ visitId: $routeParams.visitId });

        $scope.$watch(function () {
            return new Date($scope.visit.end_date) - new Date($scope.visit.begin_date);
        }, function () {
            $scope.visit.days = parseInt(Math.abs(new Date($scope.visit.end_date) - new Date($scope.visit.begin_date))
                / (1000 * 60 * 60 * 24) + 1);
        });
        // TODO: 获取系统中所有的用户

        $scope.exchange_rate = 6.0;  // 汇率
        $scope.zsbz = 50;
        $scope.hsbz = 100;
        $scope.gzbz = 120;
        //$scope.costChange = function (e, type) {
        //    var $el = $(e.target),
        //        val = $el.val();
        //    if (type === 'rmb') {
        //        $scope.visit[$el.attr('name')] = val;
        //    } else {
        //        $scope.visit[$el.attr('name')] = val * exchange_rate;
        //    }
        //};
        $scope.$watch('zsbz', function (value) {
            $scope.visit['cost_zs'] = value * $scope.members.length * 5;
        });

        $scope.back = function () {
            window.history.go(-1);
        };
        $scope.showLead = function (e) {
            var selected = _($scope.members).filter(function (m) {
                return m.id === $scope.visit.lead_id;
            });
            return ($scope.visit.lead_id && selected.length) ? selected[0].name : '未设置';
        };

        $scope.addMember = function () {
            var visitId = $routeParams.visitId;
            var scope = $rootScope.$new();
            var dlg;
            scope.members = this.members;
            scope.selectOption = {
                placeholder: "请选择要添加的组员",
                allowClear: true
            };
            scope.confirmAdd = function () {
                var id = this.selPerson;
                this.hide();
                scope.members.push({
                    id: '3',
                    name: '王五'
                });
            };
            scope.selPerson = '';
            scope.allPersons = [{
                id: '1',
                name: '张三'
            }, {
                id: '2',
                name: '李四'
            }];

            dlg = modal('memberDlg', scope);
            $q.when(dlg).then(function (modalEl) {
                modalEl.modal('show');
            });
        };

        $scope.addJourney = function () {
            var journeyModal = modal('journeyDlg');
            $q.when(journeyModal).then(function (modalEl) {
                modalEl.modal('show');
            });
        };

    }],
        // 出访表格
        'visitTableCtrl': ['$scope', function ($scope) {

            $scope.tables = [{
                name: 'xxxxx大学教师因公出国（境）申请表',
                amount: 1,
                completeness: '80%'
            }, {
                name: '因公临时出国人员备案表',
                amount: 4,
                completeness: '60%'
            }, {
                name: '因公出国（境）人员审批表',
                amount: 1,
                completeness: '60%'
            }, {
                name: '因公出国（赴港澳）任务申报表',
                amount: 1,
                completeness: '60%'
            }, {
                name: 'xxx省因公出国电子护照申请表',
                amount: 1,
                completeness: '60%'
            }];

            $scope.edit = function (name) {

                var $modal = $('#modal');
                $modal
                   // .empty()
                    .modal()
                    .on('shown.bs.modal', function () {
                        require(['text!views/visit/' + name + '.html'], function (html) {
                            $modal.find('.modal-body').html(html);
                        });
                    });
            };
        }]
    };
});