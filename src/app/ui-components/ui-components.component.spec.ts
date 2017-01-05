import { UiComponentsComponent } from './ui-components.component';
import { DonutChartComponent } from './../charts/donut-chart/donut-chart.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './ui-components.routing';
/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';


describe('UiComponentsComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                RouterModule,
                routing
            ],
            declarations: [
                UiComponentsComponent,
                DonutChartComponent
            ],
        });
        TestBed.compileComponents();
    });

    it('should create the ui components component', async(() => {
        let fixture = TestBed.createComponent(UiComponentsComponent);
        let component = fixture.debugElement.componentInstance;
        expect(component).toBeTruthy();
    }));
});
