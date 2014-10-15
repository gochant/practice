// ��ͼ��������
define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojo/topic',
    'dojo/parser'
], function (declare, domConstruct, topic, parser) {

    return declare(null, {
        // ���� widget �ڲ�ʵ��
        _instance: function () { },
        // ��������Ԫ��
        _parse: function () {
            parser.parse(this.el);
        },
        // ��������Ԫ��
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
        // ��ʼ�� widget
        init: function () {
            this._parse();
            this._instance();
            this.startup();
        },
        // ���� widget �ڲ�����
        invoke: function (method, arguments) {
            this.instance[method].call(this.instance, arguments);
        },
        // ���� widget
        startup: function () {
            this.instance.startup();
            this.started = true;
        },
        // ���� widget
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
