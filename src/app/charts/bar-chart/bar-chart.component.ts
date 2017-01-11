import { stackedChartSvg } from './../../shared/stacked_chart.interface';
import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
    @ViewChild('svg') svg: ElementRef;
    @Input('data') data;
    private svg_stats: stackedChartSvg = {
        top: 20,
        left: 40,
        bottom: 20,
        right: 20
    };
    private x_scale: any;
    private y_scale: any;
    private chart_group: any;
    private x_axis: any;
    private y_axis: any;
    constructor() { }
    ngOnInit() {
        this.svg_stats.width = this.svg.nativeElement.clientWidth - this.svg_stats.left
            - this.svg_stats.right;
        this.svg_stats.height = this.svg.nativeElement.clientHeight - this.svg_stats.top
            - this.svg_stats.bottom;

        this.chart_group = d3.select(this.svg.nativeElement)
            .append('g')
            .classed('outer_group', true)
            .attr('transform', `translate(${this.svg_stats.left}, ${this.svg_stats.top})`);

        this.countScales();
        this.createAxis();
        this.renderChart();
    }
    countScales() {
        let domain: string[] = [];
        this.data.map((item: any) => {
            domain.push(item.title);
        });
        this.x_scale = d3.scaleBand()
            .range([0, this.svg_stats.width])
            .padding(.1)
            .domain(domain);
        this.y_scale = d3.scaleLinear()
            .range([0, this.svg_stats.height])
            .domain(
            [d3.max(this.data, (d: any) => {
                return d.value;
            }), 0]
            );
    }
    // count Scales
    createAxis() {
        this.x_axis = d3.axisBottom(this.x_scale);
        this.y_axis = d3.axisLeft(this.y_scale)
            .ticks(7);

        this.x_axis = this.chart_group.append('g')
            .classed('x-axis', true)
            .attr('transform', `translate(0, ${this.svg_stats.height})`)
            .call(this.x_axis);

        this.y_axis = this.chart_group.append('g')
            .classed('y-axis', true)
            .attr('transform', `translate(0, 0)`)
            .call(this.y_axis);
    }
    // createAxis
    renderChart() {
        this.chart_group.selectAll('.bar')
            .data(this.data).enter()
            .append('rect')
            .classed('bar', true)
            .style('fill', 'steelblue')
            .attr('x', (d) => {
                return this.x_scale(d.title);
            })
            .attr('width', this.x_scale.bandwidth())
            .attr('y', (d) => {
                return this.y_scale(d.value);
            })
            .attr('height', (d) => {
                return this.svg_stats.height - this.y_scale(d.value);
            });
    }
};
