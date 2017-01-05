import { ChartData } from './../charts/donut-chart/donut-chart.interface';
import { Component } from '@angular/core';
@Component({
    selector: 'app-ui-components',
    templateUrl: './ui-components.component.html',
    styleUrls: ['./ui-components.component.scss']
})
export class UiComponentsComponent {
    public donut_chart: ChartData[] = [
        {
            data: 20,
            title: 'no recare'
        },
        {
            data: 30,
            title: 'past due'
        },
        {
            data: 40,
            title: 'Current'
        },
        {
            data: 10,
            title: 'No Fut. Appt.'
        }
    ];
    constructor() { }
};
