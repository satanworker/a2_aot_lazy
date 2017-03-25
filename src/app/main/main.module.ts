import { MainComponent } from './main.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";
import { routing } from './main.routing';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        routing,
        CommonModule,
        FormsModule
    ]
})
export class MainModule { }
