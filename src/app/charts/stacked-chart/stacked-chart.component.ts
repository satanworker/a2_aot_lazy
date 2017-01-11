import { stackedChartSvg } from './../../shared/stacked_chart.interface';
import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';

@Component({
    moduleId: module.id,
    selector: 'app-stacked-chart',
    templateUrl: './stacked-chart.component.html',
    styleUrls: ['./stacked-chart.component.scss']
})
export class StackedChartComponent implements OnInit {
    @ViewChild('svg') svg: ElementRef;
    @ViewChild('chart_container') container: ElementRef;
    @Input('data') data;
    private svg_stats: stackedChartSvg = {
        top: 20,
        left: 40,
        bottom: 20,
        right: 0,
        ellipse_ry: 5
    };
    private month_title: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    private x_scale: any;
    private y_scale: any;
    private chart_group: any;
    private x_axis: any;
    private y_axis: any;
    private stacked_layout: any;
    private part_labels: string[] = [];
    private total_values: number[] = [];
    private values_ar: any[] = [];
    private colors: string[] = ['#a32c23', '#2a5d8c', '#01254a', '#c6b647', '#1c9756'];
    private container_instance: any;
    constructor() {
        this.colors = this.colors.reverse();
    }
    ngOnInit() {
        this.svg_stats.width = this.svg.nativeElement.clientWidth - this.svg_stats.left
            - this.svg_stats.right;
        this.svg_stats.height = this.svg.nativeElement.clientHeight - this.svg_stats.top
            - this.svg_stats.bottom;
        this.chart_group = d3.select(this.svg.nativeElement)
            .append('g')
            .classed('outer_group', true)
            .attr('transform', `translate(${this.svg_stats.left}, ${this.svg_stats.top})`);
        this.prepareData();
        this.countScales();
        this.createAxis();
        this.renderChart();
        this.createShadow();
        this.createBarShells();
        this.createHover();
    }
    createHover() {
    }
    createShadow() {
        this.container_instance = d3.select(this.container.nativeElement);
        this.container_instance.append('div')
            .style('height', this.svg.nativeElement.clientHeight - this.svg_stats.top -
            this.svg_stats.bottom + 20 + 'px')
            .style('width', this.svg.nativeElement.clientWidth - this.svg_stats.left -
            this.svg_stats.right + 'px')
            .style('left', this.svg_stats.left + 'px')
            .classed('shadow', true);
    }
    createBarShells() {
        let $this = this;
        let barData: any[] = [];
        this.chart_group.selectAll('.layer.last rect')
            .each(function (d) {
                let obj: any = {
                    x: this.getAttribute('x'),
                    height: $this.svg_stats.height - this.getAttribute('y') + $this.svg_stats.ellipse_ry
                };
                barData.push(obj);
            });
        // render bar charts
        let shell_group = this.container_instance.append('div')
            .classed('shell_group', true)
            .style('left', this.svg_stats.left + 'px');
        shell_group.selectAll('.bar_shell')
            .data(barData)
            .enter()
            .append('div')
            .style('height', (d) => d.height + 'px')
            .style('width', (d) => this.x_scale.bandwidth() + 'px')
            .style('left', (d) => d.x + 'px')
            .classed('bar_shell', true);
    }
    prepareData() {
        _.each(this.data[0].value, (value, key) => {
            this.part_labels.push(key);
        });
        this.data.map((item, index) => {
            this.values_ar.push(item.value);
            let total: number = 0;
            _.each(item.value, (value, key) => {
                total += +value;
            });
            this.total_values.push(total);
        });
    }
    countScales() {
        this.stacked_layout = d3.stack()
            .keys(this.part_labels)
            .order(d3.stackOrderNone);
        this.stacked_layout = this.stacked_layout(this.values_ar);
        // some manipulations with stacked data
        this.stacked_layout = this.stacked_layout.map((d, i) => {
            return d.map(($d, $i) => {
                $d.data.key = this.data[$i].title;
                return $d;
            });
        });
        this.x_scale = d3.scaleBand()
            .range([0, this.svg_stats.width])
            .padding(.45)
            .domain(
            this.data.map((item) => {
                return item.title;
            })
            );

        this.y_scale = d3.scaleLinear()
            .range([0, this.svg_stats.height])
            .domain([0, d3.max(this.total_values)]);
    }
    // count Scales
    createAxis() {
        let $this = this;
        this.x_axis = d3.axisBottom(this.x_scale);
        this.x_axis.tickFormat((d, i) => {
            return this.month_title[i];
        });
        this.y_axis = d3.axisLeft(this.y_scale)
            .ticks(5);

        this.x_axis = this.chart_group.append('g')
            .classed('x-axis', true)
            .attr('transform', `translate(0, ${this.svg_stats.height})`)
            .call(this.x_axis);

        this.y_axis = this.chart_group.append('g')
            .classed('y-axis', true)
            .attr('transform', `translate(0, 0)`)
            .call(this.y_axis);
        this.chart_group = this.chart_group.append('g')
            .classed('inner_group', true);
    }
    // createAxis
    renderChart() {
        let layer = this.chart_group.selectAll('.layer')
            .data(this.stacked_layout)
            .enter()
            .append('g')
            .classed('layer', true)
            .classed('first', (d, i) => {
                if (i === 0) {
                    return true;
                } else {
                    return false;
                }
            })
            .style('fill', (d, i) => {
                return this.colors[i];
            });
        layer.selectAll('.rect')
            .data((d) => {
                return d.map(($d) => {
                    return $d;
                });
                // return d;
            })
            .enter()
            .append('rect')
            .attr('x', (d, i) => {
                return this.x_scale(d.data.key);
            })
            .attr('width', (d) => {
                return this.x_scale.bandwidth();
            })
            .attr('height', (d) => {
                return this.y_scale(d[1]) - this.y_scale(d[0]);
            })
            .attr('y', (d) => {
                return this.svg_stats.height - this.y_scale(d[1]);
            });
        // normal
        layer.filter((d, i) => {
            if (i !== 0) {
                return true;
            } else {
                return false;
            }
        })
            .selectAll('.ellipse')
            .data((d) => {
                return d;
            })
            .enter()
            .append('ellipse')
            .classed('ellipse', true)
            .attr('cx', (d) => {
                return this.x_scale(d.data.key) + this.x_scale.bandwidth() / 2;
            })
            .attr('cy', (d) => {
                return this.svg_stats.height - this.y_scale(d[0]);
            })
            .attr('rx', (d) => {
                return this.x_scale.bandwidth() / 2;
            })
            .attr('ry', this.svg_stats.ellipse_ry);

        // creating last top_eliipse
        layer.filter((d, i) => {
            if (i === this.stacked_layout.length - 1) {
                return true;
            } else {
                return false;
            }
        })
            .classed('last', true)
            .selectAll('.top_circle')
            .data((d) => {
                return d;
            })
            .enter()
            .append('ellipse')
            .classed('top_circle', true)
            .attr('cx', (d) => {
                return this.x_scale(d.data.key) + this.x_scale.bandwidth() / 2;
            })
            .attr('cy', (d) => {
                return this.svg_stats.height - this.y_scale(d[1]);
            })
            .attr('rx', (d) => {
                return this.x_scale.bandwidth() / 2;
            })
            .attr('ry', this.svg_stats.ellipse_ry);
    }
    // rightRoundedRect
    rightRoundedRect(x, y, width, height, radius) {
        return 'M' + x + ',' + y
            + 'h' + (width - radius)
            + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius
            + 'v' + (height - 2 * radius)
            + 'a' + radius + ',' + radius + ' 0 0 1 ' + -radius + ',' + radius
            + 'h' + (radius - width)
            + 'z';
    }
    roundedRect(x, y, w, h, r, tl: boolean, tr: boolean, bl: boolean, br: boolean) {
        var retval;
        retval = 'M' + (x + r) + ',' + y;
        retval += 'h' + (w - 2 * r);
        if (tr) {
            retval += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + r;
        } else {
            retval += 'h' + r; retval += 'v' + r;
        }
        retval += 'v' + (h - 2 * r);
        if (br) {
            retval += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + r;
        } else {
            retval += 'v' + r; retval += 'h' + -r;
        }
        retval += 'h' + (2 * r - w);
        if (bl) {
            retval += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + -r;
        } else {
            retval += 'h' + -r; retval += 'v' + -r;
        }
        retval += 'v' + (2 * r - h);
        if (tl) {
            retval += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + -r;
        } else {
            retval += 'v' + -r; retval += 'h' + r;
        }
        retval += 'z';
        return retval;
    }
    // roundedReact
}