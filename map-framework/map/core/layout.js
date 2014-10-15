// 公共代码
define([
    'dijit/layout/ContentPane',
    'dijit/registry',
    'dojo/topic',
    'dojo/dom'
], function (ContentPane, registry, topic, dom) {

    return function (map) {
        var tabs = registry.byNode(dom.byId('sidePane'));

        topic.subscribe('map.activeWidget', function (data, callback) {
            var pane = new ContentPane({
                title: data.widget.title,
                closable: true,
                content: data.widget.el
            });
            tabs.addChild(pane);
            tabs.selectChild(pane);
            callback();
        });
    };
});
