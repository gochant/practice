// 管理出访相关控制器
define([
    'jquery',
    'require',
    'bootstrap',
    'select2'
], function ($, require) {
    return {
        // 出访列表
        'ngslAffix': function () {
            return {
                link: function (scope, elements, attrs, controller) {
                    $(elements).affix({
                        offset: {
                            top: 60
                        }
                    });
                }
            };
        },
        'ngslTab': function () {
            return {
                link: function (scope, elements, attrs, controller) {
                    $(elements).find('a').click(function (e) {
                        e.preventDefault();
                        $(this).tab('show');
                    });
                    $(elements).find('a:first').tab('show');
                }
            };
        },
        'ngslSelect2': function () {
            return {
                link: function (scope, elements, attrs, controller) {
                    attrs.ngslSelect2 && $(elements).select2(JSON.parse(attrs.ngslSelect2));
                }
            };
        },
        'ngslSidebar': function () {
            return {
                link: function (scope, elements, attrs, controller) {
                    var $el = $(elements);
                    $el.find('.submenu > a').click(function (e) {
                        e.preventDefault();
                        var submenu = $(this).siblings('ul');
                        var li = $(this).parents('li');
                        var submenus = $el.find('li.submenu ul');
                        var submenus_parents = $el.find('li.submenu');
                        if (li.hasClass('open')) {
                            if (($(window).width() > 768) || ($(window).width() < 479)) {
                                submenu.slideUp();
                            } else {
                                submenu.fadeOut(250);
                            }
                            li.removeClass('open');
                        } else {
                            if (($(window).width() > 768) || ($(window).width() < 479)) {
                                submenus.slideUp();
                                submenu.slideDown();
                            } else {
                                submenus.fadeOut(250);
                                submenu.fadeIn(250);
                            }
                            submenus_parents.removeClass('open');
                            li.addClass('open');
                        }
                    });

                    var ul = $el.find(' > ul');

                    $el.find(' > a').click(function (e) {
                        e.preventDefault();
                        var sidebar = $el;
                        if (sidebar.hasClass('open')) {
                            sidebar.removeClass('open');
                            ul.slideUp(250);
                        } else {
                            sidebar.addClass('open');
                            ul.slideDown(250);
                        }
                    });
                }
            };
        }
    };
});