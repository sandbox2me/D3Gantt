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
            this.config = config;
            this.svgHeight = 25;
            this.U = new d3.GanttUtils();
            this.$elem = d3.select(config.selector);
            var width = this.U.getWidthOf(this.$elem);
            this.x = d3.time.scale().range([0, width]);
            this.xAxis = d3.svg.axis().scale(this.x).orient("top").ticks(5);
            this.color = d3.scale.category20();
            this.start = new Date();
            this.start.setMinutes(this.start.getMinutes() - 5);
            this.end = new Date();
            this.x.domain([this.start, this.end]);
            this.$svg = this.$elem.append("svg").attr('width', width).attr('height', this.svgHeight).append("g").attr("class", "x axis").attr("transform", "translate(0," + this.svgHeight + ")").call(this.xAxis);
            var height = this.U.getHeightOf(this.$elem) - this.svgHeight;
            this.$container = this.$elem.append("div").attr("class", 'ganttContainer').style('width', width).style('height', height);
        }
        Gantt.prototype.update = function () {
        };
        Gantt.prototype.fromArray = function (data) {
        };
        Gantt.prototype.fromTree = function (data) {
        };
        return Gantt;
    })();
    d3.Gantt = Gantt;
})(d3 || (d3 = {}));
