import { TEST_ACTION } from './../../store/test/test.actions';
import { AppState } from './../../store/index';
import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch({
      type: TEST_ACTION
    })
  }

}
