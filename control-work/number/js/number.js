+(function () {

    var ui = kendo.ui,
        Widget = ui.Widget,
        extend = $.extend,
        proxy = $.proxy,
        each = $.each;


    var Number = Widget.extend({
        init: function (element, options) {
            Widget.fn.init.call(this, element, options);
            this._element();
        },
        options: {
            name: 'number'
        },
        _element: function () {

        }
    });

    ui.plugin(Number);

})();
