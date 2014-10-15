// 地图
define([
    'dojo/_base/declare',
    'esri/map',
    './WidgetManager'
], function (declare, EsriMap, WidgetManager) {

    var Map = declare(null, {
        constructor: function (options) {
            this.layers = [];
            this.legendLayers = [];  // 显示到图例中的图层
            this.instance = new EsriMap(options.el, options.mapOptions);
            this.widgetManager = new WidgetManager(this, options.widgets);
        }
    });

    return Map;
});
