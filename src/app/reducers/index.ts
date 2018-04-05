import { combineReducers, Reducer } from 'redux';
import { RootState } from './state';
import { insuranceReducer } from './insurances';
import { routerReducer, RouterState } from 'react-router-redux';

export { RootState, RouterState };

export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  insurances: insuranceReducer,
  router: routerReducer
});
