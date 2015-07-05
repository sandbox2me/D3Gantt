/// <reference path="./headers/d3.d.ts" />
/// <reference path="GanttUtils" />


 
 
module d3{
	
	export interface IGanttData{
		start : Date;
		end : Date;
		group? : any;
		label? : string;
		description? : string;
		parent? : number; 
	}
	
	export interface IGanttTree extends IGanttData{
		children : Array<IGanttData>;
	}
	
	
	export interface IConfig{
		selector : string;
		timeformat : string;
	}
	
	
	/**
	 * Gantt
	 */
	export class Gantt {
		
		private $elem : Selection<any>;
		
		private $svg : Selection<any>; 
		private svgHeight = 25;
		private $container : Selection<any>;
		
		private x : d3.time.Scale<number, number>;
		private xAxis : d3.svg.Axis;
		private color : d3.scale.Ordinal<string, string>;
		
		private start : Date;
		private end : Date;
		
		private U : GanttUtils;
		
		constructor(private config : IConfig) {
			
			this.U = new GanttUtils();
			
			this.$elem = d3.select(config.selector);
			var width = this.U.getWidthOf(this.$elem);
			
	
			this.x = d3.time.scale().range([0,width]);
			
			this.xAxis = d3.svg.axis().scale(this.x)
    			.orient("top").ticks(5);
				
			this.color = d3.scale.category20();
			
			this.start = new Date();
			this.start.setMinutes(this.start.getMinutes()-5);
			this.end = new Date();
			
			this.x.domain([this.start, this.end]);
			
			this.$svg = this.$elem.append("svg")
							.attr('width', width)
							.attr('height', this.svgHeight)
							.append("g")
					        .attr("class", "x axis")
					        .attr("transform", "translate(0," + this.svgHeight + ")")
					        .call(this.xAxis)
							;
			
			
			var height = this.U.getHeightOf(this.$elem) - this.svgHeight;
			
			this.$container = this.$elem.append("div")
								  .attr("class", 'ganttContainer')
								  .style('width', width)
								  .style('height', height)
								  ;
		}
		
		private update(){
						
			
		}
		
		public fromArray(data : Array<IGanttData>) : void {
			
		}
		
		public fromTree(data : IGanttTree) : void {
			
		}
		
		
	}
}