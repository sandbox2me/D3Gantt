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
		children? : Array<IGanttData>;
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
		private svgHeight = 26;
		private $container : Selection<any>;
		
		
		private x ;
		private xAxis : d3.svg.Axis;
		private color : d3.scale.Ordinal<string, string>;
		private zoom : d3.behavior.Zoom<any>;
		
		private vLine : Selection<any>;
		
		
		private start : Date;
		private end : Date;
		
		private U : GanttUtils;
		
		
		private data : Array<IGanttData>;
		private eventsMap : {[index : string] : Function};
		
		
		private margins = {
			top : 0,
			left : 0,
			right : 20,
			bottom : 0
		}
		

		
		constructor(private config : IConfig) {
			
			this.U = new GanttUtils();
			this.eventsMap = {};		
			
			
			this.$elem = d3.select(config.selector);
			var width = this.U.getWidthOf(this.$elem);
			var height = this.U.getHeightOf(this.$elem);
			
			this.svgHeight = height;
	
			this.x = d3.time.scale().range([0,width-this.margins.right]);
			
			this.xAxis = d3.svg.axis().scale(this.x)
    			.orient("top").ticks(10);
				
			this.color = d3.scale.category20();
			
			this.zoom = d3.behavior.zoom()
						
					    .on("zoom", (d, i)=>{
							this.zoom.x(this.x)
							this.$elem.selectAll('.x.axis').call(this.xAxis);
							this.$container.selectAll('.rect')
								.style("margin-left", (d)=>{
									return this.x(d.start)  + 'px'; 
								})
								.style("width", (d)=>{
									var w = this.x(d.end) - this.x(d.start);
									w<1 ? w=1 : null ;
									return w + 'px';
								});
						});
			
			
			this.$svg = this.$elem.append("svg")
							.attr('width', width)
							.attr('height', this.svgHeight)
							.append("g")
					        .attr("class", "x axis")
					        .attr("transform", "translate(0, 30)")
					        .call(this.xAxis)
							;
			
			
			var height = this.U.getHeightOf(this.$elem) - this.svgHeight;
			
			this.$container = this.$elem.append("div")
								  .attr("class", 'ganttContainer')
								  .style('width', width)
								  .style('height', height)
								  .append("table")
								  .style("width", "100%")
								  .style("border-collapse", "collapse")
								  ;
								  
			this.$container.call(this.zoom);	
								  
			
			this.vLine = this.$svg.append("path") // CONTINUE HERE
		}
		
		private update(){
			if(this.data){
				
				this.$elem.selectAll('.x.axis').call(this.xAxis);
				
				var bound = this.$container.selectAll("tr")
											.data(this.data)
											;
											
				var tr = bound.enter()
					 .append('tr')
					 ;
					 
				
				var rect  = tr.append('td')
							  .style("padding", "0")
							  .append('div')
							  .attr('class','rect')
							  .style('display','inline-block')
							  ;

				rect.style("margin-left", (d)=>{return this.x(d.start)  + 'px'; });
				rect.style("width", (d)=>{return this.x(d.end) - this.x(d.start) + 'px';});
				rect.style("height", "2.5em");
				
				rect.style("background-color", (d)=>{return this.color(d.group)});
				
				
				rect.append('div').text((d)=>{ return d.label; })
									.style("overflow", "hidden")
									.style("text-overflow", "ellipsis");
				rect.append('div').text((d)=>{ return d.group; })
									.style("overflow", "hidden")
									.style("text-overflow", "ellipsis");
				
				var self = this;
				rect.on('mouseover', function(item){
					if(self.eventsMap['mouseover']){
						self.eventsMap['mouseover'](item);
					}
				});
				
				rect.on('mouseleave', function(){
					if(self.eventsMap['mouseleave']){
						self.eventsMap['mouseleave']();
					}
				});
								
				
				bound.exit().remove();		
			}
		}
		
		public fromArray(data : Array<IGanttData>) : void {
			this.data = data;
			
			if (data){
				var min = d3.min(this.data, (d)=>{
					return d.start;
				});
				
				var max = d3.max(this.data, (d)=>{
					return d.end;
				});
				
				var inf = new Date(min.getTime());
				var sup = new Date(max.getTime());
				
				inf.setSeconds(inf.getSeconds()-1);
				sup.setSeconds(sup.getSeconds()+1);
				
				this.x.domain([inf, sup]);
				this.$elem.selectAll('.x.axis').call(this.xAxis);
			}
			
			
			this.update();
		}
		
		
		public on(key : string, callback : (item : any)=>void) : void {
			this.eventsMap[key] = callback;
		}
		
		
	}
}