import { MainComponent } from './main.component';
import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
const routes: Routes = [
  { path: '', component: MainComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
