import { ChartContainerInterface } from '../../shared/chart_container.interface';
import { TooltipInterface } from '../../shared/tooltip.interface';
import { ChartData } from './donut-chart.interface';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit {
  @Input() data: any;
  @ViewChild('charts') chart;
  @ViewChild('container') container;
  @ViewChild('tooltipElement') tooltipElement;
  @Input() className: string;
  @Input() sort: boolean;
  private pie_layout: any;
  private svg_instance: any;
  private svg_stats: any = {
    arc_height: 17,
    margin: 10
  };
  private tooltip: TooltipInterface = {
    show: false,
    top: 0 + 'px',
    left: 0 + 'px'
  };
  private color_pallete: string[] = ['#1c9756', '#c6b647', '#a32c23', '#2a5d8c', '#01254a'];
  private arc: any;
  public container_instance: ChartContainerInterface = {
    top: 0,
    left: 0
  };
  constructor() {

  }

  ngOnInit() {
    if (this.className === 'fat') {
      this.svg_stats.arc_height = 36;
    } else if (this.className === 'full') {
      this.svg_stats.arc_height = 71;
    }
    this.svg_stats.size = 169;
    this.svg_stats.radius = this.svg_stats.size / 2;
    this.prepareElements();
    this.pie_layout = d3.pie()
      .sort(null)
      .padAngle(.04)
      .value((d: any) => {
        return d.data;
      });
    this.prepareData();
    this.renderChart();
  }
  prepareElements() {
    this.container_instance.element = d3.select(this.container.nativeElement);
    this.container_instance.top = this.chart.nativeElement.getBoundingClientRect().top;
    this.container_instance.left = this.chart.nativeElement.getBoundingClientRect().left;
    this.tooltip.instance = d3.select(this.tooltipElement.nativeElement);
  }
  renderChart() {
    this.svg_instance = d3.select(this.chart.nativeElement);
    this.svg_instance.selectAll('.arc')
      .data(this.data)
      .enter()
      .append('path')
      .classed('arc', true)
      .attr('d', (d) => {
        return this.arc(d);
      })
      .attr('fill', (d) => {
        return d.color;
      })
      .on('mouseover', (d) => {})
      .on('mouseout', (d) => {
        this.tooltip.instance.style('opacity', 0);
      })
      .on('mousemove', (d) => {
        let top = d3.event.pageY - this.container_instance.top + 10;
        let left = d3.event.pageX - this.container_instance.left + 10;
        this.tooltip.data = d.data.data + ' ' + d.data.title;
        this.tooltip.instance.style('opacity', 1);
        this.tooltip.instance.style('top', top + 'px');
        this.tooltip.instance.style('left', left + 'px');
      })
      .attr('transform', 'translate(' + this.svg_stats.size / 2 + ',' + this.svg_stats.size / 2 + ')');
  }
  prepareData() {
    this.data = this.pie_layout(this.data);
    this.arc = d3.arc()
      .innerRadius(this.svg_stats.size / 2 - this.svg_stats.margin - 1 - this.svg_stats.arc_height)
      .outerRadius(this.svg_stats.size / 2 - this.svg_stats.margin);
    this.data.map((d, i) => {
      d.title = d.data.title;
      if (this.sort) {
        d.color = '#e87e04';
        if (d.value > 12 && d.value < 29) {
          d.color = '#c23824';
        } else if (d.value > 29 && d.value < 33) {
          d.color = '#d7b937';
        } else if (d.value > 33) {
          d.color = '#1aaf5d';
        }
      } else {
        d.color = this.color_pallete[i];
      }
    });
  }
}
