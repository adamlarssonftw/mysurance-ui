import { IInsurance } from 'app/interfaces';
import { RouterState } from 'react-router-redux';

export interface RootState {
  insurances: RootState.InsurancesState;
  router: RouterState
}

export namespace RootState {
  export type InsurancesState = IInsurance[];
}
