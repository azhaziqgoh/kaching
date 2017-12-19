//Import all first, once finish the module decouplize the dependency
import * as d3 from "d3";

class BarChart {
    private _config: any
    private _inner: any
    private _scale: any
    private _svg: any
    private _axesGroup: any
    private _axis: any

    constructor(){}

    private setInner(){
        this._inner = {
            width: this._config.svg.width - this._config.svg.margin.left - this._config.svg.margin.right,
            height: this._config.svg.height - this._config.svg.margin.top - this._config.svg.margin.bottom
        }
    }

    private setScale(){
        this._scale = {
            x: d3.scaleBand(),
            y: d3.scaleLinear()
        }

        this._scale.x.range([0, this._inner.width])
            .padding(0.2)
        this._scale.y.range([this._inner.height, 0]);
    }

    private setSvg(){
        this._svg = d3.select(this._config.element).append('svg')
            .attr("width", this._config.svg.width)
            .attr("height", this._config.svg.height);
    }

    private setAxesGroup(){

        this._axesGroup = {
            main: undefined,
            x: undefined,
            y: undefined
        }
        this._axesGroup.main = this._svg.append("g")
            .attr("transform", `translate(${this._config.svg.margin.left},${this._config.svg.margin.top})`);

        this._axesGroup.x = this._axesGroup.main.append("g")
            .attr("transform", `translate(0, ${this._inner.height})`);
        
        this._axesGroup.y = this._axesGroup.main.append("g");
    }

    private setAxis(){
        
        this._axis = {
            x: d3.axisBottom(this._scale.x),
            y: d3.axisLeft(this._scale.y)
        }
    }

    private removeSvg(){
        d3.select(this._config.element).selectAll("*").remove();
    }

    setConfig(config:any){
        this._config = config
    }

    draw(){

        if(this._svg != undefined){
            this.removeSvg();
        }

        this.setSvg();
        this.setInner();
        this.setScale();
        this.setAxesGroup();
        this.setAxis();

        let data = this._config.data;

        let colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        //Set x and y scale domain base on data
        this._scale.x.domain(data.map((d:any) => { return d.x }));
        this._scale.y.domain([0,d3.max(data,(d:any) => { return d.y })]);

        this._axesGroup.x.call(this._axis.x);
        this._axesGroup.y.call(this._axis.y);

        let barGroups = this._svg.append("g")
            .attr("transform", "translate(" + this._config.svg.margin.left + "," + this._config.svg.margin.top + ")");

        let bars = barGroups.selectAll("rect").data(data);

        bars.enter().append("rect")
            .attr("x", (d:any) => { return this._scale.x(d.x);})
            .attr("y", (d:any) => { return this._scale.y(d.y);})
            .attr("width", (d:any) => { return this._scale.x.bandwidth() })
            .attr("height", (d:any) => { return this._inner.height - this._scale.y(d.y)})
            .attr("fill", function (d){ return colorScale(d.x); })
            .on("mouseover", function() { tooltip.style("display", null); })
            .on("mouseout", function() { tooltip.style("display", "none"); })
            .on("mousemove", function(d) {
                
                let xPosition = d3.mouse(this)[0] + 80;
                let yPosition = d3.mouse(this)[1] + 80;

                tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                tooltip.select("text").text(d.y);
            });
        
        var tooltip = this._svg.append("g")
            .attr("class","tooltipD3")
            .style("display","none")
        
        tooltip.append("rect")
            .attr("width", 30)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);
          
        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold")
            .attr("fill","black");
    }
}

export default BarChart;