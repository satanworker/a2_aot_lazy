import { Component } from '@angular/core';
import { GlobalService } from '../../app/global.service';

@Component({
  selector: 'app-lazy',
  templateUrl: 'lazy.component.html'
})
export class LazyComponent {
  constructor(
    private globalService: GlobalService
  ) {

  }
}
