/// <reference path="headers/d3.d.ts" />
var d3;
(function (d3) {
    /**
     * Utils
     */
    var GanttUtils = (function () {
        function GanttUtils() {
        }
        GanttUtils.prototype.getWidthOf = function (item) {
            return parseFloat(item.style('width').replace('px', ''));
        };
        GanttUtils.prototype.getHeightOf = function (item) {
            return parseFloat(item.style('height').replace('px', ''));
        };
        return GanttUtils;
    })();
    d3.GanttUtils = GanttUtils;
})(d3 || (d3 = {}));
/// <reference path="./headers/d3.d.ts" />
/// <reference path="GanttUtils" />
var d3;
(function (d3) {
    /**
     * Gantt
     */
    var Gantt = (function () {
        function Gantt(config) {
            var _this = this;
            this.config = config;
            this.svgHeight = 26;
            this.margins = {
                top: 0,
                left: 0,
                right: 20,
                bottom: 0
            };
            this.U = new d3.GanttUtils();
            this.eventsMap = {};
            this.$elem = d3.select(config.selector);
            var width = this.U.getWidthOf(this.$elem);
            var height = this.U.getHeightOf(this.$elem);
            this.svgHeight = height;
            this.x = d3.time.scale().range([0, width - this.margins.right]);
            this.xAxis = d3.svg.axis().scale(this.x).orient("top").ticks(10);
            this.color = d3.scale.category20();
            this.zoom = d3.behavior.zoom().on("zoom", function (d, i) {
                _this.zoom.x(_this.x);
                _this.$elem.selectAll('.x.axis').call(_this.xAxis);
                _this.$container.selectAll('.rect').style("margin-left", function (d) {
                    return _this.x(d.start) + 'px';
                }).style("width", function (d) {
                    var w = _this.x(d.end) - _this.x(d.start);
                    w < 1 ? w = 1 : null;
                    return w + 'px';
                });
            });
            this.$svg = this.$elem.append("svg").attr('width', width).attr('height', this.svgHeight).append("g").attr("class", "x axis").attr("transform", "translate(0, 30)").call(this.xAxis);
            var height = this.U.getHeightOf(this.$elem) - this.svgHeight;
            this.$container = this.$elem.append("div").attr("class", 'ganttContainer').style('width', width).style('height', height).append("table").style("width", "100%").style("border-collapse", "collapse");
            this.$container.call(this.zoom);
            this.vLine = this.$svg.append("path"); // CONTINUE HERE
        }
        Gantt.prototype.update = function () {
            var _this = this;
            if (this.data) {
                this.$elem.selectAll('.x.axis').call(this.xAxis);
                var bound = this.$container.selectAll("tr").data(this.data);
                var tr = bound.enter().append('tr');
                var rect = tr.append('td').style("padding", "0").append('div').attr('class', 'rect').style('display', 'inline-block');
                rect.style("margin-left", function (d) {
                    return _this.x(d.start) + 'px';
                });
                rect.style("width", function (d) {
                    return _this.x(d.end) - _this.x(d.start) + 'px';
                });
                rect.style("height", "2.5em");
                rect.style("background-color", function (d) {
                    return _this.color(d.group);
                });
                rect.append('div').text(function (d) {
                    return d.label;
                }).style("overflow", "hidden").style("text-overflow", "ellipsis");
                rect.append('div').text(function (d) {
                    return d.group;
                }).style("overflow", "hidden").style("text-overflow", "ellipsis");
                var self = this;
                rect.on('mouseover', function (item) {
                    if (self.eventsMap['mouseover']) {
                        self.eventsMap['mouseover'](item);
                    }
                });
                rect.on('mouseleave', function () {
                    if (self.eventsMap['mouseleave']) {
                        self.eventsMap['mouseleave']();
                    }
                });
                bound.exit().remove();
            }
        };
        Gantt.prototype.fromArray = function (data) {
            this.data = data;
            if (data) {
                var min = d3.min(this.data, function (d) {
                    return d.start;
                });
                var max = d3.max(this.data, function (d) {
                    return d.end;
                });
                var inf = new Date(min.getTime());
                var sup = new Date(max.getTime());
                inf.setSeconds(inf.getSeconds() - 1);
                sup.setSeconds(sup.getSeconds() + 1);
                this.x.domain([inf, sup]);
                this.$elem.selectAll('.x.axis').call(this.xAxis);
            }
            this.update();
        };
        Gantt.prototype.on = function (key, callback) {
            this.eventsMap[key] = callback;
        };
        return Gantt;
    })();
    d3.Gantt = Gantt;
})(d3 || (d3 = {}));
