import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LazyComponent} from "./lazy.component";
import {Lazy2Component} from "./lazy2.component";

const routes: Routes = [
  { path: '', component: LazyComponent },
  { path: 'l', component: Lazy2Component }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
