// 测量工具
define([
    'dojo/_base/declare',
    './MapWidgetBase',
    'esri/dijit/Measurement',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/Color',
    'esri/units',
    'dojo/text!./measurement.html'
], function (declare, MapWidgetBase, Measurement,
    SimpleLineSymbol, SimpleMarkerSymbol, Color, Units, tpl) {

    return declare([MapWidgetBase], {
        constructor: function (options) {
            // 公共属性
            this._initBaseAttr('Measurement', '测量工具', options);

            this._element(tpl);
            this.active();
        },
        _instance: function () {
            // 默认点symbol
            var pms = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 3), new Color([0, 255, 0, 0.25]));
            // 默认线symbol
            var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
              new Color([255, 0, 0, .55]), 4);

            var measurement = new Measurement({
                map: this.map.instance,
                defaultAreaUnit: Units.SQUARE_METERS,
                defaultLengthUnit: Units.KILOMETERS,
                lineSymbol: sls,
                pointSymbol: pms
            }, this.el);

            this.instance = measurement;

            this._listen();
        },
        _listen: function () {
            // this.instance.on('measure-end', function (e) { });
        },
        //  触发器设置
        trigger: function () {
            var me = this;
            var button = new Button({
                label: "测量",
                onClick: function () {
                    // Do something:

                }
            });

            button.startup();

            return button;
        }
    });
});
