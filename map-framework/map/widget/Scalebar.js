// 比例尺
define([
    'dojo/_base/declare',
    './MapWidgetBase',
    'esri/dijit/Scalebar'
], function (declare, MapWidgetBase, Scalebar) {

    return declare([MapWidgetBase], {

        constructor: function (options) {
            this.instance = new Scalebar({
                map: options.map.instance,
                scalebarUnit: "metric"
            });
        }
    });
});
