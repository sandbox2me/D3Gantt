/// <reference path="src/headers/d3.d.ts" />
declare module d3 {
    /**
     * Utils
     */
    class GanttUtils {
        constructor();
        getWidthOf(item: Selection<any>): number;
        getHeightOf(item: Selection<any>): number;
    }
}
declare module d3 {
    interface IGanttData {
        start: Date;
        end: Date;
        group?: any;
        label?: string;
        description?: string;
        parent?: number;
    }
    interface IGanttTree extends IGanttData {
        children?: Array<IGanttData>;
    }
    interface IConfig {
        selector: string;
        timeformat: string;
    }
    /**
     * Gantt
     */
    class Gantt {
        private config;
        private $elem;
        private $svg;
        private svgHeight;
        private $container;
        private x;
        private xAxis;
        private color;
        private zoom;
        private vLine;
        private start;
        private end;
        private U;
        private data;
        private eventsMap;
        private margins;
        constructor(config: IConfig);
        private update();
        fromArray(data: Array<IGanttData>): void;
        on(key: string, callback: (item: any) => void): void;
    }
}
