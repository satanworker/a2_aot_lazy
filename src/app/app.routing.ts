import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', loadChildren: 'app/main/main.module#MainModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
