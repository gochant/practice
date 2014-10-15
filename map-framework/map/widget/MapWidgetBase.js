// 地图部件基类
define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/topic',
    'dojo/parser'
], function (declare, domConstruct, topic, parser) {

    return declare(null, {
        // 生成 widget 内部实例
        _instance: function () { },
        // 解析宿主元素
        _parse: function () {
            parser.parse(this.el);
        },
        // 生成宿主元素
        _element: function (tpl) {
            if (tpl) {
                var dom = domConstruct.toDom(tpl);
                this.el = dom.children[0];
            } else {
                this.el = domConstruct.create("div");
            }
        },
        _initBaseAttr: function (name, title, options) {
            this.name = name;
            this.title = title;
            this.started = false;
            this.map = options.map;
        },
        // 初始化 widget
        init: function () {
            this._parse();
            this._instance();
            this.startup();
        },
        // 调用 widget 内部方法
        invoke: function (method, arguments) {
            this.instance[method].call(this.instance, arguments);
        },
        // 启动 widget
        startup: function () {
            this.instance.startup();
            this.started = true;
        },
        // 激活 widget
        active: function () {
            var me = this;

            topic.publish("map.activeWidget", {
                widget: this
            }, function () {
                if (!me.started) {
                    me.init();
                }
            });
        }
    });
});
