import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AppTestComponent} from "./test.component";
import {TestService} from "./test.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppTestComponent
  ],
  providers: [
    TestService
  ],
  exports: [AppTestComponent]
})

export class TestModule {

}
