import { Component, OnInit, ElementRef, Input } from '@angular/core';
import BarChart from './bar-chart';

@Component({
    selector: 'bar-chart',
    templateUrl: 'bar-chart.component.html',
    styleUrls: ['bar-chart.component.scss']
})

export class BarChartComponent implements OnInit {

    @Input('chartData') data:any;
    @Input('chartConfig') config:any;

    private _resize: any;
    private _barChart: any;
    private _config: any;

    title: string;

    constructor(private elementRef: ElementRef){}
    ngOnInit(){

        this._barChart = new BarChart();
        this.generateGraph();
        
        this._resize = window.addEventListener('resize',() => {
            this.generateGraph();
        })
    }

    generateGraph(){  
            
        let config = {
            element: this.elementRef.nativeElement.querySelector('.chart-body'),
            svg: {
                width: window.innerWidth - 1,
                height: 500,
                margin: {
                    left: 100,
                    top: 100,
                    right: 100,
                    bottom: 100
                }
            },
            data: this.data
        }

        for(let key in this.config){
            
            if(config[key] == undefined){
                config[key] = this.config[key];
            }
        }

        this.title = config['title'];

        this._barChart.setConfig(config);
        this._barChart.draw();
    }
}