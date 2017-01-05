import { UiComponentsComponent } from './ui-components.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: UiComponentsComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
