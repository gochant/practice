+(function () {

    var ui = kendo.ui,
        Widget = ui.Widget,
        extend = $.extend,
        proxy = $.proxy,
        each = $.each;

    // 自定义绑定
    kendo.data.binders.widget.options = kendo.data.Binder.extend({
        init: function (widget, bindings, options) {
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);

            this.widget = widget;
        },
        refresh: function () {
            var widget = this.widget;
            widget.setOptions(this.bindings.options.get());
        }
    });

    kendo.data.binders.widget.selected = kendo.data.Binder.extend({
        init: function (widget, bindings, options) {
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
            this._change = $.proxy(this.change, this);
            this.widget = widget;
            widget.bind('select', this._change);
        },
        change: function (value) {
            this.bindings['selected'].set(value);
        },
        refresh: function () {
            var widget = this.widget;
            widget.select(this.bindings.selected.get());
        }
    });

    var Tree = Widget.extend({
        init: function (element, options) {
            Widget.fn.init.call(this, element, options);
        },
        options: {
            name: 'jstree'
        },
        setOptions: function (options) {
            Widget.fn.setOptions.call(this, options);
            this._element(options.toJSON());
        },
        select: function (value) {
            if (!value) return;
            var instance = this.instance;
            instance.deselect_all();
            instance.select_node(value);
        },
        _element: function (options) {
            var me = this;
            this.instance = $(this.element)
                .on("select_node.jstree", function (e, data) {
                    if (data.selected.length) {
                        var value = data.instance.get_node(data.selected[0]);
                        me.trigger('select', value.id);
                    }
                })
                .jstree($.extend(true, {
                    core: {
                        multiple: false,
                        animation: false,
                        data: {
                            success: function (resp) {
                                options.mapping
                            }
                        },
                        themes: {
                            name: 'proton',
                            responsive: false
                        },
                        expand_selected_onload: true,
                        strings: {
                            'Loading ...': '加载中 ...'
                        }
                    },
                    plugins: ['wholerow']
                }, options)).jstree(true);
        }
    });

    ui.plugin(Tree);

})();
