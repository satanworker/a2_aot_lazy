import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as d3 from 'd3';
@Component({
    selector: 'app-chart-double',
    templateUrl: './chart-double.component.html',
    styleUrls: ['./chart-double.component.scss']
})
export class ChartDoubleComponent implements OnInit {
    @ViewChild('chart') chart;
    @ViewChild('chart-container') chart_container;
    @Input() color: string;
    public svg_stats: any = {
        arc_height: 17,
        margin: 10
    };
    public pie_data: any = [
        {
            data: 70,
            title: 'some_title'
        }
    ];
    public inner_data: any = [
        { data: 70, title: 'some title' }
    ];
    public goal: number = 200;
    public pie_layout;
    public svg_instance;
    public inner_pie;
    public palletes = {
        blue: {
            inner_pallete: ['none', '#E9F1F8', '#fff'],
            outer_pallete: ['none', '#dbe6f1', '#fff']
        },
        green: {
            inner_pallete: ['none', '#E2F2E5', '#fff'],
            outer_pallete: ['none', '#E2F2E5', '#fff']
        },
        yellow: {
            inner_pallete: ['none', '#F9F7DC', '#fff'],
            outer_pallete: ['none', '#F9F7DC', '#fff']
        },
        red: {
            inner_pallete: ['none', '#FFEBEB', '#fff'],
            outer_pallete: ['none', '#FFEBEB', '#fff']
        }
    };
    public inner_pallete: string[] = [];
    public outer_pallete: string[] = [];
    public percentage: number;
    public percentage_color: string = '#e87e04';
    constructor(
    ) { }

    ngOnInit() {
        // taking color palletes
        this.inner_pallete = this.palletes[this.color].inner_pallete;
        this.outer_pallete = this.palletes[this.color].outer_pallete;
        this.svg_instance = d3.select(this.chart.nativeElement);
        this.countValues();
        // applying svg info stats
        let svg_stats = this.svg_instance.node().getBoundingClientRect();
        // this.svg_stats.size = Math.min(svg_stats.height, svg_stats.width);
        this.svg_stats.size = 169;
        this.svg_stats.radius = this.svg_stats.size / 2;
        this.pie_layout = d3.pie()
            .sort(null)
            .value(function (d: any) {
                return d.data;
            });
        this.createOuter();
        this.createInner();
        // this.createLabels();
    }
    countValues() {
        [this.inner_data, this.pie_data].map(($d, $i) => {
            let goal: number = this.goal - $d[0].data;
            let additional: number;
            if ($d[0].data > goal) {
                additional = $d[0].data * 0.1;
            } else {
                additional = goal * 0.1;
            }
            $d.push({
                data: goal,
                title: 'goal'
            });
            $d.push({
                data: additional,
                title: 'additional'
            });
        });
        this.percentage = this.goal / 100;
        this.percentage = this.pie_data[0].data / this.percentage;
        if (this.percentage > 12 && this.percentage < 29) {
            this.percentage_color = '#c23824';
        } else if (this.percentage > 29 && this.percentage < 33) {
            this.percentage_color = '#d7b937';
        } else if (this.percentage > 33) {
            this.percentage_color = '#1aaf5d';
        }
    }
    createInner() {
        let $this = this;
        this.inner_pie = d3.arc()
            .innerRadius($this.svg_stats.size / 2 - 1 - $this.svg_stats.margin - $this.svg_stats.arc_height * 2)
            .outerRadius($this.svg_stats.size / 2 - 1 - $this.svg_stats.margin - $this.svg_stats.arc_height)
            .startAngle(function (d) { return d.startAngle / 2; })
            .endAngle(function (d) { return d.endAngle / 2; });
        this.svg_instance.selectAll('.inner_arc')
            .data(function () {
                return $this.pie_layout($this.inner_data);
            })
            .enter()
            .append('g')
            .classed('inner_arc', true)
            .append('path')
            .attr('d', function (d) {
                return $this.inner_pie(d);
            })
            .attr('fill', function (d, i) {
                return $this.inner_pallete[i];
            })
            .classed('outer_gradient', function (d, i) {
                // TODO: Dimi Indian check if to fit actual data
                if (i === 0) {
                    return true;
                } else {
                    return false;
                }
            })
            .attr('transform', 'translate(' + this.svg_stats.size / 2 + ',' + this.svg_stats.size / 2 + ')');
    }


    createOuter() {
        let $this = this;
        this.svg_instance.selectAll('.outer_arc')
            .data(function () {
                return $this.pie_layout($this.pie_data);
            })
            .enter()
            .append('g')
            .classed('outer_arc', true)
            .append('path')
            .attr('d', function (d) {
                let arc = d3.arc()
                    .innerRadius($this.svg_stats.size / 2 - $this.svg_stats.margin - 1 - $this.svg_stats.arc_height)
                    .outerRadius($this.svg_stats.size / 2 - $this.svg_stats.margin);
                return arc(d);
            })
            .attr('transform', 'translate(' + this.svg_stats.size / 2 + ',' + this.svg_stats.size / 2 + ')')
            .attr('fill', function (d, i) {
                return $this.outer_pallete[i];
            });
    }
}
