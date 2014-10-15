// 图例
define([
    'dojo/_base/declare',
    './MapWidgetBase',
    'dojo/dom-construct',
    "esri/dijit/Legend",
    'esri/Color',
    'esri/units',
    'dojo/topic'
], function (declare, MapWidgetBase, domConstruct, Legend, Color, Units, topic) {

    return declare([MapWidgetBase], {
        constructor: function (options) {
            this._initBaseAttr('Legend', '图例', options);

            this._element();

            this.active();
        },
        init: function () {
            this._parse();
            this._instance();
            this.startup();
        },
        _instance: function () {
            var legend = new Legend({
                map: this.map.instance
                ,
                layerInfos: this.map.legendLayers
            }, this.el);
            legend.startup();

            this.instance = legend;
        }
    });
});
