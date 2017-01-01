import { Component } from '@angular/core';
import { select } from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'app works!';
  constructor(
  ) {
    select('body')
      .style('background', 'red');
  }
}

