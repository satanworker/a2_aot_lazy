import { TEST_ACTION } from './test.actions';
import { Action, ActionReducer } from '@ngrx/store';

export const testReducer: ActionReducer<string> = (state: string = '' , action: Action) => {
    switch (action.type) {
        case TEST_ACTION:
            return state;
        default:
            return state;
    }
};
