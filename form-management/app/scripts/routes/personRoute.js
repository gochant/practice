define([
    'text!views/person/index.html'
], function (personTpl, personDetailTpl) {
    return {
        personList: {
            title: '人员列表',
            route: '/person',
            controller: 'personCtrl',
            template: personTpl
        }
    };

});