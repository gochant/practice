
var testApp = angular.module('TestApp', []);

testApp.controller('MainCtrl', function ($scope) {

    $scope.collection = [{
        val1: 'group1',
        val2: 'person1',
        val3: 'foo'
    }, {
        val1: 'group1',
        val2: 'person1',
        val3: 'foo'
    }, {
        val1: 'group1',
        val2: 'person1',
        val3: 'foo'
    }, {
        val1: 'group1',
        val2: 'person1',
        val3: 'foo'
    }, {
        val1: 'group1',
        val2: 'person1',
        val3: 'foo'
    }, {
        val1: 'group1',
        val2: 'person1',
        val3: 'foo'
    }, {
        val1: 'group1',
        val2: 'person1',
        val3: 'foo'
    }, {
        val1: 'group1',
        val2: 'person1',
        val3: 'foo'
    }];

    $scope.groups = [{
        name: 'group1',
        members: ['person1', 'person2', 'person3']
    }, {
        name: 'group2',
        members: ['person4', 'person5', 'person6']
    }];

    $scope.getMembers = function (name) {
        for (var i = 0, len = $scope.groups.length; i < len; i++) {
            if ($scope.groups[i].name === name) {
                return $scope.groups[i].members;
            }
        }
        return [];
    }

    // keyborad nav
    $scope.nav = function (e) {
        var new_x, new_y, old_x, old_y;
        var $tbody = $(e.target).closest('tbody');
        var $target = $(e.target);
        var max_x = 2, max_y = $scope.collection.length - 1;
        old_x = parseInt($target.attr('data-x'), 10);
        old_y = parseInt($target.attr('data-y'), 10);
        new_x = old_x;
        new_y = old_y;
        if (e.which === 9) {
            if (old_x === max_x && old_y === max_y) {
                $scope.collection.push({
                    val1: 'group1',
                    val2: 'person1',
                    val3: 'foo'
                });
                $tbody.find('.input[data-x=0][data-y=' + $scope.collection.length + ']').focus();
                return;
            }
        }
        switch (e.which) {
            case 37:
                new_x = old_x - 1;
                break;
            case 38:
                new_y = old_y - 1;
                break;
            case 39:
                new_x = old_x + 1;
                break;
            case 40:
                new_y = old_y + 1;
                break;
            default:
                return;
        }
        e.preventDefault();

        new_x = new_x < 0 ? max_x : new_x;
        new_x = new_x > max_x ? 0 : new_x;
        new_y = new_y < 0 ? max_y : new_y;
        new_y = new_y > max_y ? 0 : new_y;
        $tbody.find('.input[data-x=' + new_x + '][data-y=' + new_y + ']').focus();

    }

    // on click
    $scope.focus = function (e) {
        $(e.target).focus();
    }

});