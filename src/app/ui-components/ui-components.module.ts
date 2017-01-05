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
        DonutChartComponent
    ]
})

export class UIComponentsModule { }
