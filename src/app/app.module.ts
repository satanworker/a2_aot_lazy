import { store, effects, instrumentation } from './../store/index';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from "./app.routing";
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    store,
    effects,
    instrumentation
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
