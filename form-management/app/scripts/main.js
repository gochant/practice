// requirejs 的配置
require.config({
    //  baseUrl: './scripts',
    paths: {
        'views': '../views',
        'jquery': '../vendor/jquery/jquery-1.10.2',
        'angular': '../vendor/angular/angular',
        'angular-resource': '../vendor/angular/angular-resource',
        'angular-route': '../vendor/angular/angular-route',
        'angular-strap': '../vendor/angular/angular-strap',
        'underscore': '../vendor/underscore/underscore',
        'text': '../vendor/requirejs/text',
        'bootstrap': '../vendor/bootstrap/js/bootstrap',
        'strap-datepicker': '../vendor/bootstrap/js/bootstrap-datepicker',
        'select2': '../vendor/select2/select2',
        'ui-select2': '../vendor/angular/ui-select2',
        'angular-xeditable': '../vendor/angular-xeditable/js/xeditable',
        'underscore.string': '../vendor/underscore/underscore.string'
    },
    shim: {
        'angular': { 'exports': 'angular', deps: ['jquery'] },
        'underscore': { 'exports': '_' },
        'jquery': { 'exports': 'jquery' },
        'bootstrap': { deps: ['jquery'] },
        'strap-datepicker': { deps: ['bootstrap'] },
        'angular-resource': { deps: ['angular'] },
        'angular-route': { deps: ['angular'] },
        'angular-strap': { deps: ['angular', 'strap-datepicker'] },
        'angular-xeditable': { deps: ['angular'] },
        'ui-select2': { deps: ['angular', 'select2'] },
        'ng-table': { deps: ['jquery', 'angular'] },
        'select2': { deps: ['jquery'] },
        'underscore.string': { deps: ['underscore'] }
    }
});


// 启动程序
define([], function () {
    require(['app'], function (App) {
        App.initialize();
    });
});