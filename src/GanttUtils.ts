/// <reference path="headers/d3.d.ts" />


module d3 {
	/**
	 * Utils
	 */
	 
	export class GanttUtils {
		constructor() {}
		
		
		public getWidthOf(item : Selection<any>) : number{
			return parseFloat(item.style('width').replace('px', ''));
		}
		public getHeightOf(item : Selection<any>) : number{
			return parseFloat(item.style('height').replace('px', ''));
		}
		
	}
}