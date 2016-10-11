;(function ($, window, document, undefined) {

    "use strict";

    // #region Utility

    // 判断连接器是否指向了自己
    var isConnectToSelf = function (param) {
        return param.sourceId === param.targetId;
    };
    var isFromStartToEnd = function (param, prefix) {
        prefix || (prefix = 'step_');
        return param.sourceId === prefix + '-1' && param.targetId === prefix + '0';
    };
    // 判断连接步骤是否重复
    var stepIsRepeat = function (param, instance) {
        // 获取同一scope下的链接器，判断当前链接是否有重复
        var cnts = instance.getConnections(param.scope);
        if (cnts.length > 0) {
            for (var i = 0, len = cnts.length; i < len; i++) {
                // 如果有链接器 sourceId 及 targetId 都相等，那大概也许可能就相等了。
                if (param.sourceId === cnts[i].sourceId && param.targetId === cnts[i].targetId) {
                    return true;
                }
            }
        }
        return false;
    };

    // #endregion


    var pluginName = "yutflow";
    var defaults = {
        nodeTpl: _.template($('#tpl-node').html()),
        contextMenu: '#context-menu',
        editable: true,
        draggable: true,
        selectable: true,
        nodeOptions: {
            prefix: "step_",
            cls: "wf-node",
            startCls: 'wf-node wf-node-start',
            endCls: 'wf-node wf-node-end',
            autoNamePrefix: '步骤',
            activeCls: "wf-node-active",
            draggable: true,
            isSource: true,
            isTarget: true,
            detach: true,
            sourceOptions: {filter: ".wf-handle, .wf-handle i"},
            targetOptions: {dropOptions: {hoverClass: "wf-node-hover"}}
        }
    };

    function Plugin(element, options) {
        this.element = element;

        // init options
        this.settings = $.extend(true, {}, defaults, options);
        if (this.settings.editable === false) {
            this.settings.nodeOptions.isSource = false;
            this.settings.nodeOptions.isTarget = false;
            this.settings.nodeOptions.detach = false;
        }
        if (this.settings.draggable !== this.settings.nodeOptions.draggable) {
            this.settings.nodeOptions.draggable = this.settings.draggable;
        }

        // init properties

        this._defaults = defaults;
        this._name = pluginName;

        // 属性

        // 数据缓存
        this._nodeCache = {}; // 节点缓存
        this._connectCache = {};  // 连接缓存


        this.init();
    }

    // #region Private Methods


    // #endregion

    $.extend(Plugin.prototype, {
        init: function () {
            this._initContainer();
            this._bindEvents();
            this._initInstance();
            this._initContextMenu();

            this.render(this.settings.data);
        },
        _initContainer: function () {
            this.$container = $('<div class="wf-container"></div>').appendTo(this.element);
            if (this.settings.editable) {
                this.$container.addClass('editable');
            }
            if (this.settings.editable) {
                this.$container.addClass('editable');
            }
        },
        _initInstance: function () {
            var that = this;
            var jsPlumbDefaults = {
                Endpoint: "Blank",
                // Endpoint:[ "Dot", { radius:5 } ],
                // EndpointStyle:{ fillStyle:"transparent" },
                // EndpointHoverStyle:{ fillStyle:"#ffa500" },

                Connector: "Flowchart",

                ConnectionOverlays: [
                    ["Arrow", {
                        location: 1,
                        id: "arrow",
                        length: 14,
                        foldback: 0.6
                    }]
                ],

                ConnectionsDetachable: false,
                ReattachConnections: false,

                // LogEnabled: true, // 调试模式
                // 锚点自动调整位置
                Anchor: "Continuous",
                // Anchor: [[0, 0.5, 1, 0], [1, 0.5, 1, 0]],
                // 连接器样式
                PaintStyle: {
                    strokeStyle: "#EE8C0C",
                    lineWidth: 3,
                    dashstyle: "0",
                    outlineWidth: 4,
                    outlineColor: "transparent"
                }
            };

            if (this.settings.nodeOptions.detach) {
                jsPlumbDefaults.HoverPaintStyle = {
                    strokeStyle: "#B2C0D1",
                    lineWidth: 3,
                    dashstyle: "4 1"
                }
            }

            var instance = this.instance = jsPlumb.getInstance(jsPlumbDefaults);

            instance.bind("beforeDrop", function (param) {

                if (isConnectToSelf(param)) {
                    return false;
                }
                if (stepIsRepeat(param, instance)) {
                    return false;
                }
                if (isFromStartToEnd(param, that.settings.nodeOptions.prefix)) {
                    return false;
                }
                return true;
            });


            if (this.settings.nodeOptions.detach) {
                var connectCache = this._connectCache;
                instance.bind("connectionDetached", function (con) {
                    if (con && con.connection) {
                        delete connectCache[con.connection.id];
                    }
                });

                // 删除连接线
                instance.bind('click', function (con) {
                    instance.detach(con);
                });
            }

            return this.instance;
        },
        _initContextMenu: function () {
            var me = this;
            if (!this.settings.contextMenu) {
                return;
            }
            this.$container.contextmenu({
                target: this.settings.contextMenu,
                before: function (e, element, target) {
                    var $node = $(e.target).closest('.wf-node');
                    if ($node.hasClass('wf-node-end') || $node.hasClass('wf-node-start')) {
                        return false;
                    }
                    var menu = this.getMenu();
                    e.preventDefault();
                    if ($node.length > 0) {
                        $node.addClass('contextmenuhost');
                        menu.html($('#tpl-node-menu').html());
                    } else {
                        menu.html($('#tpl-canvas-menu').html());
                    }

                    return true;
                },
                onItem: function (context, e) {
                    var $node = context.find('.contextmenuhost').removeClass('contextmenuhost');
                    var action = $(e.currentTarget).find('[data-action]').attr('data-action');
                    var handlerName = '_' + action + 'Handler';
                    me[handlerName] && me[handlerName](e, $node);
                }
            });
        },
        _bindEvents: function () {
            var options = this.settings.nodeOptions;
            var nodeCls = this.settings.nodeOptions.cls;
            var activeCls = this.settings.nodeOptions.activeCls;
            var $container = this.$container;
            var normalStepSelector = '.wf-node:not(.wf-node-start,.wf-node-end)';

            var me = this;
            $container
                .on('click', normalStepSelector, function (e) {
                    console.log('click!!');
                    var $node = $(e.currentTarget);
                    var id = $node.attr('data-id');

                    $.each($container.find('.' + nodeCls), function (i, node) {
                        if (me._isStartOrEndNode($(node))) {
                            return;
                        }
                        if ($(node).attr('data-id') === id) {
                            $(node).addClass(activeCls);
                        } else {
                            $(node).removeClass(activeCls);
                        }
                    });

                });

            if (options.draggable) {
                // 移动结束时，更新数据
                //$container.on("drop", ".wf-node", function (event, ui) {
                //    //var id = _getOriginalId(ui.helper.attr("id")),
                //    //    position = ui.position;
                //    //that.updateData(id, position);
                //});
            }
        },
        /**
         * 处理拖动与选中的冲突
         * @param dest
         * @param base
         * @returns {boolean}
         * @private
         */
        _xIsInRange: function (dest, base) {
            var buffer = 3;
            return dest < base + 3 && dest > base - 3;
        },
        _isStartOrEndNode: function ($el) {
            var options = this.settings.nodeOptions;
            return $el.hasClass(options.startCls) || $el.hasClass(options.endCls);
        },
        _createNodeEl: function (data) {
            var tpl = this.settings.nodeTpl;
            return $(tpl(data)).appendTo(this.$container);
        },
        _getMaxIndex: function () {
            var max = 0;
            var data = this._nodeCache;
            $.each(data, function (i, item) {
                max = Math.max(max, item.index);
            });

            return max;
        },
        _addNode: function (nodeData, options) {
            var defaults = this.settings.nodeOptions;
            var instance = this.instance;
            options = $.extend({}, defaults, options);

            if (nodeData.index == null) {
                nodeData.index = this._getMaxIndex() + 1;
            }
            if (nodeData.name == null) {
                nodeData.name = options.autoNamePrefix + " " + nodeData.index;
            }

            var tplData = $.extend({}, options, nodeData);

            var $nodeEl = this._createNodeEl(tplData);

            // 初始化拖拽
            if (options.draggable !== false) {
                var drag = instance.draggable($nodeEl, {
                    containment: "parent"
                });
            }
            // 初始化连接源
            if (options.isSource !== false) {
                instance.makeSource($nodeEl, options.sourceOptions);
            }

            // 初始化连接目标
            if (options.isTarget !== false) {
                instance.makeTarget($nodeEl, options.targetOptions);
            }


            this._nodeCache[nodeData.index] = nodeData;

            return $nodeEl;
        },
        _addConnect: function (connect, type) {
            var options = this.settings.nodeOptions;
            var instance = this.instance;
            if (typeof connect === "string") {
                var con = connect.split(",", 2);
                instance.connect({
                    source: options.prefix + con[0],
                    target: options.prefix + con[1],
                    type: type
                });
            }
        },
        _parseData: function (data) {
            var result = {
                nodes: [],
                connects: []
            };
            var options = this.settings.nodeOptions;
            var pushConnect = function (sourceId, targetIds) {
                if (sourceId == null || targetIds == null || targetIds === "") {
                    return false;
                }
                var tids = targetIds.split(",");
                $.each(tids, function (i, tid) {
                    result.connects.push(sourceId + ',' + tid);
                });
            };

            if (data && data.length) {
                for (var i = 0; i < data.length; i++) {
                    // 只接收需要的属性
                    var d = {
                        id: data[i].id,
                        index: data[i].processid,
                        top: data[i].top,
                        left: data[i].left,
                        name: data[i].name,
                        to: data[i].to
                    };
                    // 特殊步骤处理, (开始结束)
                    if (d.index === -1) {
                        d.cls = options.startCls;
                    } else if (d.index === 0) {
                        d.cls = options.endCls;
                    }
                    result.nodes.push(d);
                    if (d.to) {
                        pushConnect(d.index, d.to);
                    }
                }
            }

            return result;
        },
        _addNodes: function (nodes, options) {
            if (!$.isArray(nodes)) {
                nodes = [nodes];
            }
            var me = this;
            $.each(nodes, function (index, node) {
                me._addNode(node, options);
            });
        },
        _addConnects: function (connects, type) {
            if (!$.isArray(connects)) {
                connects = [connects];
            }
            var me = this;
            $.each(connects, function (index, item) {
                me._addConnect(item, type);
            });
        },
        _getNodeEl: function () {

        },
        nodeData: function (idx) {
            return this._nodeCache[idx];
        },
        _addNodeHandler: function (e) {
            var containerOffset = this.$container.offset();
            var currentOffset = $(e.currentTarget).offset();

            this._addNode({
                id: new Date().getTime(),  // TODO: 这里的id应该是外部传进来，而不是自己随便设置的一个
                top: currentOffset.top - containerOffset.top,
                left: currentOffset.left - containerOffset.left,
            });
        },
        _deleteNodeHandler: function (e, $node) {
            if (window.confirm('确认删除该步骤？')) {
                $node && this.instance.remove($node);
                var idx = this.idx($node);
                delete this._nodeCache[idx];
            }
        },
        render: function (data) {
            var drawData = this._parseData(data);

            this._addNodes(drawData.nodes);

            this._addConnects(drawData.connects);
        },
        select: function () {
            var $active = $(this.element).find('.wf-node-active');
            var idx = this.idx($active);
            return this.nodeData(idx);
        },
        idx: function ($node) {
            var prefix = this.settings.nodeOptions.prefix;
            var id = $node.attr('id');
            if (id == null) return void 0;
            return id.replace(prefix, '');
        },
        data: function () {
            return this._nodeCache;
        },
        destroy: function () {

        }
    });

    // 插件化
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);