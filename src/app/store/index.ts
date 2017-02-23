
import { AppState } from './index';
import { userReducer } from './user/user.reducer';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers, ActionReducer, Action, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ModuleWithProviders } from '@angular/core';
import { compose } from '@ngrx/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';

export interface AppState {
  user: UserInterface;
  maps: MapInterface;
}

const reducers = {
  user: userReducer,
  map: mapReducer
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
export const instrumentation: ModuleWithProviders = (!environment.production) ?
StoreDevtoolsModule.instrumentOnlyWithExtension() : undefined;

export const effects: ModuleWithProviders[] = [
  EffectsModule.run(UserEffects),
  EffectsModule.run(MapEffects)
];

