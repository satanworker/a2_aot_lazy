import { testReducer } from './test/test.reducer';
import { environment } from './../environments/environment';
import { AppState } from './index';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers, ActionReducer, Action, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ModuleWithProviders } from '@angular/core';
import { compose } from '@ngrx/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export interface AppState {
  test: string
}

const reducers = {
  test: testReducer
};

const productionReducer: ActionReducer<AppState> = combineReducers(reducers);
const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state: AppState, action: Action) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const store: ModuleWithProviders = StoreModule.provideStore(reducer);
export const instrumentation: any = (!environment.production) ?
StoreDevtoolsModule.instrumentOnlyWithExtension() : [];

export const effects: ModuleWithProviders[] = [
//   EffectsModule.run(ModuleEffects),
//   EffectsModule.run(HastagsEffects),
//   EffectsModule.run(UserEffects)
];

