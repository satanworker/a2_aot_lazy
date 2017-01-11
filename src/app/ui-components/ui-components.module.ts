import { StackedChartComponent } from './../charts/stacked-chart/stacked-chart.component';
import { BarChartComponent } from './../charts/bar-chart/bar-chart.component';
import { ChartDoubleComponent } from './../charts/chart-double/chart-double.component';
import { CommonModule } from '@angular/common';
import { DonutChartComponent } from './../charts/donut-chart/donut-chart.component';
import { UiComponentsComponent } from './ui-components.component';
import { routing } from './ui-components.routing';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        routing,
        CommonModule
    ],
    declarations: [
        UiComponentsComponent,
        DonutChartComponent,
        ChartDoubleComponent,
        BarChartComponent,
        StackedChartComponent
    ]
})

export class UIComponentsModule { }
