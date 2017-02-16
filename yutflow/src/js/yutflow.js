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
        contextMenu: false,  // 指定一个选择器
        editable: false,
        draggable: false,
        selectable: false,
        onNodeClick: function () {
        },
        onConnection: function (info, wf) {
            var conn = info.connection;
            var $target = $(info.target);
            var data = wf.getNodeData(wf.idx($target));
            if (data) {
                if (data.state === 'done' || data.state === 'progress') {
                    conn.toggleType("done");
                }
                if (data.state === 'pending') {
                    conn.toggleType("pending");
                }
            }


        },
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
        this._data = {
            nodes: [],
            connections: []
        };

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
            var instanceOptions = {
                Endpoint: "Blank",
                // Endpoint:[ "Dot", { radius:5 } ],
                // EndpointStyle:{ fillStyle:"transparent" },
                // EndpointHoverStyle:{ fillStyle:"#ffa500" },

                Connector: ["Flowchart", {gap: 2}],
                ConnectionsDetachable: false,
                ReattachConnections: false,

                // LogEnabled: true, // 调试模式
                // 锚点自动调整位置
                Anchor: "Continuous",
                // Anchor: [[0, 0.5, 1, 0], [1, 0.5, 1, 0]],
                // 连接器样式
                PaintStyle: {
                    strokeStyle: "#ddd",
                    lineWidth: 3,
                    dashstyle: "0",
                    outlineWidth: 4,
                    outlineColor: "transparent"
                }
            };

            if (this.settings.nodeOptions.detach) {
                instanceOptions.HoverPaintStyle = {
                    strokeStyle: "#B2C0D1",
                    lineWidth: 3,
                    dashstyle: "4 1"
                }
            }

            var instance = this.instance = jsPlumb.getInstance(instanceOptions);

            // 注册 type
            var doneType = {
                paintStyle: {
                    strokeStyle: "#EE8C0C"
                }
            };
            var pendingType = {
                paintStyle: {
                    strokeStyle: "#efefef"
                }
            };
            instance.registerConnectionType("done", doneType);
            instance.registerConnectionType("pending", pendingType);

            this._bindInstanceEvents(instance);

            return this.instance;
        },
        _bindInstanceEvents: function (instance) {
            var onConnection = this.settings.onConnection;
            var me = this;
            instance.bind("beforeDrop", function (param) {

                if (isConnectToSelf(param)) {
                    return false;
                }
                if (stepIsRepeat(param, instance)) {
                    return false;
                }
                if (isFromStartToEnd(param, me.settings.nodeOptions.prefix)) {
                    return false;
                }
                return true;
            });

            // 判定是否是
            instance.bind("connection", function (info) {
                onConnection.call(this, info, me);
            });

            instance.bind("connectionDetached", function (con) {
                if (con && con.connection) {
                    console.log(con);
                    debugger;
                }
            });

            if (this.settings.nodeOptions.detach) {
                // 删除连接线
                instance.bind('click', function (con) {
                    instance.detach(con);
                });
            }
        },
        _bindEvents: function () {
            var options = this.settings;
            var nodeCls = this.settings.nodeOptions.cls;
            var activeCls = this.settings.nodeOptions.activeCls;
            var $container = this.$container;
            var normalStepSelector = '.wf-node:not(.wf-node-start,.wf-node-end)';

            var me = this;

            $container.on('click', normalStepSelector, $.proxy(options.onNodeClick, this));

            if (options.selectable) {
                // click select
                $container.on('click', normalStepSelector, function (e) {
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
            }


            if (options.draggable) {
                // 移动结束时，更新数据
                //$container.on("drop", ".wf-node", function (event, ui) {
                //    //var id = _getOriginalId(ui.helper.attr("id")),
                //    //    position = ui.position;
                //    //that.updateData(id, position);
                //});
            }
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
            var nodes = this._data.nodes;
            $.each(nodes, function (i, item) {
                max = Math.max(max, item.index);
            });

            return max;
        },
        _addNode: function (data) {
            var defaults = this.settings.nodeOptions;
            var instance = this.instance;
            data = $.extend({}, defaults, data);

            data.state || (data.state = 'none');
            data.cls || (data.cls = '');

            if (data.index == null) {
                data.index = this._getMaxIndex() + 1;
            }
            if (data.name == null) {
                data.name = data.autoNamePrefix + " " + data.index;
            }

            // 特殊步骤处理, (开始结束)

            if (data.index === 0) {
                data.cls += ' ' + data.startCls;
            }
            if (data.index === -1) {
                data.cls += ' ' + data.endCls;
            }

            // state 4种状态：'pending', 'progress', 'done', 'none'

            if (data.state) {
                data.cls += ' ' + data.state;
            }


            var $nodeEl = this._createNodeEl(data);

            // 初始化拖拽
            if (data.draggable !== false) {
                var drag = instance.draggable($nodeEl, {
                    containment: "parent"
                });
            }
            // 初始化连接源
            if (data.isSource !== false) {
                instance.makeSource($nodeEl, data.sourceOptions);
            }

            // 初始化连接目标
            if (data.isTarget !== false) {
                instance.makeTarget($nodeEl, data.targetOptions);
            }

            return $nodeEl;
        },
        _addConnection: function (options) {
            var instance = this.instance;
            options.source = this._getNodeId(options.source);
            options.target = this._getNodeId(options.target);
            options.overlays = [
                ["Arrow", {
                    location: 1,
                    id: "arrow",
                    length: 14,
                    foldback: 0.6
                }]];

            if (options.text) {
                options.overlays.push(["Label", {
                    location: 0.2,
                    id: "label",
                    cssClass: "wf-connection_label",
                    label: options.text
                    // ,
                    // events:{
                    //     tap:function() { alert("hey"); }
                    // }
                }]);
            }
            var connection = instance.connect(options);
            return connection;
        },
        _getNodeId: function (id) {
            var nodeOptions = this.settings.nodeOptions;
            return nodeOptions.prefix + id;
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
        _addConnections: function (connects) {
            if (!$.isArray(connects)) {
                connects = [connects];
            }
            var me = this;
            $.each(connects, function (index, item) {
                me._addConnection(item);
            });
        },
        getNodeData: function (idx) {
            return _.find(this._data.nodes, function (node) {
                return node.index === idx;
            });
        },
        addConnectionData: function () {

        },
        removeConnectionData: function () {

        },
        removeNodeData: function (idx) {
            var i = _.findIndex(this._data.nodes, function (node) {
                return node.index === idx;
            });
            this._data.nodes.splice(i, 1);
        },
        addNode: function(options){
            this._addNode({
                id: new Date().getTime(),  // TODO: 这里的id应该是外部传进来，而不是自己随便设置的一个
                top: options.top,
                left: options.left,
            });
        },
        removeNode: function ($node) {
            $node && this.instance.remove($node);
            var idx = this.idx($node);
            this.removeNodeData(idx);
        },
        _addNodeHandler: function (e) {
            var containerOffset = this.$container.offset();
            var currentOffset = $(e.currentTarget).offset();
            this.addNode({
                top: currentOffset.top - containerOffset.top,
                left: currentOffset.left - containerOffset.left
            });
        },
        _deleteNodeHandler: function (e, $node) {
            if (window.confirm('确认删除该步骤？')) {
                this.removeNode($node);
            }
        },
        render: function (data) {
            if (data == null) return;
            this.empty();
            var me = this;
            this._data = data;
            this.instance.batch(function () {
                me._addNodes(data.nodes);
                me._addConnections(data.connections);
            });
        },
        select: function () {
            var $active = $(this.element).find('.wf-node-active');
            var idx = this.idx($active);
            return this.getNodeData(idx);
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
        empty: function () {
            this.instance.empty();
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