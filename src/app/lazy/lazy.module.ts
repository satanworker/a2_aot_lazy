import { NgModule } from '@angular/core';

import { LazyComponent }   from './lazy.component';
import { routing } from './lazy.routing';
import {Lazy2Component} from "./lazy2.component";

@NgModule({
  imports: [ routing ],
  declarations: [
    LazyComponent,
    Lazy2Component
  ]
})

export class LazyModule {}
