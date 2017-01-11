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
    public fat_donut_chart: ChartData[] = [
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
        },
        {
            data: 40,
            title: 'No Fut. Appt.'
        }
    ];
    // public bar_data: any = [
    //   {
    //     1: 1000,
    //     2: 700,
    //     3: 1700,
    //     4: 900
    //   },
    //   {
    //     2: 1000,
    //     1: 700,
    //     4: 1700,
    //     3: 900
    //   }
    // ];
    public bar_data: any = [
        {
            value: 10,
            title: '1'
        },
        {
            value: 20,
            title: '2'
        },
        {
            value: 30,
            title: '3'
        },
        {
            value: 40,
            title: '4'
        }
    ];
    public stacked_data: any = [
        {
            title: '1',
            value: {
                test: 40,
                test1: 10,
                test3: 30,
                test4: 60,
                test5: 60
            }
        },
        {
            title: '2',
            value: {
                test: 40,
                test1: 10,
                test3: 30,
                test4: 60,
                test5: 60
            }
        },
        {
            title: '3',
            value: {
                test: 40,
                test1: 10,
                test3: 30,
                test4: 60,
                test5: 60
            }
        },
        {
            title: '4',
            value: {
                test: 40,
                test1: 10,
                test3: 30,
                test4: 60,
                test5: 60
            }
        },
        {
            title: '5',
            value: {
                test: 40,
                test1: 10,
                test3: 30,
                test4: 60,
                test5: 60
            }
        },
        {
            title: '6',
            value: {
                test: 40,
                test1: 10,
                test3: 30,
                test4: 60,
                test5: 60
            }
        },
        {
            title: '7',
            value: {
                test: 40,
                test1: 10,
                test3: 30,
                test4: 60,
                test5: 60
            }
        },
        {
            title: '8',
            value: {
                test: 40,
                test1: 10,
                test3: 30,
                test4: 60,
                test5: 60
            }
        },
        {
            title: '9',
            value: {
                test: 40,
                test1: 10,
                test3: 30,
                test4: 60,
                test5: 60
            }
        },
        {
            title: '10',
            value: {
                test: 40,
                test1: 10,
                test3: 30,
                test4: 60,
                test5: 60
            }
        },
        {
            title: '11',
            value: {
                test: 70,
                test1: 10,
                test3: 30,
                test4: 60,
                test5: 12
            }
        },
        {
            title: '12',
            value: {
                test: 9,
                test1: 10,
                test3: 30,
                test4: 60,
                test5: 12
            }
        }
    ];
    constructor() { }
};
