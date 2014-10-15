// 测量工具
define([
    'require',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojox/lang/functional'
], function (require, declare, lang, array, functional) {

    var WidgetManager = declare(null, {
        constructor: function (map, widgets) {
            this._widgets = widgets || [];
            this.map = map;
            // 各小挂件触发时机
            this._when = {
                'load': ['Measurement', 'OverviewMap', 'Scalebar'],
                'layers-add-result': ['Legend']
            };
        },
        init: function () {
            // name, options
            var me = this;
            var paths = array.map(this._widgets, function (widget, i) {
                if (lang.isString(widget)) {
                    widget = me._widgets[i] = {
                        name: widget
                    };
                }
                if (!widget.source) widget.source = '../widget/';
                if (!widget.options) widget.options = {};
                widget.options.map = me.map;

                var path = widget.source + widget.name;
                return path;
            });
            functional.forEach(this._when, function (value, index) {
                me.map.instance.on(index, function () {
                    me._loadWidgets(paths, index);
                });
            });
        },
        _loadWidgets: function (widgetPaths, when) {
            var me = this;
            require(widgetPaths, function () {
                array.forEach(arguments, function (widget, i) {
                    var widgetConfig = me._widgets[i];
                    if (array.indexOf(me._when[when], widgetConfig.name) >= 0) {
                        new widget(widgetConfig.options);
                    }
                });
            });
        }
    });

    return WidgetManager;
});
