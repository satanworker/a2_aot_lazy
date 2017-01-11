import { UiComponentsComponent } from './../../ui-components/ui-components.component';
import { DonutChartComponent } from './donut-chart.component';
/* tslint:disable:no-unused-variable */


import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from '../../ui-components/ui-components.routing';
/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';


describe('UiComponentsComponent', () => {
  let parentFixture, uiComponent: UiComponentsComponent;
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
    parentFixture = TestBed.createComponent(UiComponentsComponent);
    uiComponent = parentFixture.debugElement.componentInstance;
    TestBed.compileComponents();
  });


  it('should create the ui DonutChartComponent', async(() => {
    parentFixture.detectChanges();
    let fixture = TestBed.createComponent(DonutChartComponent);
    let component: DonutChartComponent = fixture.debugElement.componentInstance;
    component.data = [{
      data: 20,
      title: 'no recare'
    }];
    component.ngOnInit();
    expect(component).toBeTruthy();
  }));

  it('should set container instance props', async(() => {
    let fixture = TestBed.createComponent(DonutChartComponent);
    let component: DonutChartComponent = fixture.debugElement.componentInstance;
    component.prepareElements();
    let keys = Object.keys(component.container_instance);
    let mockKeys = ['top', 'left', 'element'];
    expect(keys).toEqual(mockKeys);
  }));

  it('should render chart', async(() => {
    let fixture = TestBed.createComponent(DonutChartComponent);
    let component: DonutChartComponent = fixture.debugElement.componentInstance;
    component.ngOnInit();
    component.renderChart();
  }));

});

