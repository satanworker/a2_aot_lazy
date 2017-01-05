import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { JustComponent } from "./just.component";
const routes: Routes = [
  { path: '', redirectTo: 'eager', pathMatch: 'full' },
  { path: 'eager', component: JustComponent },
  { path: 'components', loadChildren: 'app/ui-components/ui-components.module#UIComponentsModule' },
  { path: 'lazy', loadChildren: 'app/lazy/lazy.module#LazyModule' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
