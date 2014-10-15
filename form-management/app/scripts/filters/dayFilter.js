// 管理出访相关控制器
define([
    'jquery'
], function ($) {
    return {
        // 出访列表
        'days': function () {
            return function (input, d1, d2) {
                var out = (new Date(d2) - new Date(d1)) / (1000 * 60 * 60 * 24) + 1;
                input = out;
                return input;
            };
        }
    };
});