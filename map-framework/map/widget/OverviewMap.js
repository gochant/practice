// 鹰眼图
define([
    'dojo/_base/declare',
    'esri/dijit/OverviewMap',
    './MapWidgetBase'
], function (declare, OverviewMap, MapWidgetBase) {

    return declare([MapWidgetBase], {
        constructor: function (options) {
            var overviewMapDijit = new OverviewMap({
                map: options.map.instance,
                visible: true
            });
            this.instance = overviewMapDijit;
            overviewMapDijit.startup();
        }
    });
});
